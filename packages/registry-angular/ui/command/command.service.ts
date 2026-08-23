import { computed, effect, Injectable, signal, untracked } from "@angular/core"

import { commandScore } from "./command.score"

/** One registered `CommandItem`, as the root sees it. */
export interface CommandItemState {
  readonly id: string
  /** Searchable value (explicit `value` input, else derived from text). */
  value: string
  /** Extra terms folded into the fuzzy match (cmdk `keywords`). */
  keywords: string[]
  /** Disabled items are shown but never active / selectable. */
  disabled: boolean
  /** Whether this item is a direct child of a group (drives group hiding). */
  groupId: string | null
  /** Fired by the root on Enter / click — the item runs its `select` output. */
  activate: () => void
  /** Scrolls the item into the list viewport when it becomes active. */
  scrollIntoView: () => void
}

/**
 * Root context for `[uiCommand]` — the Angular equivalent of cmdk's internal
 * store. cmdk (the React lib the Force UI `command` registry is built on) owns
 * the search string, the registry of items, the fuzzy-filter results, and the
 * highlighted item; there is no radix-ng/CDK primitive for any of it, so it all
 * lives here as signals.
 *
 * Items register themselves on init and keep their value/disabled in sync via
 * `updateItem`; the service derives `scores` (per-item fuzzy score),
 * `visibleIds` (score-ordered, matching cmdk's re-sort), `activeId` (the
 * highlighted option), and the count that drives `CommandEmpty` /
 * `CommandGroup` visibility.
 */
@Injectable()
export class CommandRootService {
  /** Current search text (two-way bound from `CommandInput`). */
  readonly search = signal("")

  /** When false, callers filter externally and every item stays visible. */
  readonly shouldFilter = signal(true)

  /** Highlighted item id (cmdk's `value` / `data-selected`). */
  readonly activeId = signal<string | null>(null)

  /** Id of the `CommandList` listbox, for the input's `aria-controls`. */
  readonly listId = signal<string | null>(null)

  /** Registration order preserved so DOM order is the tiebreak. */
  private readonly items = signal<CommandItemState[]>([])
  private idCounter = 0

  /** Optional externally-provided filter (cmdk `filter` prop). */
  private filterFn: (value: string, search: string, keywords?: string[]) => number =
    commandScore

  constructor() {
    // Re-anchor the highlight to the top match whenever the visible set changes.
    // Tracks `visibleIds()` and writes `activeId` `untracked`; the effect never
    // reads `activeId`, so manual keyboard / pointer navigation is not reset.
    effect(() => {
      this.visibleIds()
      untracked(() => this.activeId.set(this.firstSelectable()))
    })
  }

  nextId(): string {
    return `command-item-${this.idCounter++}`
  }

  setFilter(fn: (value: string, search: string, keywords?: string[]) => number): void {
    this.filterFn = fn
  }

  register(item: CommandItemState): void {
    this.items.update((list) => [...list, item])
  }

  unregister(id: string): void {
    this.items.update((list) => list.filter((i) => i.id !== id))
    if (this.activeId() === id) {
      this.activeId.set(this.visibleIds()[0] ?? null)
    }
  }

  updateItem(id: string, patch: Partial<Omit<CommandItemState, "id">>): void {
    this.items.update((list) =>
      list.map((i) => (i.id === id ? { ...i, ...patch } : i))
    )
  }

  /** id → fuzzy score for the current search (1 when not filtering). */
  readonly scores = computed<Map<string, number>>(() => {
    const search = this.search().trim()
    const filtering = this.shouldFilter() && search.length > 0
    const map = new Map<string, number>()
    for (const item of this.items()) {
      map.set(item.id, filtering ? this.filterFn(item.value, search, item.keywords) : 1)
    }
    return map
  })

  /** Visible item ids, best-match first (cmdk re-sorts by score). */
  readonly visibleIds = computed<string[]>(() => {
    const scores = this.scores()
    const searching = this.shouldFilter() && this.search().trim().length > 0
    const visible = this.items().filter((i) => (scores.get(i.id) ?? 0) > 0)
    if (searching) {
      // stable sort by descending score; equal scores keep registration order
      visible.sort((a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0))
    }
    return visible.map((i) => i.id)
  })

  /** Group ids that currently have at least one visible item. */
  readonly visibleGroupIds = computed<Set<string>>(() => {
    const scores = this.scores()
    const set = new Set<string>()
    for (const item of this.items()) {
      if (item.groupId && (scores.get(item.id) ?? 0) > 0) {
        set.add(item.groupId)
      }
    }
    return set
  })

  /** True when the search yields no matches — drives `CommandEmpty`. */
  readonly isEmpty = computed(() => this.visibleIds().length === 0)

  /**
   * The active id ONLY when it currently maps to a visible item — the value the
   * combobox input binds to `aria-activedescendant`.
   */
  readonly activeDescendantId = computed(() => {
    const id = this.activeId()
    return id && (this.scores().get(id) ?? 0) > 0 ? id : null
  })

  /**
   * Screen-reader announcement of the filtered result COUNT (WCAG 4.1.3). Empty
   * while no search is active AND when there are zero matches — in the
   * no-results case `CommandEmpty` is the live region that speaks its own text,
   * so this stays silent to avoid announcing two strings for one state.
   */
  readonly resultsAnnouncement = computed(() => {
    const n = this.visibleIds().length
    if (this.search().trim().length === 0 || n === 0) {
      return ""
    }
    return `${n} result${n === 1 ? "" : "s"}`
  })

  isActive(id: string): boolean {
    return this.activeId() === id
  }

  isVisible(id: string): boolean {
    return (this.scores().get(id) ?? 0) > 0
  }

  isGroupVisible(groupId: string): boolean {
    return this.visibleGroupIds().has(groupId)
  }

  private isSelectable(id: string): boolean {
    const item = this.items().find((i) => i.id === id)
    return !!item && !item.disabled
  }

  /** First selectable visible item (used to reset the highlight on filter). */
  private firstSelectable(): string | null {
    return this.visibleIds().find((id) => this.isSelectable(id)) ?? null
  }

  first(): void {
    this.activeId.set(this.firstSelectable())
  }

  last(): void {
    const selectable = this.visibleIds().filter((id) => this.isSelectable(id))
    this.activeId.set(selectable[selectable.length - 1] ?? null)
  }

  /** Move the highlight by `delta` steps over selectable visible items. */
  move(delta: number): void {
    const selectable = this.visibleIds().filter((id) => this.isSelectable(id))
    if (selectable.length === 0) {
      this.activeId.set(null)
      return
    }
    const current = this.activeId()
    const idx = current ? selectable.indexOf(current) : -1
    // wrap around, exactly like cmdk's loop navigation
    const next = (idx + delta + selectable.length) % selectable.length
    this.activeId.set(selectable[next])
  }

  /** The currently highlighted item id, if it can be activated. */
  activeSelectableId(): string | null {
    const id = this.activeId()
    return id && this.isSelectable(id) ? id : null
  }

  /** Activate the highlighted item (Enter key). Returns true if one ran. */
  selectActive(): boolean {
    const id = this.activeSelectableId()
    if (!id) {
      return false
    }
    this.items().find((i) => i.id === id)?.activate()
    return true
  }

  /** Scroll the highlighted item into view (after a keyboard move). */
  scrollActiveIntoView(): void {
    const id = this.activeId()
    if (id) {
      this.items().find((i) => i.id === id)?.scrollIntoView()
    }
  }
}

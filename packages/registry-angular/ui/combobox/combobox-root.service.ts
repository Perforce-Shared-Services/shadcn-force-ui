import { computed, effect, Injectable, signal, untracked } from '@angular/core';

import { comboboxContains, type ComboboxContains } from './combobox.filter';

/** How selection behaves (base-ui `selectionMode`). */
export type ComboboxSelectionMode = 'none' | 'single' | 'multiple';

/** base-ui `autoHighlight`: false | true('input-change') | 'always'. */
export type ComboboxAutoHighlight = boolean | 'always';

/** One registered `ComboboxItem`, as the root sees it. */
export interface ComboboxItemState {
  readonly id: string;
  /** The item's value used for selection equality (any shape). */
  value: unknown;
  /** Display/filter string (explicit `label`, else the item's text content). */
  label: string;
  /** Disabled items are shown but never highlighted / selectable. */
  disabled: boolean;
  /** Group this item belongs to (drives group hiding), or null. */
  groupId: string | null;
  /** Fired by the root on Enter / click — the item runs its selection. */
  activate: () => void;
  /** Scrolls the item into the list viewport when it becomes active. */
  scrollIntoView: () => void;
}

/**
 * Root context for `[uiCombobox]` — the Angular equivalent of the `@base-ui/react`
 * Combobox store. base-ui ships no Angular/radix-ng primitive, so the whole store
 * (selection, input text, open state, filtered visibility, highlight) is
 * reimplemented here as signals, mirroring `command`'s approach for cmdk.
 *
 * KEY DIFFERENCES vs `CommandRootService`:
 *  - Filter is a collator **substring "contains"** (see `combobox.filter.ts`), not
 *    a fuzzy score — items keep registration order, no re-sort.
 *  - It owns SELECTION (single/multiple/none) separate from the input text, plus
 *    the popup `open` state (the palette lives in an anchored CDK overlay, not a
 *    dialog).
 *  - The highlight is NOT auto-anchored by default (base-ui `autoHighlight=false`):
 *    nothing is highlighted until the user arrows into the list, unless
 *    `autoHighlight` is on.
 *
 * Scope note: this ports the Force UI **registry** combobox (the wrapper we ship).
 * base-ui `Root` props the registry wrapper does not surface — `grid`,
 * `virtualized`, `inline` — are intentionally not modelled (registry parity).
 */
@Injectable()
export class ComboboxRootService {
  // ── configuration (mirrored from the root component's inputs) ──────────────
  readonly selectionMode = signal<ComboboxSelectionMode>('single');
  readonly disabled = signal(false);
  readonly readOnly = signal(false);
  readonly loopFocus = signal(true);
  readonly openOnInputClick = signal(true);
  readonly autoHighlight = signal<ComboboxAutoHighlight>(false);
  /** Max items rendered after filtering; -1 = unlimited (base-ui `limit`). */
  readonly limit = signal(-1);
  /** When false the caller pre-filters and every item stays visible. */
  readonly shouldFilter = signal(true);

  // ── live state ────────────────────────────────────────────────────────────
  /** Selected values (always an array; single-select holds 0..1). */
  readonly selected = signal<unknown[]>([]);
  /** The input search text — SEPARATE from the selected label. */
  readonly inputValue = signal('');
  /** Popup open state. */
  readonly open = signal(false);
  /** Highlighted item id (base-ui active index → data-highlighted). */
  readonly activeId = signal<string | null>(null);
  /** Id of the `ComboboxList` listbox, for the input's `aria-controls`. */
  readonly listId = signal<string | null>(null);
  /**
   * Element the popup anchors to (base-ui `useComboboxAnchor`). The input sets
   * this by default; a `ComboboxChips` container overrides it so the popup tracks
   * the growing chips box. `ComboboxContent` reads it as the CDK overlay origin.
   */
  readonly anchorEl = signal<HTMLElement | null>(null);

  private readonly items = signal<ComboboxItemState[]>([]);
  private idCounter = 0;

  /** Value equality (base-ui `isItemEqualToValue`, default `Object.is`). */
  private isEqual: (a: unknown, b: unknown) => boolean = Object.is;
  /** Active matcher (default collator contains; overridable; null = external). */
  private filterFn: ComboboxContains | null = comboboxContains;

  readonly single = computed(() => this.selectionMode() === 'single');
  readonly multiple = computed(() => this.selectionMode() === 'multiple');

  constructor() {
    // Re-anchor the highlight to the first visible match — but ONLY when
    // autoHighlight is on. base-ui default (false) leaves the list un-highlighted
    // until the user arrows in. Tracks `visibleIds()` (search + items) and writes
    // `activeId` via `untracked` so manual keyboard/pointer moves are never reset.
    effect(() => {
      const mode = this.autoHighlight();
      const visible = this.visibleIds();
      const searching = this.inputValue().trim().length > 0;
      if (mode === false) {
        return;
      }
      // 'always' anchors whenever items exist; true/'input-change' only while typing.
      if (mode === 'always' || searching) {
        untracked(() => {
          if (visible.length > 0) {
            this.activeId.set(this.firstSelectable());
          } else {
            this.activeId.set(null);
          }
        });
      }
    });
  }

  nextId(): string {
    return `combobox-item-${this.idCounter++}`;
  }

  setIsEqual(fn: (a: unknown, b: unknown) => boolean): void {
    this.isEqual = fn;
  }

  /** Override the matcher, or pass null to disable internal filtering. */
  setFilter(fn: ComboboxContains | null): void {
    this.filterFn = fn;
  }

  // ── item registry ───────────────────────────────────────────────────────
  register(item: ComboboxItemState): void {
    this.items.update((list) => [...list, item]);
  }

  unregister(id: string): void {
    this.items.update((list) => list.filter((i) => i.id !== id));
    if (this.activeId() === id) {
      this.activeId.set(null);
    }
  }

  updateItem(id: string, patch: Partial<Omit<ComboboxItemState, 'id'>>): void {
    this.items.update((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  // ── selection ─────────────────────────────────────────────────────────────
  isSelected(value: unknown): boolean {
    return this.selected().some((v) => this.isEqual(v, value));
  }

  /**
   * Select (or, in multiple mode, toggle) a value. Returns the post-change open
   * intent so the caller/root can close on single-select. `none` mode records no
   * selection (pure filter box).
   */
  selectValue(value: unknown): void {
    const mode = this.selectionMode();
    if (mode === 'none' || this.readOnly() || this.disabled()) {
      return;
    }
    if (mode === 'single') {
      this.selected.set([value]);
      // mirror the chosen label into the input (base-ui single-select) — the
      // single-mode filter then treats a full-label query as empty (show all).
      this.inputValue.set(this.labelFor(value) ?? '');
      this.open.set(false);
      return;
    }
    // multiple → toggle membership, keep the popup open
    this.selected.update((list) =>
      list.some((v) => this.isEqual(v, value))
        ? list.filter((v) => !this.isEqual(v, value))
        : [...list, value],
    );
    // reset the query so the next filter starts fresh (base-ui clears on select)
    this.inputValue.set('');
  }

  removeValue(value: unknown): void {
    this.selected.update((list) => list.filter((v) => !this.isEqual(v, value)));
  }

  /** Remove the last selected value (Backspace in an empty chips input). */
  removeLast(): void {
    this.selected.update((list) => list.slice(0, -1));
  }

  clearSelection(): void {
    this.selected.set([]);
    this.inputValue.set('');
  }

  /**
   * Discard an in-progress filter query on cancel (Escape). Single-select reverts
   * the input to the selected item's label (so a partial filter is thrown away and
   * the chosen value is shown again); multiple/none clear the query. WAI-ARIA APG
   * combobox "Escape" intent + Nielsen H3 (user control — cancel my typing).
   */
  resetQueryToSelection(): void {
    this.inputValue.set(this.single() ? (this.labelFor(this.selectedSingle()) ?? '') : '');
  }

  /** The single-select value, or null. */
  readonly selectedSingle = computed<unknown>(() => this.selected()[0] ?? null);

  /** Display label for a value, resolved from the registered items. */
  labelFor(value: unknown): string | null {
    return this.items().find((i) => this.isEqual(i.value, value))?.label ?? null;
  }

  // ── filtering ───────────────────────────────────────────────────────────
  /**
   * The effective query. In single-select, if the input currently shows the full
   * selected label, treat the query as empty so the list doesn't collapse to the
   * one selected row right after selecting (base-ui
   * `createSingleSelectionCollatorFilter`).
   */
  private readonly effectiveQuery = computed(() => {
    const raw = this.inputValue().trim();
    if (this.single() && raw.length > 0) {
      const label = this.labelFor(this.selectedSingle());
      if (label && label.trim() === raw) {
        return '';
      }
    }
    return raw;
  });

  private matches(item: ComboboxItemState, query: string): boolean {
    if (!this.shouldFilter() || this.filterFn === null || query.length === 0) {
      return true;
    }
    return this.filterFn(item.label, query);
  }

  /** Visible item ids in registration order, capped by `limit`. */
  readonly visibleIds = computed<string[]>(() => {
    const query = this.effectiveQuery();
    const visible = this.items()
      .filter((i) => this.matches(i, query))
      .map((i) => i.id);
    const cap = this.limit();
    return cap > -1 ? visible.slice(0, cap) : visible;
  });

  private readonly visibleIdSet = computed(() => new Set(this.visibleIds()));

  readonly visibleGroupIds = computed<Set<string>>(() => {
    const set = new Set<string>();
    const visible = this.visibleIdSet();
    for (const item of this.items()) {
      if (item.groupId && visible.has(item.id)) {
        set.add(item.groupId);
      }
    }
    return set;
  });

  readonly isEmpty = computed(() => this.visibleIds().length === 0);

  /**
   * The active id ONLY when it maps to a visible item — the value the input binds
   * to `aria-activedescendant` (never points at a hidden option). WCAG 4.1.2.
   */
  readonly activeDescendantId = computed(() => {
    const id = this.activeId();
    return id && this.visibleIdSet().has(id) ? id : null;
  });

  /** SR announcement of the filtered result count (WCAG 4.1.3), like command. */
  readonly resultsAnnouncement = computed(() => {
    const n = this.visibleIds().length;
    if (this.effectiveQuery().length === 0 || n === 0) {
      return '';
    }
    return `${n} result${n === 1 ? '' : 's'}`;
  });

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  isVisible(id: string): boolean {
    return this.visibleIdSet().has(id);
  }

  isGroupVisible(groupId: string): boolean {
    return this.visibleGroupIds().has(groupId);
  }

  // ── keyboard navigation (base-ui list navigation) ─────────────────────────
  private isSelectable(id: string): boolean {
    const item = this.items().find((i) => i.id === id);
    return !!item && !item.disabled;
  }

  private firstSelectable(): string | null {
    return this.visibleIds().find((id) => this.isSelectable(id)) ?? null;
  }

  first(): void {
    this.activeId.set(this.firstSelectable());
  }

  last(): void {
    const selectable = this.visibleIds().filter((id) => this.isSelectable(id));
    this.activeId.set(selectable[selectable.length - 1] ?? null);
  }

  /** Move the highlight by `delta` over selectable visible items. */
  move(delta: number): void {
    const selectable = this.visibleIds().filter((id) => this.isSelectable(id));
    if (selectable.length === 0) {
      this.activeId.set(null);
      return;
    }
    const current = this.activeId();
    const idx = current ? selectable.indexOf(current) : -1;
    let next = idx + delta;
    if (this.loopFocus()) {
      next = (next + selectable.length) % selectable.length;
    } else {
      next = Math.max(0, Math.min(selectable.length - 1, next));
    }
    this.activeId.set(selectable[next]);
  }

  activeSelectableId(): string | null {
    const id = this.activeId();
    return id && this.isSelectable(id) ? id : null;
  }

  /** Activate the highlighted item (Enter). Returns true if one ran. */
  selectActive(): boolean {
    const id = this.activeSelectableId();
    if (!id) {
      return false;
    }
    this.items().find((i) => i.id === id)?.activate();
    return true;
  }

  scrollActiveIntoView(): void {
    const id = this.activeId();
    if (id) {
      this.items().find((i) => i.id === id)?.scrollIntoView();
    }
  }
}

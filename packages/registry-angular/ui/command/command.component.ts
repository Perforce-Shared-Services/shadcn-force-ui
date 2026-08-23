import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InjectionToken,
  model,
  output,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/angular-ui/input-group"

import { COMMAND_CHECK_SVG, COMMAND_SEARCH_SVG } from "./command.icons"
import { CommandRootService } from "./command.service"

/**
 * Angular port of the Force UI `command` registry item — the command palette.
 *
 * The React registry is built on **cmdk**, for which there is no radix-ng or
 * CDK primitive, so the fuzzy filter, keyboard navigation and highlight state
 * are reimplemented in `CommandRootService` (provided here) and consumed by
 * the child parts. See `command.score.ts` for the ported cmdk scorer.
 *
 * Part mapping (React → Angular):
 *
 *   <Command>          → <div uiCommand>
 *   <CommandInput />   → <div uiCommandInput placeholder="..."></div>
 *   <CommandList>      → <div uiCommandList>
 *   <CommandEmpty>     → <div uiCommandEmpty>No results found.</div>
 *   <CommandGroup>     → <div uiCommandGroup heading="Recent">
 *   <CommandItem>      → <div uiCommandItem (select)="run()">
 *   <CommandShortcut>  → <span uiCommandShortcut><kbd uiKbd>⌘</kbd>...</span>
 *   <CommandSeparator> → <div uiCommandSeparator></div>
 *
 * Keyboard model (cmdk parity): the root owns keydown so the same bindings work
 * whether focus is in the input or on the list. ArrowUp/Down move the highlight
 * over selectable visible items with wrap-around; Home/End jump; Enter activates.
 * The highlighted item carries `data-selected` and is referenced by the input's
 * `aria-activedescendant`.
 */

/** Group context — lets nested items report their groupId to the root. */
export const COMMAND_GROUP = new InjectionToken<{ groupId: string }>("COMMAND_GROUP")

let groupSeq = 0

/**
 * Angular port of `Command` (the root). A plain container that owns keyboard
 * navigation and renders an off-screen `role="status"` live region announcing
 * the filtered result count as the user types (WCAG 4.1.3).
 */
@Component({
  selector: "[uiCommand]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommandRootService],
  templateUrl: "./command.component.html",
  host: {
    "data-slot": "command",
    "[class]": "classes()",
    "(keydown)": "onKeydown($event)",
  },
})
export class CommandComponent {
  protected readonly root = inject(CommandRootService)

  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** cmdk `shouldFilter` — when false, the caller supplies a filtered list. */
  readonly shouldFilter = input(true, { transform: booleanAttribute })

  /** cmdk `filter` — override the fuzzy scorer (value, search, keywords) → score. */
  readonly filter = input<
    ((value: string, search: string, keywords?: string[]) => number) | undefined
  >(undefined)

  protected readonly classes = computed(() =>
    cn("cn-command flex size-full flex-col overflow-hidden", this.className())
  )

  constructor() {
    effect(() => this.root.shouldFilter.set(this.shouldFilter()))
    effect(() => {
      const fn = this.filter()
      if (fn) this.root.setFilter(fn)
    })
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        this.root.move(1)
        this.root.scrollActiveIntoView()
        break
      case "ArrowUp":
        event.preventDefault()
        this.root.move(-1)
        this.root.scrollActiveIntoView()
        break
      case "Home":
        event.preventDefault()
        this.root.first()
        this.root.scrollActiveIntoView()
        break
      case "End":
        event.preventDefault()
        this.root.last()
        this.root.scrollActiveIntoView()
        break
      case "Enter":
        if (this.root.selectActive()) event.preventDefault()
        break
      default:
        break
    }
  }
}

/**
 * Angular port of `CommandInput` — the palette's search field. Applied to a
 * CONTAINER element (`<div uiCommandInput>`), never `<input>`: it renders its
 * own InputGroup + inner combobox control. The inner `<input>` is a
 * `role="combobox"` that owns the `CommandList` listbox via `aria-controls`
 * and points `aria-activedescendant` at the highlighted option (WCAG 4.1.2).
 */
@Component({
  selector: "[uiCommandInput]",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div uiInputGroup variant="filled" class="cn-command-input-group">
      <input
        uiInputGroupInput
        type="text"
        role="combobox"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        aria-autocomplete="list"
        [attr.aria-label]="accessibleName()"
        [attr.aria-expanded]="root.isEmpty() ? 'false' : 'true'"
        [attr.aria-controls]="root.listId()"
        [attr.aria-activedescendant]="root.activeDescendantId()"
        [attr.placeholder]="placeholder()"
        [attr.disabled]="disabled() ? '' : null"
        [value]="value()"
        (input)="onInput($event)"
        class="cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div uiInputGroupAddon>
        <span
          class="cn-command-input-icon"
          aria-hidden="true"
          [innerHTML]="searchIcon"
        ></span>
      </div>
    </div>
  `,
  host: {
    "data-slot": "command-input-wrapper",
    "[class]": "classes()",
  },
})
export class CommandInputComponent {
  protected readonly root = inject(CommandRootService)

  readonly placeholder = input<string>("")
  readonly disabled = input(false)
  /**
   * Accessible name for the combobox (WCAG 4.1.2). A placeholder is NOT an
   * accessible name, so this is always emitted as `aria-label`: an explicit
   * `aria-label` wins, else the placeholder text is reused, else "Search".
   */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: "aria-label" })
  /** Two-way search text (cmdk `value` / `onValueChange`). */
  readonly value = model<string>("")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-command-input-wrapper", this.className()))

  protected readonly accessibleName = computed(
    () => this.ariaLabel() ?? (this.placeholder() || "Search")
  )

  /** Sanitizer-trusted inline search SVG (bundled, static — bypass is safe). */
  protected readonly searchIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    COMMAND_SEARCH_SVG
  )

  constructor() {
    // value (typed or externally set) mirrors into the root store; the root's
    // own effect re-anchors the highlight on search change.
    effect(() => {
      this.root.search.set(this.value())
    })
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value)
  }
}

/**
 * Angular port of `CommandList` — the scroll container for items, groups and
 * the empty state. It is the `role="listbox"` that `CommandInput`
 * (`role="combobox"`) controls via `aria-controls`. Give it an `aria-label`
 * describing the choices (WCAG 1.3.1); falls back to "Suggestions".
 */
let listIdCounter = 0

@Component({
  selector: "[uiCommandList]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content />",
  host: {
    "data-slot": "command-list",
    role: "listbox",
    "[id]": "id",
    "[attr.aria-label]": "ariaLabel()",
    "[class]": "classes()",
  },
})
export class CommandListComponent {
  private readonly root = inject(CommandRootService)

  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly ariaLabel = input<string>("Suggestions", { alias: "aria-label" })

  /** Stable generated listbox id (published to the root for aria-controls). */
  protected readonly id = `command-list-${listIdCounter++}`

  protected readonly classes = computed(() => cn("cn-command-list", this.className()))

  constructor() {
    this.root.listId.set(this.id)
  }
}

/**
 * Angular port of `CommandEmpty` — the "no results" state. Shows when the root
 * reports no visible items AND a search is active (an empty search shows the
 * full list). `role="status"` announces its copy when it appears (WCAG 4.1.3).
 */
@Component({
  selector: "[uiCommandEmpty]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content />",
  host: {
    "data-slot": "command-empty",
    role: "status",
    "[hidden]": "!visible()",
    "[class]": "classes()",
  },
})
export class CommandEmptyComponent {
  private readonly root = inject(CommandRootService)

  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly visible = computed(
    () => this.root.isEmpty() && this.root.search().trim().length > 0
  )

  protected readonly classes = computed(() => cn("cn-command-empty", this.className()))
}

/**
 * Angular port of `CommandGroup` — a labelled cluster of items. When the fuzzy
 * filter leaves the group with no visible items the whole group hides (cmdk
 * behaviour). `role="group"` named by its heading via `aria-labelledby`.
 */
@Component({
  selector: "[uiCommandGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: COMMAND_GROUP,
      useFactory: () => ({ groupId: `command-group-${groupSeq++}` }),
    },
  ],
  template: `
    @if (heading()) {
      <div cmdk-group-heading [id]="headingId">{{ heading() }}</div>
    }
    <ng-content />
  `,
  host: {
    "data-slot": "command-group",
    role: "group",
    "[attr.aria-labelledby]": "heading() ? headingId : null",
    "[hidden]": "!visible()",
    "[class]": "classes()",
  },
})
export class CommandGroupComponent {
  private readonly root = inject(CommandRootService)
  private readonly ctx = inject(COMMAND_GROUP)

  readonly heading = input<string>("")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly headingId = `${this.ctx.groupId}-heading`

  protected readonly visible = computed(() => this.root.isGroupVisible(this.ctx.groupId))

  protected readonly classes = computed(() => cn("cn-command-group", this.className()))
}

/**
 * Angular port of `CommandItem` — one selectable row. Registers with the root;
 * hidden when it scores 0 for the current search; becomes the highlight on
 * pointer-move and keyboard navigation; Enter or click fires `select`.
 * `role="option"` + `aria-selected` track the highlight; `aria-disabled` on
 * disabled rows (which stay visible but inert).
 */
@Component({
  selector: "[uiCommandItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <span
      data-slot="command-item-check"
      class="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100 [&>svg]:size-4 [&>svg]:fill-current"
      aria-hidden="true"
      [innerHTML]="checkIcon"
    ></span>
  `,
  host: {
    "data-slot": "command-item",
    role: "option",
    "[id]": "id",
    "[attr.data-selected]": "active() ? 'true' : null",
    "[attr.data-disabled]": "disabled() ? 'true' : null",
    "[attr.data-checked]": "checked() ? 'true' : null",
    "[attr.aria-selected]": "active()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[hidden]": "!visible()",
    "[class]": "classes()",
    "(pointermove)": "onPointerMove()",
    "(click)": "activate()",
  },
})
export class CommandItemComponent {
  private readonly root = inject(CommandRootService)
  private readonly el = inject(ElementRef<HTMLElement>)
  private readonly group = inject(COMMAND_GROUP, { optional: true })

  /** Explicit fuzzy value; falls back to the item's text content. */
  readonly value = input<string | undefined>(undefined)
  /** Extra terms folded into the fuzzy match (cmdk `keywords`). */
  readonly keywords = input<string[]>([])
  readonly disabled = input(false, { transform: booleanAttribute })
  /** Shows the trailing check (a chosen value, combobox-style). */
  readonly checked = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Fired on Enter / click when the item is enabled (cmdk `onSelect`). */
  readonly select = output<void>()

  protected readonly id = this.root.nextId()

  protected readonly active = computed(() => this.root.isActive(this.id))
  protected readonly visible = computed(() => this.root.isVisible(this.id))

  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe). */
  protected readonly checkIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    COMMAND_CHECK_SVG
  )

  protected readonly classes = computed(() =>
    cn(
      "cn-command-item group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      this.className()
    )
  )

  constructor() {
    const initial = this.el.nativeElement as HTMLElement
    this.root.register({
      id: this.id,
      value: this.value() ?? initial.textContent?.trim() ?? "",
      keywords: this.keywords(),
      disabled: this.disabled(),
      groupId: this.group?.groupId ?? null,
      activate: () => this.activate(),
      scrollIntoView: () =>
        (this.el.nativeElement as HTMLElement).scrollIntoView({ block: "nearest" }),
    })

    // keep the registry entry in sync with input changes
    effect(() =>
      this.root.updateItem(this.id, {
        value: this.value() ?? (this.el.nativeElement as HTMLElement).textContent?.trim() ?? "",
        keywords: this.keywords(),
        disabled: this.disabled(),
      })
    )

    // p4one parity: interpolated labels ({{ item.label }}) may render after the
    // constructor runs; re-read textContent once the view is painted.
    afterNextRender(() => {
      if (!this.value()) {
        this.root.updateItem(this.id, {
          value: (this.el.nativeElement as HTMLElement).textContent?.trim() ?? "",
          keywords: this.keywords(),
          disabled: this.disabled(),
        })
      }
    })
  }

  protected onPointerMove(): void {
    if (!this.disabled()) {
      this.root.activeId.set(this.id)
    }
  }

  protected activate(): void {
    if (this.disabled()) return
    this.root.activeId.set(this.id)
    this.select.emit()
  }
}

/**
 * Angular port of `CommandShortcut` — the right-aligned keyboard hint on an
 * item. Its presence hides the item's trailing check (the item's
 * `group-has-data-[slot=command-shortcut]` rule). Decorative hint
 * (`aria-hidden`) — the real activation is Enter/click on the item.
 */
@Component({
  selector: "[uiCommandShortcut], span[uiCommandShortcut]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content />",
  host: {
    "data-slot": "command-shortcut",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class CommandShortcutComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-command-shortcut", this.className()))
}

/**
 * Angular port of `CommandSeparator` — a hairline between groups. Hides while
 * searching (cmdk: a re-sorted filtered list has no stable group boundaries).
 * Purely visual: `role="separator"` is not a permitted child of
 * `role="listbox"`, so the line stays decorative.
 */
@Component({
  selector: "[uiCommandSeparator]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content />",
  host: {
    "data-slot": "command-separator",
    role: "none",
    "[hidden]": "searching()",
    "[class]": "classes()",
  },
})
export class CommandSeparatorComponent {
  private readonly root = inject(CommandRootService)

  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly searching = computed(() => this.root.search().trim().length > 0)

  protected readonly classes = computed(() => cn("cn-command-separator", this.className()))
}

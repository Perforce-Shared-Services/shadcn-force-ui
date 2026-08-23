import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, input } from "@angular/core"
import {
  RdxContextMenuRoot,
  RdxContextMenuTrigger,
} from "@radix-ng/primitives/context-menu"
import {
  RdxMenuGroup,
  RdxMenuItem,
  RdxMenuPopup,
  RdxMenuPositioner,
  RdxMenuSeparator,
} from "@radix-ng/primitives/menu"

import { cn } from "@/lib/utils"

import { CONTEXT_MENU_ITEM_BASE } from "./context-menu.variants"

/**
 * Angular port of @force-ui/context-menu (radix-force-ui style), built on
 * @radix-ng/primitives v1.x — `context-menu` for the root/trigger and the
 * shared `menu` primitives for the panel body (v1.x ships no context-menu
 * content/item directives; the menu primitive owns them).
 *
 * Part mapping (React → Angular):
 *
 *   <ContextMenu>               → <div uiContextMenuRoot>
 *   <ContextMenuTrigger>        → <div uiContextMenuTrigger>   (right-click / long-press target)
 *   <ContextMenuPortal>         → (none — the positioner renders in place)
 *   <ContextMenuContent>        → <div uiContextMenuContent>
 *   <ContextMenuGroup>          → <div uiContextMenuGroup>
 *   <ContextMenuLabel>          → <div uiContextMenuLabel>
 *   <ContextMenuItem>           → <button uiContextMenuItem>
 *   <ContextMenuCheckboxItem>   → <button uiContextMenuCheckboxItem>
 *   <ContextMenuRadioGroup>     → <div uiContextMenuRadioGroup>
 *   <ContextMenuRadioItem>      → <button uiContextMenuRadioItem>
 *   <ContextMenuSeparator>      → <div uiContextMenuSeparator>
 *   <ContextMenuShortcut>       → <span uiContextMenuShortcut>
 *   <ContextMenuSub>            → <div uiContextMenuSub>
 *   <ContextMenuSubTrigger>     → <button uiContextMenuSubTrigger>
 *   <ContextMenuSubContent>     → <div uiContextMenuSubContent>
 *
 * Usage:
 *   <div uiContextMenuRoot>
 *     <div uiContextMenuTrigger class="...">Right click me</div>
 *     <div uiContextMenuContent class="w-48">
 *       <button uiContextMenuItem (onSelect)="...">Back</button>
 *     </div>
 *   </div>
 *
 * radix-ng v1.x owns the a11y wiring: `role="menu"` on the popup,
 * `role="menuitem"`/`menuitemcheckbox`/`menuitemradio` on the items,
 * roving-tabindex arrow/Home/End/typeahead navigation, Escape dismissal.
 * The trigger opens at the pointer coordinates (native `contextmenu` event,
 * touch long-press via `[longPressDelay]`, Menu key opens with first item
 * highlighted) — the React `side`/`align` content props have no equivalent
 * because a context menu always opens at the cursor (documented parity shift).
 */

/**
 * Angular port of `ContextMenu` (the root). Wraps the trigger and the content
 * panel. radix-ng's `RdxContextMenuRoot` marks the composed menu root as a
 * context menu (its own modal-focus/backdrop/outside-press policy) and anchors
 * the popup at the pointer via an anchor override.
 */
@Directive({
  selector: "[uiContextMenuRoot]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxContextMenuRoot,
      inputs: ["open: uiOpen", "modal", "dir"],
      outputs: ["openChange: uiOpenChange", "onOpenChange"],
    },
  ],
  host: {
    "data-slot": "context-menu",
  },
})
export class ContextMenuRootDirective {}

/**
 * Angular port of `ContextMenuTrigger` — the element the user right-clicks
 * (or long-presses on touch). Attribute selector so it can ride any host
 * element (row, thumbnail, canvas). `select-none` keeps the right-click from
 * selecting text (p4one-local addition kept verbatim).
 */
@Directive({
  selector: "[uiContextMenuTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxContextMenuTrigger,
      inputs: ["disabled", "longPressDelay"],
    },
  ],
  host: {
    "data-slot": "context-menu-trigger",
    class: "select-none",
  },
})
export class ContextMenuTriggerDirective {}

/**
 * Angular port of `ContextMenuContent` — the floating panel opened at the
 * pointer. The host element carries the positioner primitive; the template
 * renders the popup carrying the visual tokens (`cn-context-menu-content`).
 * The React `side` prop has no equivalent here (always opens at the cursor) —
 * documented parity shift.
 */
@Component({
  selector: "div[uiContextMenuContent]",
  standalone: true,
  imports: [RdxMenuPopup],
  templateUrl: "./context-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxMenuPositioner }],
  host: {
    "data-slot": "context-menu-content",
  },
})
export class ContextMenuContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly popupClasses = computed(() =>
    cn("cn-context-menu-content z-50 outline-none", this.className())
  )
}

let contextMenuLabelSeq = 0

/**
 * Angular port of `ContextMenuLabel` — a non-interactive heading for a group.
 * Self-assigns a stable id so an enclosing `[uiContextMenuGroup]` can wire
 * `aria-labelledby` to it; a consumer-supplied `id` wins over the generated one.
 */
@Directive({
  selector: "[uiContextMenuLabel]",
  standalone: true,
  host: {
    "data-slot": "context-menu-label",
    "[attr.id]": "labelId",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class ContextMenuLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `ui-context-menu-label-${contextMenuLabelSeq++}`

  protected readonly classes = computed(() =>
    cn("cn-context-menu-label", this.className())
  )
}

/**
 * Angular port of `ContextMenuGroup`. radix-ng supplies `role="group"` via
 * `[rdxMenuGroup]`; this wrapper links the group to its label so a screen
 * reader announces it by its visible name instead of an unnamed region
 * (WCAG 1.3.1 / 4.1.2) — mirrors the React source's GroupContext wiring.
 */
@Directive({
  selector: "[uiContextMenuGroup]",
  standalone: true,
  hostDirectives: [{ directive: RdxMenuGroup }],
  host: {
    "data-slot": "context-menu-group",
    role: "group",
    "[attr.aria-labelledby]": "label()?.labelId ?? null",
  },
})
export class ContextMenuGroupDirective {
  protected readonly label = contentChild(forwardRef(() => ContextMenuLabelDirective))
}

/**
 * Angular port of `ContextMenuItem` — a selectable action row. Attribute
 * selector on a native `<button>` keeps native semantics (Angular's idiomatic
 * equivalent of React's `asChild`). radix-ng supplies `role="menuitem"`,
 * real-DOM focus on arrow keys / pointer-move and `(onSelect)` activation.
 *
 * `variant` ('default' | 'destructive') and `inset` are shadcn additions the
 * primitive does not model, so they are stamped as `data-variant` /
 * `data-inset` for the token's attribute selectors to key off. A destructive
 * item MUST be preceded by a separator and SHOULD open a confirmation dialog
 * before executing.
 */
@Directive({
  selector: "button[uiContextMenuItem]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuItem,
      inputs: ["closeOnClick", "disabled"],
      outputs: ["onSelect"],
    },
  ],
  host: {
    "data-slot": "context-menu-item",
    "[attr.data-variant]": "variant()",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class ContextMenuItemDirective {
  readonly variant = input<"default" | "destructive">("default")
  readonly inset = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-context-menu-item", CONTEXT_MENU_ITEM_BASE, this.className())
  )
}

/**
 * Angular port of `ContextMenuSeparator` — a hairline divider between groups.
 * radix-ng's `RdxMenuSeparator` (host directive) supplies `role="separator"`.
 */
@Directive({
  selector: "[uiContextMenuSeparator]",
  standalone: true,
  hostDirectives: [RdxMenuSeparator],
  host: {
    "data-slot": "context-menu-separator",
    "[class]": "classes()",
  },
})
export class ContextMenuSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-context-menu-separator", this.className())
  )
}

/**
 * Angular port of `ContextMenuShortcut` — trailing muted text for a keyboard
 * hint (e.g. `⌘C`). Plain styling directive on a `<span>`.
 *
 * `aria-hidden="true"` is intentional: the menu item's text content is its
 * accessible name, and the shortcut glyph is visual-only supplementary info —
 * a screen reader announcing "Open ⌘ O" would be noise. Callers are
 * responsible for rendering platform-appropriate symbols (`Ctrl`/`Alt` vs
 * `⌘`/`⌥`); this directive only styles whatever text it's given.
 */
@Directive({
  selector: "span[uiContextMenuShortcut]",
  standalone: true,
  host: {
    "data-slot": "context-menu-shortcut",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class ContextMenuShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-context-menu-shortcut", this.className())
  )
}

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, input } from "@angular/core"
import {
  RdxMenuGroup,
  RdxMenuItem,
  RdxMenuPopup,
  RdxMenuPositioner,
  RdxMenuRoot,
  RdxMenuSeparator,
  RdxMenuTrigger,
} from "@radix-ng/primitives/menu"


import { cn } from "@/lib/utils"

import { DROPDOWN_MENU_ITEM_BASE } from "./dropdown-menu.variants"

/**
 * Angular port of @force-ui/dropdown-menu (radix-force-ui style), built on
 * @radix-ng/primitives/menu v1.x — the same declarative composition as the
 * React registry (root → trigger → positioner + popup), not p4one's v0.50
 * CDK-overlay API (`@radix-ng/primitives/dropdown-menu` does not exist in
 * radix-ng v1.x; the menu primitive replaced it).
 *
 * Part mapping (React → Angular):
 *
 *   <DropdownMenu>             → <div uiDropdownMenuRoot>
 *   <DropdownMenuTrigger>      → <button uiButton uiDropdownMenuTrigger>
 *   <DropdownMenuPortal>       → (none — the positioner renders in place)
 *   <DropdownMenuContent>      → <div uiDropdownMenuContent>
 *   <DropdownMenuGroup>        → <div uiDropdownMenuGroup>
 *   <DropdownMenuLabel>        → <div uiDropdownMenuLabel>
 *   <DropdownMenuItem>         → <button uiDropdownMenuItem>
 *   <DropdownMenuCheckboxItem> → <button uiDropdownMenuCheckboxItem>
 *   <DropdownMenuRadioGroup>   → <div uiDropdownMenuRadioGroup>
 *   <DropdownMenuRadioItem>    → <button uiDropdownMenuRadioItem>
 *   <DropdownMenuSeparator>    → <div uiDropdownMenuSeparator>
 *   <DropdownMenuShortcut>     → <span uiDropdownMenuShortcut>
 *   <DropdownMenuSub>          → <div uiDropdownMenuSub>
 *   <DropdownMenuSubTrigger>   → <button uiDropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>   → <div uiDropdownMenuSubContent>
 *
 * Usage:
 *   <div uiDropdownMenuRoot>
 *     <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
 *     <div uiDropdownMenuContent class="w-40">
 *       <button uiDropdownMenuItem (onSelect)="...">Profile</button>
 *     </div>
 *   </div>
 *
 * radix-ng v1.x owns the a11y wiring: `role="menu"` on the popup,
 * `role="menuitem"`/`menuitemcheckbox`/`menuitemradio` on the items,
 * roving-tabindex arrow/Home/End/typeahead navigation, Escape dismissal and
 * `aria-haspopup` / `aria-expanded` on the trigger.
 */

/**
 * Angular port of `DropdownMenu` (the root). Groups all parts and owns open
 * state. The `open` model is re-exposed as `[uiOpen]` / `(uiOpenChange)` for
 * controlled usage; demos use the uncontrolled form.
 */
@Directive({
  selector: "[uiDropdownMenuRoot]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuRoot,
      inputs: ["open: uiOpen", "defaultOpen", "modal", "dir"],
      outputs: ["openChange: uiOpenChange"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu",
  },
})
export class DropdownMenuRootDirective {}

/**
 * Angular port of `DropdownMenuTrigger` — the button that opens the menu.
 * Must be rendered inside the `[uiDropdownMenuRoot]` element. radix-ng stamps
 * `aria-haspopup`, `aria-expanded`, `data-state` and handles click/hover
 * activation automatically.
 */
@Directive({
  selector: "button[uiDropdownMenuTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuTrigger,
      inputs: ["disabled", "openOnHover", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-trigger",
  },
})
export class DropdownMenuTriggerDirective {}

/**
 * Angular port of `DropdownMenuContent` — the floating panel. The host element
 * carries the positioner primitive; the template renders the popup carrying
 * the visual tokens (`cn-dropdown-menu-content`). Items, separators, labels
 * and groups are projected inside it. The React `align` / `sideOffset` props
 * have no per-use input in radix-ng v1.x — placement is automatic with
 * collision flipping (documented parity shift).
 */
@Component({
  selector: "div[uiDropdownMenuContent]",
  standalone: true,
  imports: [RdxMenuPopup],
  templateUrl: "./dropdown-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxMenuPositioner }],
  host: {
    "data-slot": "dropdown-menu-content",
  },
})
export class DropdownMenuContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly popupClasses = computed(() =>
    cn("cn-dropdown-menu-content z-50 outline-none", this.className())
  )
}

let dropdownMenuLabelSeq = 0

/**
 * Angular port of `DropdownMenuLabel` — a non-interactive heading for a
 * group. Self-assigns a stable id so an enclosing `[uiDropdownMenuGroup]`
 * can wire `aria-labelledby` to it; a consumer-supplied `id` wins over the
 * generated one.
 */
@Directive({
  selector: "[uiDropdownMenuLabel]",
  standalone: true,
  host: {
    "data-slot": "dropdown-menu-label",
    "[attr.id]": "labelId",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class DropdownMenuLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `ui-dropdown-menu-label-${dropdownMenuLabelSeq++}`

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-label", this.className())
  )
}

/**
 * Angular port of `DropdownMenuGroup`. radix-ng supplies `role="group"` via
 * `[rdxMenuGroup]`; this wrapper links the group to its label so a screen
 * reader announces it by its visible name instead of an unnamed region
 * (WCAG 1.3.1 / 4.1.2) — mirrors the React source's GroupContext →
 * aria-labelledby wiring.
 */
@Directive({
  selector: "[uiDropdownMenuGroup]",
  standalone: true,
  hostDirectives: [{ directive: RdxMenuGroup }],
  host: {
    "data-slot": "dropdown-menu-group",
    role: "group",
    "[attr.aria-labelledby]": "label()?.labelId ?? null",
  },
})
export class DropdownMenuGroupDirective {
  protected readonly label = contentChild(forwardRef(() => DropdownMenuLabelDirective))
}

/**
 * Angular port of `DropdownMenuItem` — a selectable action row. Attribute
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
  selector: "button[uiDropdownMenuItem]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuItem,
      inputs: ["closeOnClick", "disabled"],
      outputs: ["onSelect"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-item",
    "[attr.data-variant]": "variant()",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class DropdownMenuItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly variant = input<"default" | "destructive">("default")
  readonly inset = input(false, { transform: booleanAttribute })

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-item", DROPDOWN_MENU_ITEM_BASE, this.className())
  )
}

/**
 * Angular port of `DropdownMenuSeparator` — a hairline divider between groups.
 * radix-ng supplies `role="separator"`.
 */
@Directive({
  selector: "[uiDropdownMenuSeparator]",
  standalone: true,
  hostDirectives: [{ directive: RdxMenuSeparator }],
  host: {
    "data-slot": "dropdown-menu-separator",
    "[class]": "classes()",
  },
})
export class DropdownMenuSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-separator", this.className())
  )
}

/**
 * Angular port of `DropdownMenuShortcut` — trailing muted text for a keyboard
 * hint (e.g. `⌘C`). aria-hidden: the item's own text is its accessible name;
 * the shortcut glyph is supplementary. Recoloured by the item's focus state
 * through the shared `group/dropdown-menu-item` hook.
 */
@Directive({
  selector: "span[uiDropdownMenuShortcut]",
  standalone: true,
  host: {
    "data-slot": "dropdown-menu-shortcut",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class DropdownMenuShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-shortcut", this.className())
  )
}

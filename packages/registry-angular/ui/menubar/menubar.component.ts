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
import { RdxMenubarRoot } from "@radix-ng/primitives/menubar"


import { cn } from "@/lib/utils"

import { MENUBAR_ITEM_BASE } from "./menubar.variants"

/**
 * Angular port of @force-ui/menubar (radix-force-ui style), built on
 * @radix-ng/primitives v1.x — the menubar module ships only `RdxMenubarRoot`
 * (a Base UI-style coordinator over the composite primitives), so each
 * top-level menu is composed from the generic `menu` primitives exactly like
 * the sibling dropdown-menu port: one `[rdxMenuRoot]` per menu, whose trigger
 * + positioner/popup panel the bar coordinates (single-open arbitration,
 * roving-tabindex arrow-key navigation between triggers).
 *
 * Part mapping (React → Angular):
 *
 *   <Menubar>              → <div uiMenubar>
 *   <MenubarMenu>          → <div uiMenubarMenu>
 *   <MenubarTrigger>       → <button uiMenubarTrigger>
 *   <MenubarPortal>        → (none — the positioner renders in place)
 *   <MenubarContent>       → <div uiMenubarContent>
 *   <MenubarGroup>         → <div uiMenubarGroup>
 *   <MenubarLabel>         → <div uiMenubarLabel>
 *   <MenubarItem>          → <button uiMenubarItem>
 *   <MenubarShortcut>      → <span uiMenubarShortcut>
 *   <MenubarSeparator>     → <div uiMenubarSeparator>
 *   (+ selectable parts in menubar-selectable.component.ts, sub parts in
 *      menubar-sub.component.ts)
 *
 * Usage:
 *   <div uiMenubar class="w-72">
 *     <div uiMenubarMenu>
 *       <button uiMenubarTrigger>File</button>
 *       <div uiMenubarContent>
 *         <button uiMenubarItem>New Tab</button>
 *       </div>
 *     </div>
 *   </div>
 */

/**
 * Angular port of `Menubar` — the horizontal bar hosting one trigger per
 * top-level menu. `RdxMenubarRoot` (host directive; its own host directives
 * chain in the composite root/list) supplies single-open coordination between
 * child menus and roving-tabindex left/right arrow-key navigation between
 * triggers (WAI-ARIA menubar pattern).
 */
@Directive({
  selector: "[uiMenubar]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenubarRoot,
      inputs: ["disabled", "modal", "loopFocus", "orientation"],
    },
  ],
  host: {
    "data-slot": "menubar",
    "[class]": "classes()",
  },
})
export class MenubarDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-menubar flex items-center", this.className())
  )
}

/**
 * Angular port of `MenubarMenu` — wraps one trigger and its panel. radix-ng
 * v1.x models a top-level menu as a menu-root primitive; `[rdxMenubarRoot]`
 * discovers these roots as content children and coordinates them.
 */
@Directive({
  selector: "[uiMenubarMenu]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuRoot,
      inputs: ["modal", "dir"],
    },
  ],
  host: {
    "data-slot": "menubar-menu",
  },
})
export class MenubarMenuDirective {}

/**
 * Angular port of `MenubarTrigger` — the button that opens its menu. Must be
 * rendered inside a `[uiMenubarMenu]`. The menubar intercepts click/keyboard/
 * pointerenter activation so only one menu is open at a time and arrows move
 * between triggers. Unlike the dropdown-menu trigger (unstyled, composes with
 * `[uiButton]`), a menubar trigger IS its own lightweight text label, so it
 * carries the token styles directly.
 */
@Component({
  selector: "button[uiMenubarTrigger]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuTrigger,
      inputs: ["disabled", "openOnHover", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "menubar-trigger",
    "[class]": "classes()",
  },
  template: `<ng-content />`,
})
export class MenubarTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-menubar-trigger flex items-center outline-hidden select-none [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * Angular port of `MenubarContent` — the floating panel a trigger opens. The
 * host element carries the positioner primitive; the template renders the
 * popup carrying the visual tokens (`cn-menubar-content`). Items, separators,
 * labels, groups and submenus are projected inside it. The React `align` /
 * `alignOffset` / `sideOffset` props have no per-use input in radix-ng v1.x —
 * placement is automatic with collision flipping (documented parity shift).
 */
@Component({
  selector: "div[uiMenubarContent]",
  standalone: true,
  imports: [RdxMenuPopup],
  templateUrl: "./menubar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxMenuPositioner }],
  host: {
    "data-slot": "menubar-content",
  },
})
export class MenubarContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly popupClasses = computed(() =>
    cn("cn-menubar-content cn-menu-target cn-menu-translucent z-50 outline-none", this.className())
  )
}

let menubarLabelSeq = 0

/**
 * Angular port of `MenubarLabel` — a non-interactive heading for a group.
 * Self-assigns a stable id so an enclosing `[uiMenubarGroup]` can wire
 * `aria-labelledby` to it; a consumer-supplied `id` wins over the generated
 * one.
 */
@Directive({
  selector: "[uiMenubarLabel]",
  standalone: true,
  host: {
    "data-slot": "menubar-label",
    "[attr.id]": "labelId",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class MenubarLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `ui-menubar-label-${menubarLabelSeq++}`

  protected readonly classes = computed(() =>
    cn("cn-menubar-label", this.className())
  )
}

/**
 * Angular port of `MenubarGroup`. radix-ng supplies `role="group"` via
 * `[rdxMenuGroup]`; this wrapper links the group to its label so a screen
 * reader announces it by its visible name instead of an unnamed region
 * (WCAG 1.3.1 / 4.1.2) — mirrors the React source's GroupContext →
 * aria-labelledby wiring.
 */
@Directive({
  selector: "[uiMenubarGroup]",
  standalone: true,
  hostDirectives: [{ directive: RdxMenuGroup }],
  host: {
    "data-slot": "menubar-group",
    role: "group",
    "[attr.aria-labelledby]": "label()?.labelId ?? null",
  },
})
export class MenubarGroupDirective {
  protected readonly label = contentChild(forwardRef(() => MenubarLabelDirective))
}

/**
 * Angular port of `MenubarItem` — a selectable action row. Attribute selector
 * on a native `<button>` keeps native semantics. radix-ng supplies
 * `role="menuitem"`, real-DOM focus on arrow keys / pointer-move and
 * `(onSelect)` activation.
 *
 * `variant` ('default' | 'destructive') and `inset` are shadcn additions the
 * primitive does not model, so they are stamped as `data-variant` /
 * `data-inset` for the token's attribute selectors to key off. A destructive
 * item MUST be preceded by a separator and SHOULD open a confirmation dialog
 * before executing.
 */
@Directive({
  selector: "button[uiMenubarItem]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuItem,
      inputs: ["closeOnClick", "disabled"],
      outputs: ["onSelect"],
    },
  ],
  host: {
    "data-slot": "menubar-item",
    "[attr.data-variant]": "variant()",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
})
export class MenubarItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly variant = input<"default" | "destructive">("default")
  readonly inset = input(false, { transform: booleanAttribute })

  protected readonly classes = computed(() =>
    cn("cn-menubar-item", MENUBAR_ITEM_BASE, this.className())
  )
}

/**
 * Angular port of `MenubarSeparator` — a hairline divider between groups.
 * radix-ng supplies `role="separator"`.
 */
@Directive({
  selector: "[uiMenubarSeparator]",
  standalone: true,
  hostDirectives: [{ directive: RdxMenuSeparator }],
  host: {
    "data-slot": "menubar-separator",
    "[class]": "classes()",
  },
})
export class MenubarSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-menubar-separator -mx-1 my-1 h-px", this.className())
  )
}

/**
 * Angular port of `MenubarShortcut` — trailing muted text for a keyboard hint
 * (e.g. `⌘C`). aria-hidden: the item's own text is its accessible name; the
 * shortcut glyph is supplementary. Recoloured by the item's focus state
 * through the shared `group/menubar-item` hook.
 */
@Directive({
  selector: "span[uiMenubarShortcut]",
  standalone: true,
  host: {
    "data-slot": "menubar-shortcut",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class MenubarShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-menubar-shortcut ml-auto", this.className())
  )
}

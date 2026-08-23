import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  RdxMenuCheckboxItem,
  RdxMenuCheckboxItemIndicator,
  RdxMenuRadioGroup,
  RdxMenuRadioItem,
} from "@radix-ng/primitives/menu"

import { cn } from "@/lib/utils"

import { DROPDOWN_MENU_CHECK_SVG } from "./dropdown-menu.icons"
import { DROPDOWN_MENU_SELECTABLE_ITEM_BASE } from "./dropdown-menu.variants"

/**
 * Angular ports of `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup` and
 * `DropdownMenuRadioItem`. radix-ng supplies the semantics:
 * `role="menuitemcheckbox"` / `role="menuitemradio"` with `aria-checked`,
 * group value coordination and `(onCheckedChange)` / `(onValueChange)`.
 *
 * The check indicator is the registry's ItemIndicator: an inline Material
 * Symbols `<svg>` (swap-point in `dropdown-menu.icons.ts`) injected via
 * `[innerHTML]` (sanitizer-trusted — bundled static string), coloured by
 * `fill-current`. `[rdxMenuCheckboxItemIndicator]` /
 * `[rdxMenuRadioItemIndicator]` show it only when checked; selection is also
 * conveyed by `aria-checked`, so the glyph is aria-hidden decoration.
 *
 * A checkbox item keeps the menu open across toggles (multi-select), matching
 * React's CheckboxItem behaviour.
 */

const CHECKBOX_INDICATOR_TEMPLATE = `
    <span
      class="cn-dropdown-menu-item-indicator pointer-events-none absolute right-2 flex items-center justify-center"
      data-slot="dropdown-menu-checkbox-item-indicator"
      aria-hidden="true"
    >
      <span
        rdxMenuCheckboxItemIndicator
        class="flex items-center justify-center [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `

const RADIO_INDICATOR_TEMPLATE = `
    <span
      class="cn-dropdown-menu-item-indicator pointer-events-none absolute right-2 flex items-center justify-center"
      data-slot="dropdown-menu-radio-item-indicator"
      aria-hidden="true"
    >
      <span
        rdxMenuRadioItemIndicator
        class="flex items-center justify-center [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `

/**
 * Checkbox item. Two-way bindable via `[(checked)]`; toggling emits
 * `(onCheckedChange)`. A checkbox item keeps the menu open across toggles.
 */
@Component({
  selector: "button[uiDropdownMenuCheckboxItem]",
  standalone: true,
  imports: [RdxMenuCheckboxItemIndicator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuCheckboxItem,
      inputs: ["checked", "closeOnClick", "disabled"],
      outputs: ["checkedChange", "onCheckedChange"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-checkbox-item",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
  template: CHECKBOX_INDICATOR_TEMPLATE,
})
export class DropdownMenuCheckboxItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    DROPDOWN_MENU_CHECK_SVG
  )

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-checkbox-item", DROPDOWN_MENU_SELECTABLE_ITEM_BASE, this.className())
  )
}

/**
 * Radio group — wraps a set of radio items under one `value`. radix-ng
 * coordinates the children internally and emits `(onValueChange)` on
 * selection. The registry group carries no class of its own.
 */
@Directive({
  selector: "[uiDropdownMenuRadioGroup]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuRadioGroup,
      inputs: ["value", "disabled"],
      outputs: ["valueChange", "onValueChange"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-radio-group",
  },
})
export class DropdownMenuRadioGroupDirective {}

/**
 * Radio item. Selecting it sets the enclosing group's `value` and closes the
 * menu (single-select semantics), like React's RadioItem.
 */
@Component({
  selector: "button[uiDropdownMenuRadioItem]",
  standalone: true,
  imports: [RdxMenuCheckboxItemIndicator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuRadioItem,
      inputs: ["value", "closeOnClick", "disabled"],
      outputs: ["onSelect"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-radio-item",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
  template: RADIO_INDICATOR_TEMPLATE,
})
export class DropdownMenuRadioItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    DROPDOWN_MENU_CHECK_SVG
  )

  protected readonly classes = computed(() =>
    cn("cn-dropdown-menu-radio-item", DROPDOWN_MENU_SELECTABLE_ITEM_BASE, this.className())
  )
}

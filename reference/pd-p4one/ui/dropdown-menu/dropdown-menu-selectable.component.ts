import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  RdxDropdownMenuItemCheckboxDirective,
  RdxDropdownMenuItemIndicatorDirective,
  RdxDropdownMenuItemRadioDirective,
  RdxDropdownMenuItemRadioGroupDirective,
} from '@radix-ng/primitives/dropdown-menu';

import { cn } from '@/app/lib/utils';
import { DROPDOWN_MENU_INDICATOR_SVG } from './dropdown-menu.icons';

/**
 * Checkbox / radio item class — verbatim from the @force-ui/dropdown-menu
 * registry item (both selectable items share the string), plus the standard
 * subtle `transition-colors motion-reduce:transition-none` token-fast (150ms)
 * state fade, reduced-motion guarded (WCAG 2.3.3). As with the plain item, CDK
 * Menu items take real DOM focus so `focus:` classes paint for keyboard +
 * pointer with no `data-highlighted` remap. `pr-8` reserves the right gutter for
 * the check indicator. `[&_svg]:fill-current` is appended for the Material
 * Symbols icon system (skill §9) — same documented deviation as the plain item.
 */
const DROPDOWN_MENU_SELECTABLE_ITEM_CLASS =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4";

export { DROPDOWN_MENU_SELECTABLE_ITEM_CLASS };

const INDICATOR_TEMPLATE = `
    <span
      class="pointer-events-none absolute right-2 flex items-center justify-center"
      data-slot="dropdown-menu-item-indicator"
      aria-hidden="true"
    >
      <span
        rdxDropdownMenuItemIndicator
        class="flex items-center justify-center [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `;

/**
 * Angular port of @force-ui/dropdown-menu's `DropdownMenuCheckboxItem`.
 *
 * `RdxDropdownMenuItemCheckboxDirective` (host directive) makes it
 * `role="menuitemcheckbox"` with `aria-checked` / `data-state`; toggling
 * `checked` emits `(checkedChange)`. The check indicator is the registry's
 * `ItemIndicator`: a raw inline Material Symbols `<svg>` (swap-point in
 * `dropdown-menu.icons.ts`) injected via `[innerHTML]`, kept a direct-child
 * `<svg>` and coloured by `fill-current`. `[rdxDropdownMenuItemIndicator]` shows
 * it only when checked (`display` toggle); selection is also conveyed by
 * `aria-checked`, so it never relies on the glyph alone.
 *
 * A checkbox item keeps the menu open across toggles (multi-select), per spec.
 *
 * Usage: `<button rdxDropdownMenuItemCheckbox [checked]="showGrid" (checkedChange)="showGrid = $event">Show grid</button>`
 */
@Component({
  selector: 'button[rdxDropdownMenuItemCheckbox]',
  standalone: true,
  imports: [RdxDropdownMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxDropdownMenuItemCheckboxDirective,
      inputs: ['checked', 'disabled'],
      outputs: ['checkedChange', 'onSelect'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-checkbox-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class DropdownMenuCheckboxItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    DROPDOWN_MENU_INDICATOR_SVG,
  );
  protected readonly classes = computed(() =>
    cn(DROPDOWN_MENU_SELECTABLE_ITEM_CLASS, this.className()),
  );
}

/**
 * Angular port of `DropdownMenuRadioGroup` — wraps a set of radio items under
 * `role="group"` and tracks the selected `value`. radix-ng's
 * `RdxDropdownMenuItemRadioGroupDirective` (host directive) coordinates the
 * children through a `UniqueSelectionDispatcher` and emits `(valueChange)` on
 * selection. The registry group carries no class of its own.
 */
@Directive({
  selector: '[rdxDropdownMenuItemRadioGroup]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDropdownMenuItemRadioGroupDirective,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-radio-group',
  },
})
export class DropdownMenuRadioGroupDirective {}

/**
 * Angular port of `DropdownMenuRadioItem`. `RdxDropdownMenuItemRadioDirective`
 * (host directive) makes it `role="menuitemradio"` with `aria-checked` /
 * `data-state`; selecting it sets the enclosing group's `value`. Same check
 * indicator as the checkbox item. MUST sit inside a `[rdxDropdownMenuItemRadioGroup]`.
 *
 * Usage: `<button rdxDropdownMenuItemRadio value="grid">Grid view</button>`
 */
@Component({
  selector: 'button[rdxDropdownMenuItemRadio]',
  standalone: true,
  imports: [RdxDropdownMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxDropdownMenuItemRadioDirective,
      inputs: ['value', 'disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-radio-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class DropdownMenuRadioItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    DROPDOWN_MENU_INDICATOR_SVG,
  );
  protected readonly classes = computed(() =>
    cn(DROPDOWN_MENU_SELECTABLE_ITEM_CLASS, this.className()),
  );
}

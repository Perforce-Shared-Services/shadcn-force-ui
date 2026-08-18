import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  RdxContextMenuItemCheckboxDirective,
  RdxContextMenuItemIndicatorDirective,
  RdxContextMenuItemRadioDirective,
  RdxContextMenuItemRadioGroupDirective,
} from '@radix-ng/primitives/context-menu';

import { cn } from '@/app/lib/utils';
import { CONTEXT_MENU_INDICATOR_SVG } from './context-menu.icons';

/**
 * Checkbox / radio item class — verbatim from the @force-ui/context-menu
 * registry item (both selectable items share the string), plus the standard
 * subtle `transition-colors motion-reduce:transition-none` token-fast (150ms)
 * state fade, reduced-motion guarded (WCAG 2.3.3). As with the plain item, CDK
 * Menu items take real DOM focus so `focus:` classes paint for keyboard +
 * pointer with no `data-highlighted` remap. `pr-8` reserves the right gutter for
 * the check indicator. `[&_svg]:fill-current` is appended for the Material
 * Symbols icon system (skill §9) — same documented deviation as the plain item.
 */
const CONTEXT_MENU_SELECTABLE_ITEM_CLASS =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4";

export { CONTEXT_MENU_SELECTABLE_ITEM_CLASS };

const INDICATOR_TEMPLATE = `
    <span
      class="pointer-events-none absolute right-2 flex items-center justify-center"
      data-slot="context-menu-item-indicator"
      aria-hidden="true"
    >
      <span
        rdxContextMenuItemIndicator
        class="flex items-center justify-center [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `;

/**
 * Angular port of @force-ui/context-menu's `ContextMenuCheckboxItem`.
 *
 * `RdxContextMenuItemCheckboxDirective` (host directive) makes it
 * `role="menuitemcheckbox"` with `aria-checked` / `data-state`; toggling
 * `checked` emits `(checkedChange)`. The check indicator is the registry's
 * `ItemIndicator`: a raw inline Material Symbols `<svg>` (swap-point in
 * `context-menu.icons.ts`) injected via `[innerHTML]`, kept a direct-child
 * `<svg>` and coloured by `fill-current`. `[rdxContextMenuItemIndicator]` shows
 * it only when checked (`display` toggle); selection is also conveyed by
 * `aria-checked`, so it never relies on the glyph alone.
 *
 * A checkbox item keeps the menu open across toggles (multi-select), per spec.
 *
 * Usage: `<button rdxContextMenuItemCheckbox [checked]="showGrid" (checkedChange)="showGrid = $event">Show grid</button>`
 */
@Component({
  selector: 'button[rdxContextMenuItemCheckbox]',
  standalone: true,
  imports: [RdxContextMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxContextMenuItemCheckboxDirective,
      inputs: ['checked', 'disabled'],
      outputs: ['checkedChange', 'onSelect'],
    },
  ],
  host: {
    'data-slot': 'context-menu-checkbox-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class ContextMenuCheckboxItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CONTEXT_MENU_INDICATOR_SVG,
  );
  protected readonly classes = computed(() =>
    cn(CONTEXT_MENU_SELECTABLE_ITEM_CLASS, this.className()),
  );
}

/**
 * Angular port of `ContextMenuRadioGroup` — wraps a set of radio items under
 * `role="group"` and tracks the selected `value`. radix-ng's
 * `RdxContextMenuItemRadioGroupDirective` (host directive) coordinates the
 * children through a `UniqueSelectionDispatcher` and emits `(valueChange)` on
 * selection. The registry group carries no class of its own.
 */
@Directive({
  selector: '[rdxContextMenuItemRadioGroup]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxContextMenuItemRadioGroupDirective,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'context-menu-radio-group',
  },
})
export class ContextMenuRadioGroupDirective {}

/**
 * Angular port of `ContextMenuRadioItem`. `RdxContextMenuItemRadioDirective`
 * (host directive) makes it `role="menuitemradio"` with `aria-checked` /
 * `data-state`; selecting it sets the enclosing group's `value`. Same check
 * indicator as the checkbox item. MUST sit inside a `[rdxContextMenuItemRadioGroup]`.
 *
 * Usage: `<button rdxContextMenuItemRadio value="grid">Grid view</button>`
 */
@Component({
  selector: 'button[rdxContextMenuItemRadio]',
  standalone: true,
  imports: [RdxContextMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxContextMenuItemRadioDirective,
      inputs: ['value', 'disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'context-menu-radio-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class ContextMenuRadioItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CONTEXT_MENU_INDICATOR_SVG,
  );
  protected readonly classes = computed(() =>
    cn(CONTEXT_MENU_SELECTABLE_ITEM_CLASS, this.className()),
  );
}

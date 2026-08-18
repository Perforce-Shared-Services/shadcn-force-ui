import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

export type FieldLegendVariant = 'legend' | 'label';

/**
 * Angular port of @force-ui/field — `FieldLegend`.
 *
 * The `<legend>` for a `FieldSet`. `variant` sets the type scale: `legend`
 * (default, `text-base`) for a section heading, `label` (`text-sm`) when the
 * set reads more like a single labelled group.
 *
 * The size is computed from `variant()` rather than the registry's
 * `data-[variant=legend]:text-base` arbitrary-data variant, for TWO reasons
 * specific to this app's Tailwind v4 build:
 *  1. it emits no `data-[attr=value]:` variant utilities (only `@custom-variant`s
 *     like `data-checked`), so the registry string produced no size at all; and
 *  2. `text-base` is NOT Tailwind's 16px font-size utility here — tailwind.css
 *     registers a color token named `base` (`--color-base`), so `text-base`
 *     resolves to `color: var(--color-base)`, shadowing the font-size. So the
 *     `legend` size is written as `text-[1rem]` (the registry's intended 16px).
 * `text-sm` (label variant) is unaffected and used as-is. The `data-variant`
 * attribute is still reflected for any external styling.
 */
@Component({
  selector: 'legend[uiFieldLegend]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-legend',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class FieldLegendComponent {
  readonly variant = input<FieldLegendVariant>('legend');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'mb-1.5 font-medium',
      // Size by variant, computed in TS (see JSDoc — arbitrary data-variants
      // don't generate here, and `text-base` is a color token in this app).
      this.variant() === 'label' ? 'text-sm' : 'text-[1rem]',
      // Explicit deviation from the registry-verbatim string: in this app's
      // cascade a native `<legend>` gets recolored near-white — BOTH `color`
      // and `-webkit-text-fill-color` resolve to ~#f5f5f8 on the legend (its
      // fieldset parent stays black), rendering ~1.08:1 and failing WCAG 1.4.3.
      // The registry assumes the shadcn/Tailwind-preflight context where legend
      // simply inherits. `text-foreground` fixes `color`, but the paint is
      // decided by `-webkit-text-fill-color`, so pin that to the same token too.
      // Both reference `--foreground` (no hardcoded value); same class of fix as
      // `border-border` on accordion.
      'text-foreground [-webkit-text-fill-color:var(--foreground)]',
      this.className(),
    ),
  );
}

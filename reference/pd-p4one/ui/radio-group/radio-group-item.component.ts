import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxRadioIndicatorDirective, RdxRadioItemDirective } from '@radix-ng/primitives/radio';

import { cn } from '@/app/lib/utils';

/**
 * Base class string — from the @force-ui/radio-group registry item
 * (radix-force-ui style), with documented additions reconciled against the
 * Figma `RadioButton` component (sync 2026-06-10):
 *
 * 1. `transition-colors motion-reduce:transition-none` — the registry ships no
 *    transition; every interactive control gets a subtle token-fast (150ms =
 *    spec `--force-duration-fast`) colour fade on state change, reduced-motion
 *    guarded (WCAG 2.3.3). Matches the checkbox/switch siblings.
 *
 * 2. `bg-background` (explicit light surface fill) — the registry leaves the
 *    light unchecked control transparent (only `dark:bg-input/30`), but Figma
 *    binds the Off control fill to `custom/background dark:input\30` (white
 *    surface in light) and spec P8 mandates an explicit `bg.surface` so the
 *    control never inherits a host card/box tint. `data-checked:bg-primary`
 *    (attribute-selector specificity) overrides it when selected. Same fix as
 *    checkbox.
 *
 * 3. Dropped `dark:aria-invalid:border-destructive/50` — Figma's Invalid
 *    control stroke is full-opacity `base/destructive` in BOTH themes; keeping
 *    the dark border at full opacity matches Figma and lifts it out of the
 *    systemic dark `border/50` 1.4.11 contrast failure (same call as switch).
 *
 * `border border-input` is an explicit border colour (not a bare `border`), so
 * the currentColor gotcha doesn't apply. The `focus-visible:ring-3 ring-ring/50`
 * focus halo and `aria-invalid:ring-3 ring-destructive/20 dark:/40` invalid halo
 * are the registry's, kept verbatim — they map 1:1 to the Figma `State=Focus`
 * (`custom/outline`) and `State=Invalid` (`custom/destructive\20 dark:\40`) 3px
 * drop-shadow effects, verified at sync. `aria-invalid:aria-checked:border-primary`
 * is the registry/shadcn pattern (a selected item's border returns to primary so
 * the error reads as "resolved once a choice is made"); Figma instead keeps a
 * destructive stroke on On/Invalid — kept the registry behaviour for
 * consistency with checkbox; the FieldError text still carries the error.
 */
const RADIO_ITEM_CLASS =
  'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input bg-background transition-colors motion-reduce:transition-none outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 enabled:cursor-pointer aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary';

export { RADIO_ITEM_CLASS };

/**
 * Angular port of @force-ui/radio-group's `RadioGroupItem`.
 *
 * Attribute selector on a native `<button>` — the radix-ng
 * `RdxRadioItemDirective` host directive turns it into an accessible
 * `role="radio"` (`aria-checked`, `data-state`, native `disabled`, click +
 * arrow/space selection via the group's roving focus). MUST sit inside a
 * `[uiRadioGroup]`.
 *
 * Usage:
 *   <button uiRadioGroupItem value="final"></button>
 *
 * Inputs forwarded from the radix host directive:
 * - `value` — `string`, REQUIRED; the value this item selects in the group.
 * - `id`, `required`, `disabled`.
 *
 * The dot indicator is a `[rdxRadioIndicator]` span; radix-ng does not hide it
 * on its own, so it's driven off the indicator's `data-state`:
 * `data-unchecked:scale-0` / `data-checked:scale-100` with `transition-transform`
 * makes the dot grow out of the centre when selected (and shrink away when
 * cleared) instead of appearing instantly. This is a *transform* animation
 * (motion, like the switch thumb's slide) — NOT an opacity fade of the glyph,
 * which the port rules forbid because a fading indicator flashes. `scale-0`
 * collapses the dot to a point with no layout shift; `motion-reduce:` snaps it.
 * The registry/React version relies on Radix's conditional Indicator render;
 * the scale is a code-only liveliness polish, not modelled in Figma.
 *
 * Accessibility: give each item a visible label (wrap in a `<label>`, or place
 * adjacent text) or an `aria-label`. The dot's fill plus the filled track give
 * a shape signal, so selection never relies on colour alone.
 */
@Component({
  selector: 'button[uiRadioGroupItem]',
  standalone: true,
  imports: [RdxRadioIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxRadioItemDirective,
      inputs: ['value', 'id', 'required', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'radio-group-item',
    '[class]': 'classes()',
  },
  template: `
    <span
      rdxRadioIndicator
      data-slot="radio-group-indicator"
      aria-hidden="true"
      class="flex size-4 items-center justify-center transition-transform motion-reduce:transition-none data-unchecked:scale-0 data-checked:scale-100"
    >
      <span
        class="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
      ></span>
    </span>
  `,
})
export class RadioGroupItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(RADIO_ITEM_CLASS, this.className()));
}

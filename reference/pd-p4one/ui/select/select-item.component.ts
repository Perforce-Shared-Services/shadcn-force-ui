import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxSelectItemDirective, RdxSelectItemIndicatorDirective } from '@radix-ng/primitives/select';

import { cn } from '@/app/lib/utils';
import { SELECT_ITEM_INDICATOR_SVG } from './select.icons';

/**
 * Item class — from the @force-ui/select registry item, with one required
 * radix-ng divergence: the registry highlights the active item with `focus:`
 * utilities, but radix-ng items are `tabindex="-1"` and driven by an
 * active-descendant key manager that sets **`data-highlighted`** (not DOM
 * focus). So `focus:bg-accent` / `focus:text-accent-foreground` /
 * `…focus:**:text-accent-foreground` are remapped to `data-highlighted:`
 * equivalents — otherwise keyboard/pointer highlighting would never paint.
 * `transition-colors motion-reduce:transition-none` is the standard subtle
 * token-fast (150ms) state fade, reduced-motion guarded (WCAG 2.3.3). The
 * registry's `not-data-[variant=destructive]` qualifier is dropped — select
 * items have no destructive variant.
 */
const SELECT_ITEM_CLASS =
  "relative flex w-full cursor-pointer items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none data-highlighted:bg-accent data-highlighted:text-accent-foreground aria-selected:bg-primary-subtle! aria-selected:font-medium data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2";

export { SELECT_ITEM_CLASS };

/**
 * Angular port of @force-ui/select's `SelectItem`.
 *
 * Attribute selector on a native `<button>` — radix-ng's `RdxSelectItemDirective`
 * (host directive) makes it `role="option"` with `aria-selected` / `data-state` /
 * `data-disabled` / `data-highlighted`, wires click + keyboard selection through
 * the panel's active-descendant manager, and reports its `textContent` as the
 * label shown in the trigger. MUST sit inside a `[rdxSelectContent]`.
 *
 * The check indicator is the registry's `SelectPrimitive.ItemIndicator`: a raw
 * inline Material Symbols `<svg>` (swap-point in `select.icons.ts`) injected via
 * `[innerHTML]`, kept a direct-child `<svg>` and coloured by `fill-current`. The
 * `[rdxSelectItemIndicator]` directive shows it only when the item is selected
 * (`display` toggle) and marks it `aria-hidden` — selection is also conveyed by
 * `aria-selected`, so it never relies on the glyph alone.
 *
 * Usage: `<button rdxSelectItem value="dark">Dark</button>`
 */
@Component({
  // Native `[rdxSelectItem]` selector — the whole select family keeps radix's
  // `rdxSelect*` names (see SelectRootDirective). Styling + check indicator here;
  // behaviour via `hostDirectives`. radix's `options` ContentChildren query finds
  // it through the host directive.
  selector: 'button[rdxSelectItem]',
  standalone: true,
  imports: [RdxSelectItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxSelectItemDirective,
      inputs: ['value', 'textValue', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'select-item',
    '[class]': 'classes()',
  },
  template: `
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <span
        rdxSelectItemIndicator
        class="flex items-center justify-center text-primary [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `,
})
export class SelectItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /**
   * Sanitizer-trusted inline SVG check — bundled from `@material-symbols/svg-400`
   * at build time (static + trusted); bypassing the sanitizer is safe and
   * necessary (Angular strips `<svg>` from a raw `[innerHTML]` string).
   */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_ITEM_INDICATOR_SVG,
  );

  protected readonly classes = computed(() => cn(SELECT_ITEM_CLASS, this.className()));
}

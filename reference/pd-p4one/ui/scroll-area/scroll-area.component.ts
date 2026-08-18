import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Scrollbar orientation — which overflow axis the area scrolls. Mirrors the
 * registry `ScrollBar` `orientation` prop (vertical default), plus `both` for
 * areas that overflow on both axes.
 */
export enum ScrollAreaOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Both = 'both',
}

/**
 * Overflow + height utilities per orientation. `scrollbar-overlay` (defined in
 * `tailwind.css`) is the app's token-driven thin overlay scrollbar — the same
 * one the select / dropdown / command panels use — so the thumb colour comes
 * from `--muted-foreground` and re-resolves light↔dark with no hardcode.
 *
 * The height (`h-full`) is applied only on axes that scroll vertically
 * (`vertical` / `both`), where the host MUST carry an explicit height for the
 * viewport to fill and clip against. A `horizontal`-only area is sized by its
 * content height instead (`h-full` on a content-height host would resolve to
 * `0` and clip the row away — the registry's unconditional `size-full` relies
 * on radix's JS viewport wrapper, which the native port doesn't have), so the
 * caller only has to constrain the width.
 */
const ORIENTATION_OVERFLOW: Record<ScrollAreaOrientation, string> = {
  [ScrollAreaOrientation.Vertical]: 'h-full overflow-y-auto overflow-x-hidden',
  [ScrollAreaOrientation.Horizontal]: 'overflow-x-auto overflow-y-hidden',
  [ScrollAreaOrientation.Both]: 'h-full overflow-auto',
};

/**
 * Scroll-aware edge fade per orientation (`scroll-fade` utility in
 * tailwind.css — vendored from the Force UI "scroll-fade and shimmer"
 * changelog). Matches the scrolling axis: vertical fades top/bottom,
 * horizontal fades start/end, `both` fades all four edges. CSS-only
 * (mask-image + scroll-driven animations, no JS) — the fade grows in from an
 * edge as content scrolls past it and disappears once nothing's left to
 * reveal in that direction, hinting at more content without an overlay.
 */
const ORIENTATION_SCROLL_FADE: Record<ScrollAreaOrientation, string> = {
  [ScrollAreaOrientation.Vertical]: 'scroll-fade-y',
  [ScrollAreaOrientation.Horizontal]: 'scroll-fade-x',
  [ScrollAreaOrientation.Both]: 'scroll-fade',
};

/**
 * Angular port of @force-ui/scroll-area (radix-force-ui style).
 *
 * Element selector — usage (the host MUST be sized; the viewport fills it):
 *   <ui-scroll-area class="h-72 w-48"> …long content… </ui-scroll-area>
 *   <ui-scroll-area orientation="horizontal" class="w-96"> …wide content… </ui-scroll-area>
 *
 * Parity gap (documented, maintainer decision 2026-06-15): the registry
 * component is built on `radix-ui`'s ScrollArea primitive, which renders a
 * JS-driven custom-overlay scrollbar (`ScrollBar` + `ScrollAreaThumb`). There is
 * NO `@radix-ng/primitives` equivalent (v0.50.0). Rather than hand-rolling
 * bespoke scroll JS — the only such code in the design system — this port
 * scrolls natively and styles the scrollbar with the shared `scrollbar-overlay`
 * utility, exactly as the select / dropdown / command panels already do. So the
 * registry's `ScrollBar`, `ScrollAreaThumb` and `Corner` sub-DOM are folded into
 * the native styled scrollbar and are not exported. The `data-slot="scroll-area"`
 * (host) and `data-slot="scroll-area-viewport"` (inner) markers are preserved.
 *
 * The viewport is `tabindex="0"` so the scrollable region is reachable and
 * operable by keyboard (WCAG 2.1.1) and shows the focus ring. Because that makes
 * it a tab stop, it always carries an accessible name (WCAG 4.1.2): pass
 * `ariaLabel` when the area is a meaningful landmark and it becomes a named
 * `role="region"` (WCAG 1.3.1); omit it and the viewport falls back to a generic
 * "Scrollable region" name with no landmark role, so it is never an unnamed
 * focusable element.
 */
@Component({
  selector: 'ui-scroll-area',
  standalone: true,
  template: `
    <div
      data-slot="scroll-area-viewport"
      tabindex="0"
      [class]="viewportClasses()"
      [attr.role]="ariaLabel() ? 'region' : null"
      [attr.aria-label]="ariaLabel() || 'Scrollable region'"
    >
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'scroll-area',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class ScrollAreaComponent {
  /** Which axis scrolls. Mirrors the registry `ScrollBar` orientation prop. */
  readonly orientation = input<ScrollAreaOrientation>(ScrollAreaOrientation.Vertical);
  /** Accessible name; when set the viewport becomes a labelled `role="region"`. */
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Root: `relative` from the registry; `block` because a custom element is inline by default. */
  protected readonly classes = computed(() => cn('relative block', this.className()));

  /**
   * Viewport classes. The focus-ring + outline classes are byte-identical to the
   * registry source; `motion-reduce:transition-none` is added as a purely
   * additive WCAG 2.3.3 guard. Overflow/scrollbar are layered on per orientation.
   */
  protected readonly viewportClasses = computed(() =>
    cn(
      'w-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 motion-reduce:transition-none scrollbar-overlay',
      ORIENTATION_OVERFLOW[this.orientation()],
      ORIENTATION_SCROLL_FADE[this.orientation()],
    ),
  );
}

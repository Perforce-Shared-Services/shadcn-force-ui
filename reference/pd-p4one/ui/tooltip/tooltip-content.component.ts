import { computed, Directive, input } from '@angular/core';
import {
  RdxTooltipArrowDirective,
  RdxTooltipContentDirective,
} from '@radix-ng/primitives/tooltip';

import { cn } from '@/app/lib/utils';

/**
 * Content panel class — verbatim from the @force-ui/tooltip registry item, plus
 * one a11y addition (`motion-reduce:animate-none`, WCAG 2.3.3) and one parity
 * deviation noted below.
 *
 * radix-ng portals the styled element through a CDK overlay. Unlike the
 * select / dropdown-menu ports, radix-ng's `RdxTooltipContentAttributesComponent`
 * DOES set `data-side` (and `data-align` / `data-state`), so the registry's
 * `data-[side=…]:slide-in-from-…` entrance-direction classes and the
 * `data-open:` / `data-closed:` animations ALL fire off the data-state bridge —
 * better parity than the dropdown/select panels (where `data-side` was inert).
 *
 * `data-[state=delayed-open]:…` is kept VERBATIM but is inert: radix-ng's
 * `RdxTooltipState` is only `open` / `closed`, so it never emits `delayed-open`.
 * The parallel `data-open:animate-in fade-in-0 zoom-in-95` covers the entrance,
 * so dropping the dead variant would change nothing — kept for byte-parity.
 *
 * `origin-(--radix-tooltip-content-transform-origin)` is also kept verbatim but
 * inert — radix-ng positions via CDK and never sets that Radix CSS var, so the
 * zoom origin falls back to centre (same documented treatment as the dropdown
 * port's `--radix-*` arbitrary-value classes).
 *
 * `has-data-[slot=kbd]:pr-1.5` and the `**:data-[slot=kbd]:…` rules style a
 * `[uiKbd]` chip embedded in the tooltip (e.g. a shortcut hint) — verbatim.
 *
 * Colours are explicit (`bg-foreground` / `text-background`) — the inverse of
 * the page surface, matching the Force spec's "inverted surfaces (tooltips) →
 * `color.bg.inverse`" rule (the Figma component's `primary` fill is the
 * divergence; maintainer 2026-06-11 ruled code-as-spec and the Figma gets
 * recoloured to inverse). Explicit colours mean the bare-`border` →
 * `currentColor` gotcha doesn't apply (no border in the string).
 *
 * `shadow-sm` is added per the spec's elevation table (tooltip → `--force-shadow-sm`)
 * — the registry string carried no shadow, so this is a deliberate code→spec
 * fix. The spec's `z-index.tooltip` (700) is intentionally NOT applied: the
 * Radix/CDK bridge says portalled overlays stack by mount order + a root
 * stacking context, so the registry's flat `z-50` stays (same as the other
 * overlay ports).
 */
const TOOLTIP_CONTENT_CLASS =
  "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-sm has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm motion-reduce:animate-none data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { TOOLTIP_CONTENT_CLASS };

/**
 * Angular port of the positioning half of @force-ui/tooltip's `TooltipContent`.
 *
 * Applied as a STRUCTURAL directive to an `<ng-template rdxTooltipContent>` —
 * `RdxTooltipContentDirective` (host directive, built on `CdkConnectedOverlay`)
 * portals the template and positions it. React's `TooltipContent` folded the
 * Portal + Content + Arrow into one element; radix-ng splits positioning (this
 * `<ng-template>`) from the styled box (`[rdxTooltipContentAttributes]` inside).
 *
 * Re-exposes radix's positioning inputs: `side` (default `top`), `sideOffset`,
 * `align` (default `center`), `alignOffset`. CDK does collision flipping. The
 * React default `sideOffset=0` differs from radix-ng (offset auto-includes the
 * arrow height) — documented; pass `sideOffset` to tune.
 */
@Directive({
  selector: '[rdxTooltipContent]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipContentDirective,
      inputs: ['side', 'sideOffset', 'align', 'alignOffset'],
    },
  ],
})
export class TooltipContentDirective {}

/**
 * Angular port of the styled half of @force-ui/tooltip's `TooltipContent` — the
 * visible box. Co-applies with radix-ng's `RdxTooltipContentAttributesComponent`
 * (which is a *component*, so it can't be a `hostDirective` — same constraint as
 * the select root). The radix component supplies `role`, `id`, `data-state`,
 * `data-side`, `data-align` and the animation lifecycle; this directive owns the
 * `[class]` and stamps the registry `data-slot="tooltip-content"`. The shared
 * `[rdxTooltipContentAttributes]` selector means consumers write one attribute
 * and get both.
 *
 * `class` flows through `cn()` last so callers can override (e.g. widen
 * `max-w-xs`, or drop the arrow gap).
 */
@Directive({
  selector: '[rdxTooltipContentAttributes]',
  standalone: true,
  host: {
    'data-slot': 'tooltip-content',
    '[class]': 'classes()',
  },
})
export class TooltipContentAttributesDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(TOOLTIP_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of @force-ui/tooltip's `TooltipArrow` — the little pointer toward
 * the trigger. Optional; place inside `[rdxTooltipContentAttributes]`.
 *
 * Parity deviation: the registry draws the arrow as a rotated, rounded square
 * (`size-2.5 rotate-45 rounded-[2px] bg-foreground`). radix-ng's
 * `RdxTooltipArrowDirective` instead renders a real `<svg>` triangle and sets its
 * size + absolute position inline (default 10×5), so those square-technique
 * classes don't transfer. We keep only `fill-foreground` — the svg polygon has
 * no `fill` of its own and inherits it, so the triangle matches the panel's
 * `bg-foreground`. `z-50` keeps it above sibling content. Tune the shape with the
 * `width` / `height` inputs.
 */
@Directive({
  selector: '[rdxTooltipArrow]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipArrowDirective,
      inputs: ['width', 'height'],
    },
  ],
  host: {
    // Decorative — the arrow is a visual pointer with no semantic content; hide
    // its generated <svg> from assistive tech (WCAG 1.1.1).
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class TooltipArrowDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('z-50 fill-foreground', this.className()));
}

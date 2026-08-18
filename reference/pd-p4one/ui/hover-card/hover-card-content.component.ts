import { computed, Directive, input } from '@angular/core';
import { RdxHoverCardContentDirective } from '@radix-ng/primitives/hover-card';

import { cn } from '@/app/lib/utils';

/**
 * Content panel class — verbatim from the @force-ui/hover-card registry item,
 * plus one reduced-motion a11y addition (`motion-reduce:duration-0`, WCAG 2.3.3
 * — see below).
 *
 * Nearly identical to the popover panel (its styled sibling): same `bg-popover`
 * surface, `ring-1 ring-foreground/10` edge, `shadow-md` elevation, `p-2.5`,
 * `text-sm`, `text-popover-foreground`, and the `data-[side]:slide-in-*` +
 * `data-open`/`data-closed` animation set. The two registry differences from the
 * popover panel: `w-64` (vs the popover's `w-72`) and NO `flex flex-col gap-2.5`
 * (a hover card is freeform preview content, not a header/body/footer stack), so
 * the class is a plain block.
 *
 * These animation classes are LIVE: the `data-open` / `data-closed` /
 * `data-[side]` variants are driven by `data-state` / `data-side`, which radix-ng
 * stamps via `RdxHoverCardContentAttributesComponent`. That component MUST be
 * imported alongside this directive for the animations to fire — the barrel ships
 * both together as `HoverCardContentBox` for exactly this reason (see index.ts).
 * The entrance (`data-open:animate-in fade-in-0 zoom-in-95`) plays on open; the
 * EXIT (`data-closed:animate-out …`) plays when the root's `cssAnimation` +
 * `cssClosingAnimation` are enabled (the stories turn them on).
 *
 * Reduced-motion guard = `motion-reduce:duration-0`, NOT the popover/tooltip
 * ports' `motion-reduce:animate-none`. Deliberate and load-bearing: when
 * `cssClosingAnimation` is on, radix-ng WAITS for the exit `animationend` before
 * detaching the overlay. `animate-none` fires no `animationend`, so under
 * `prefers-reduced-motion` the card would hang open forever. A 0s animation
 * (`duration-0`) still fires `animationend` instantly, so the overlay detaches at
 * once AND no motion is perceived — WCAG 2.3.3 satisfied without the hang. (The
 * popover/tooltip can keep `animate-none` because they don't enable
 * `cssClosingAnimation`.)
 *
 * `origin-(--radix-hover-card-content-transform-origin)` is kept verbatim but
 * inert — radix-ng positions via CDK and never sets that Radix CSS var, so the
 * zoom origin falls back to centre (same documented treatment as the popover /
 * tooltip ports' `--radix-*` arbitrary-value classes).
 *
 * Colours are explicit (`bg-popover` / `text-popover-foreground`) and elevation
 * is `ring-1 ring-foreground/10` + `shadow-md` — NO bare `border`, so the
 * bare-`border` → `currentColor` gotcha doesn't apply. `shadow-md` is
 * registry-verbatim (same as the popover panel). `outline-hidden` removes the
 * default focus outline on the portalled box.
 */
const HOVER_CARD_CONTENT_CLASS =
  "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 motion-reduce:duration-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { HOVER_CARD_CONTENT_CLASS };

/**
 * Angular port of the positioning half of @force-ui/hover-card's
 * `HoverCardContent`.
 *
 * Applied as a STRUCTURAL directive to an `<ng-template rdxHoverCardContent>` —
 * `RdxHoverCardContentDirective` (host directive, built on `CdkConnectedOverlay`)
 * portals the template and positions it. React's `HoverCardContent` folded the
 * Portal + Content into one element; radix-ng splits positioning (this
 * `<ng-template>`) from the styled box (`[rdxHoverCardContentAttributes]`
 * inside).
 *
 * Re-exposes radix's positioning inputs: `side`, `sideOffset`, `align` (React
 * defaults `align="center"`, `sideOffset=4`), `alignOffset`. CDK does collision
 * flipping. The interaction outputs (`onOpen` / `onClosed` /
 * `onOverlayEscapeKeyDown` / `onOverlayOutsideClick`) are surfaced for consumers
 * that need to react to open/close.
 */
@Directive({
  selector: '[rdxHoverCardContent]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxHoverCardContentDirective,
      inputs: [
        'side',
        'sideOffset',
        'align',
        'alignOffset',
        'alternatePositionsDisabled',
        'onOverlayEscapeKeyDownDisabled',
        'onOverlayOutsideClickDisabled',
      ],
      outputs: ['onOpen', 'onClosed', 'onOverlayEscapeKeyDown', 'onOverlayOutsideClick'],
    },
  ],
})
export class HoverCardContentDirective {}

/**
 * Angular port of the styled half of @force-ui/hover-card's `HoverCardContent` —
 * the visible box. Co-applies with radix-ng's content-attributes component
 * (which is a *component*, so it can't be a `hostDirective` — same constraint as
 * the popover / tooltip / select roots). The radix component supplies `role`,
 * `id`, `data-state`, `data-side`, `data-align`, the animation lifecycle, AND the
 * pointerenter/leave/focus/blur listeners that keep the card open while the
 * pointer is over it; this directive owns the `[class]` and stamps the registry
 * `data-slot="hover-card-content"`. The shared `[rdxHoverCardContentAttributes]`
 * selector means consumers write one attribute and get both.
 *
 * `class` flows through `cn()` last so callers can override (e.g. widen `w-64`).
 *
 * Accessible name (radix-ng parity gap — mitigated here). radix-ng hard-codes
 * `role="dialog"` on the box (Radix React's hover-card content carries NO role —
 * it treats the card as supplementary, non-essential preview content). The
 * hover-card registry ships no Title / Description parts, so the popover port's
 * auto-`aria-labelledby` wiring has nothing to hang on and the panel would be
 * announced as a bare "dialog" (WCAG 4.1.2). We can't safely strip the `role`
 * (two directives writing the same host attribute has undefined precedence, and
 * the fix belongs upstream in radix-ng), so instead this exposes an `aria-label`
 * input that binds straight onto the box: pass a short name for the card
 * (`aria-label="Lighting artist"`) and the "dialog" is announced with it. It is
 * OPTIONAL (parity with the popover box, which can also be nameless) but EVERY
 * story supplies one so the reference usage never normalises a nameless dialog.
 * A consumer using `aria-labelledby` instead can leave `aria-label` unset.
 *
 * `class` flows through `cn()` last so callers can override (e.g. widen `w-64`).
 */
@Directive({
  selector: '[rdxHoverCardContentAttributes]',
  standalone: true,
  host: {
    'data-slot': 'hover-card-content',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[class]': 'classes()',
  },
})
export class HoverCardContentAttributesDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /**
   * Accessible name for the `role="dialog"` box radix-ng stamps. Optional; when
   * omitted the panel is unnamed (supply `aria-labelledby` yourself if you name
   * it from a visible heading inside the card instead).
   */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  protected readonly classes = computed(() => cn(HOVER_CARD_CONTENT_CLASS, this.className()));
}

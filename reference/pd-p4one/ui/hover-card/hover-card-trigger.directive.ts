import { Directive, inject } from '@angular/core';
import { RdxHoverCardRootDirective, RdxHoverCardTriggerDirective } from '@radix-ng/primitives/hover-card';

/**
 * Angular port of @force-ui/hover-card's `HoverCardTrigger`.
 *
 * Applied to whatever element reveals the card — usually a link or an avatar
 * (`<a rdxHoverCardTrigger>`). `RdxHoverCardTriggerDirective` (host directive,
 * built on `CdkOverlayOrigin`) owns the hover/focus-to-open behaviour and is the
 * overlay's positioning origin: it wires `pointerenter` / `pointerleave` /
 * `focus` / `blur` (and a `click`) to the root's open/close timers, so the card
 * opens on a settled hover or on keyboard focus (WCAG 2.1.1 — hover previews are
 * reachable without a pointer) and closes on leave/blur.
 *
 * Unlike the popover trigger (opens on CLICK, content is interactive, focus moves
 * in), the hover-card trigger opens on HOVER and does NOT move focus into the
 * content — the card is supplementary preview content. There is therefore no
 * focus to restore on close, so this trigger deliberately OMITS the popover
 * port's focus-return effect (nothing was taken).
 *
 * Valid `aria-controls` (WCAG 4.1.2): radix-ng's trigger always stamps
 * `aria-controls="<content-id>"` (and `aria-haspopup="dialog"` /
 * `aria-expanded`), but the content is portalled into the overlay only while
 * open — when closed the referenced element is absent, so axe's
 * `aria-valid-attr-value` flags a dangling IDREF. This wrapper overrides the
 * binding to emit `aria-controls` ONLY while the card is open (host bindings take
 * precedence over a host directive's, so this wins cleanly). `aria-expanded`
 * (also on the radix trigger) already conveys the collapsed state.
 *
 * Parity note: `aria-haspopup="dialog"` + `aria-expanded` are radix-ng defaults
 * (Radix React's hover-card trigger carries neither, treating the card as
 * non-essential supplementary content). Kept as-is — announcing the trigger as
 * opening a popup is defensible and harmless; not worth fighting the primitive.
 *
 * This wrapper otherwise only adds the registry `data-slot="hover-card-trigger"`;
 * the selector stays the native `[rdxHoverCardTrigger]` so the radix root's
 * `contentChild` query and the directive's overlay-origin wiring resolve.
 */
@Directive({
  selector: '[rdxHoverCardTrigger]',
  standalone: true,
  hostDirectives: [RdxHoverCardTriggerDirective],
  host: {
    'data-slot': 'hover-card-trigger',
    '[attr.aria-controls]': 'hoverCardRoot.isOpen() ? hoverCardRoot.contentDirective()?.name() : null',
  },
})
export class HoverCardTriggerDirective {
  private readonly hoverCardRoot = inject(RdxHoverCardRootDirective);
}

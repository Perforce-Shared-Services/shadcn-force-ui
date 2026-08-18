import { Directive } from '@angular/core';
import { RdxTooltipTriggerDirective } from '@radix-ng/primitives/tooltip';

/**
 * Angular port of @force-ui/tooltip's `TooltipTrigger`.
 *
 * Applied to whatever element opens the tooltip — usually a `[uiButton]` or an
 * icon button. `RdxTooltipTriggerDirective` (host directive, built on
 * `CdkOverlayOrigin`) owns the hover/focus open-close behaviour and stamps
 * `type="button"`, `aria-expanded`, `aria-controls`, and `data-state`
 * (open/closed). It opens on `pointerenter` / `focus` and closes on
 * `pointerleave` / `blur`, so the tooltip is reachable by keyboard, not just
 * pointer (WCAG 2.1.1).
 *
 * Parity / a11y note: radix-ng models the tooltip as a *rich* popover — the
 * trigger gets `aria-haspopup="dialog"` and the content is `role="dialog"`,
 * rather than the classic `aria-describedby` → `role="tooltip"` wiring. This is
 * baked into the primitive's host bindings (can't be overridden without a
 * binding conflict). Acceptable for short text tooltips; flagged for the audit
 * pass. Don't put essential-only information in a tooltip regardless.
 *
 * This wrapper only adds the registry `data-slot="tooltip-trigger"`; the selector
 * stays the native `[rdxTooltipTrigger]` so the radix root's `contentChild`
 * query and the directive's overlay-origin wiring resolve.
 */
@Directive({
  selector: '[rdxTooltipTrigger]',
  standalone: true,
  hostDirectives: [RdxTooltipTriggerDirective],
  host: {
    'data-slot': 'tooltip-trigger',
  },
})
export class TooltipTriggerDirective {}

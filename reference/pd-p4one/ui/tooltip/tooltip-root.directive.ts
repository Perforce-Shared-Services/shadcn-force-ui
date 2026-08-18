import { Directive } from '@angular/core';
import { RdxTooltipRootDirective } from '@radix-ng/primitives/tooltip';

/**
 * Angular port of @force-ui/tooltip's root (`Tooltip`), built on
 * `@radix-ng/primitives/tooltip` (`RdxTooltipRootDirective`, a CDK-overlay
 * directive).
 *
 * The React registry has FOUR parts — `TooltipProvider`, `Tooltip` (root),
 * `TooltipTrigger`, `TooltipContent`. radix-ng has no `Provider`: the open/close
 * delays that the React provider's `delayDuration` controls are per-root inputs
 * here (`openDelay` / `closeDelay`), so `TooltipProvider` is intentionally
 * omitted (documented parity gap — no app-wide delay context to wrap).
 *
 * `RdxTooltipRootDirective` is a *directive* (not a component, unlike the select
 * root), so it rides on `hostDirectives` cleanly: its `contentChild` queries
 * (trigger / content / arrow) resolve against this element's children, which is
 * exactly where the trigger button and the content `<ng-template>` live. This
 * wrapper re-exposes the radix inputs and stamps the registry's
 * `data-slot="tooltip"` for cross-framework parity.
 *
 * Defaults come from radix-ng: `openDelay=500`, `closeDelay=200` — a short hover
 * delay (vs. the React provider's `delayDuration=0`) that avoids tooltip flicker
 * as the cursor crosses a row, which suits a file-browser UI. Override per
 * instance when needed.
 *
 * `cssAnimation` (+ `cssOpeningAnimation` / `cssClosingAnimation`) make the root
 * WAIT for the CSS exit animation before detaching the overlay, so the registry's
 * `data-closed:animate-out fade-out-0 zoom-out-95` plays on close. They are
 * **off by default** (matching the dropdown-menu / select ports): the entrance
 * (`data-open:animate-in …`) fires from CSS regardless, and close detaches
 * immediately — exactly how the sibling overlays behave.
 *
 * ⚠️ Do NOT enable `cssAnimation` naively. The content carries
 * `motion-reduce:animate-none` (WCAG 2.3.3), so under `prefers-reduced-motion`
 * the exit animation is suppressed — but `cssClosingAnimation` would still make
 * the root wait for an `animationend` that never fires, hanging the tooltip
 * open. If a consumer wants the exit fade, they must gate these flags on the
 * user's motion preference themselves. The stories therefore leave them off.
 *
 * Usage:
 *   <div rdxTooltipRoot>
 *     <button rdxTooltipTrigger uiButton variant="outline">Hover</button>
 *     <ng-template rdxTooltipContent>
 *       <div rdxTooltipContentAttributes>
 *         Sync this version
 *         <span rdxTooltipArrow></span>
 *       </div>
 *     </ng-template>
 *   </div>
 */
@Directive({
  // Native `[rdxTooltipRoot]` selector so the radix root + the part directives'
  // `inject(RdxTooltipRootDirective)` resolve the real instance (same family
  // convention as select/dropdown-menu).
  selector: '[rdxTooltipRoot]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipRootDirective,
      inputs: [
        'defaultOpen',
        'open',
        'openDelay',
        'closeDelay',
        'externalControl',
        'cssAnimation',
        'cssOpeningAnimation',
        'cssClosingAnimation',
      ],
    },
  ],
  host: {
    'data-slot': 'tooltip',
  },
})
export class TooltipRootDirective {}

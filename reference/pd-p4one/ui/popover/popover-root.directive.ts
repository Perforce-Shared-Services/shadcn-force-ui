import { Directive } from '@angular/core';
import { RdxPopoverRootDirective } from '@radix-ng/primitives/popover';

/**
 * Angular port of @force-ui/popover's root (`Popover`), built on
 * `@radix-ng/primitives/popover` (`RdxPopoverRootDirective`, a CDK-overlay
 * directive). A popover is a non-modal overlay anchored to a trigger that holds
 * RICH, interactive content (form fields, links, buttons) — the heavier sibling
 * of the tooltip (short hint, hover-only) and the lighter sibling of the dialog
 * (modal, focus-trapped, blocks the page).
 *
 * `RdxPopoverRootDirective` is a *directive* (not a component, unlike the select
 * root), so it rides on `hostDirectives` cleanly: its `contentChild` queries
 * (trigger / content / arrow / close / anchor) resolve against this element's
 * children, which is exactly where the trigger and the content `<ng-template>`
 * live. This wrapper re-exposes the radix inputs and stamps the registry's
 * `data-slot="popover"` for cross-framework parity.
 *
 * The popover opens on trigger CLICK (not hover) and closes on outside-click or
 * Escape — radix-ng's `RdxPopoverTriggerDirective` and content overlay own that
 * behaviour. Use `defaultOpen` (uncontrolled) or `open` + `externalControl`
 * (controlled) to drive it programmatically.
 *
 * `cssAnimation` (+ `cssOpeningAnimation` / `cssClosingAnimation`) make the root
 * WAIT for the CSS exit animation before detaching the overlay, so the registry's
 * `data-closed:animate-out fade-out-0 zoom-out-95` plays on close. They are
 * **off by default** (matching the tooltip / dropdown-menu / select ports): the
 * entrance (`data-open:animate-in …`) fires from CSS regardless, and close
 * detaches immediately.
 *
 * ⚠️ Do NOT enable `cssAnimation` naively. The content carries
 * `motion-reduce:animate-none` (WCAG 2.3.3), so under `prefers-reduced-motion`
 * the exit animation is suppressed — but `cssClosingAnimation` would still make
 * the root wait for an `animationend` that never fires, hanging the popover open.
 * If a consumer wants the exit fade, they must gate these flags on the user's
 * motion preference themselves.
 *
 * Usage:
 *   <div rdxPopoverRoot>
 *     <button rdxPopoverTrigger uiButton variant="outline">Open</button>
 *     <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
 *       <div rdxPopoverContentAttributes>
 *         <div rdxPopoverHeader>
 *           <div rdxPopoverTitle>Version details</div>
 *           <p rdxPopoverDescription>Adjust the version before you submit.</p>
 *         </div>
 *         …
 *         <span rdxPopoverArrow></span>
 *       </div>
 *     </ng-template>
 *   </div>
 */
@Directive({
  // Native `[rdxPopoverRoot]` selector so the radix root + the part directives'
  // `inject(RdxPopoverRootDirective)` resolve the real instance (same family
  // convention as tooltip/select/dropdown-menu).
  selector: '[rdxPopoverRoot]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverRootDirective,
      inputs: [
        'anchor',
        'defaultOpen',
        'open',
        'externalControl',
        'cssAnimation',
        'cssOpeningAnimation',
        'cssClosingAnimation',
      ],
    },
  ],
  host: {
    'data-slot': 'popover',
  },
})
export class PopoverRootDirective {}

import { Directive } from '@angular/core';
import { RdxHoverCardRootDirective } from '@radix-ng/primitives/hover-card';

/**
 * Angular port of @force-ui/hover-card's root (`HoverCard`), built on
 * `@radix-ng/primitives/hover-card` (`RdxHoverCardRootDirective`, a CDK-overlay
 * directive). A hover card is a non-modal overlay anchored to a trigger that
 * reveals RICH preview content on HOVER — the sibling of the popover (same
 * styled box, but the popover opens on CLICK and holds interactive content) and
 * of the tooltip (also hover-driven, but the tooltip is a short text hint, not a
 * card). Canonical use: a hover preview of an asset / user / version.
 *
 * `RdxHoverCardRootDirective` is a *directive* (not a component, unlike the
 * select root), so it rides on `hostDirectives` cleanly: its `contentChild`
 * queries (trigger / content / arrow / anchor) resolve against this element's
 * children, which is exactly where the trigger and the content `<ng-template>`
 * live. This wrapper re-exposes the radix inputs and stamps the registry's
 * `data-slot="hover-card"` for cross-framework parity.
 *
 * Behaviour differs from the popover port: the card opens when the pointer
 * settles on the trigger (`openDelay`, default ~700ms) and closes shortly after
 * it leaves the trigger AND the card (`closeDelay`) — radix-ng's
 * `RdxHoverCardTriggerDirective` and the content overlay own the pointerenter /
 * pointerleave / focus / blur wiring. The card stays open while the pointer is
 * over the content itself, so a user can move into it to read/select. Use
 * `openDelay` / `closeDelay` to tune responsiveness, or `defaultOpen`
 * (uncontrolled) / `open` + `externalControl` (controlled) to drive it
 * programmatically.
 *
 * Exit animation: the entrance (`data-open:animate-in fade-in-0 zoom-in-95`)
 * plays on open, but the EXIT (`data-closed:animate-out …`) only plays if the
 * root WAITS for the animation before detaching the overlay — which it does when
 * `cssAnimation` + `cssClosingAnimation` are `true`. They are `false` by default
 * (radix-ng's default), so enable BOTH to get the exit fade
 * (`[cssAnimation]="true" [cssClosingAnimation]="true"`); leave `cssOpeningAnimation`
 * off — the entrance already animates. This is safe here: the content's
 * reduced-motion guard is `motion-reduce:duration-0` (a 0s animation that still
 * fires `animationend`), NOT `animate-none` — so under `prefers-reduced-motion`
 * the exit completes instantly and the overlay detaches at once rather than
 * hanging on an `animationend` that never comes. No per-consumer gating needed.
 *
 * NOTE: the animations depend on `data-state` / `data-side`, which radix-ng
 * stamps via `RdxHoverCardContentAttributesComponent`. That component is shipped
 * as part of `HoverCardContentBox` (see index.ts) precisely so it co-applies and
 * the animations actually fire — the sibling overlay ports (popover / tooltip /
 * dropdown / select) omit it and are consequently animation-inert.
 *
 * Content-on-hover-or-focus (WCAG 1.4.13) is satisfied out of the box: the card
 * is DISMISSABLE (radix-ng's content overlay closes on Escape by default —
 * `onOverlayEscapeKeyDownDisabled` defaults to `false`), HOVERABLE (the content
 * box's own pointerenter/leave listeners keep it open while the pointer is over
 * it, so you can move from trigger into the card), and PERSISTENT (`closeDelay`).
 * If you set `closeDelay="0"` AND a large `sideOffset`, the trigger→card gap can
 * become un-bridgeable — keep a small `closeDelay` when the card sits off the
 * trigger.
 *
 * Content constraint: a hover card holds PASSIVE preview content. It does not
 * move focus into the card (so there is no focus-return wiring — unlike the
 * popover). Do NOT place focusable/interactive controls (buttons, links, inputs)
 * inside it: a keyboard user tabbing in would have no defined focus-return
 * target on close, and the card can vanish on `closeDelay` mid-interaction. If
 * you need interactive content anchored to a trigger, use the popover (opens on
 * click, traps + restores focus) instead.
 *
 * Usage:
 *   <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
 *     <a rdxHoverCardTrigger href="…">@artist</a>
 *     <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
 *       <div rdxHoverCardContentAttributes aria-label="Artist">
 *         … preview content …
 *       </div>
 *     </ng-template>
 *   </div>
 */
@Directive({
  // Native `[rdxHoverCardRoot]` selector so the radix root + the part
  // directives' `inject(RdxHoverCardRootDirective)` resolve the real instance
  // (same family convention as popover / tooltip / select / dropdown-menu).
  selector: '[rdxHoverCardRoot]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxHoverCardRootDirective,
      inputs: [
        'anchor',
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
    'data-slot': 'hover-card',
  },
})
export class HoverCardRootDirective {}

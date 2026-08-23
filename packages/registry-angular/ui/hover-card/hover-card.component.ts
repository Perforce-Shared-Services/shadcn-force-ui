import { ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxPreviewCardPopup,
  RdxPreviewCardPortal,
  RdxPreviewCardPositioner,
  RdxPreviewCardRoot,
  RdxPreviewCardTrigger,
} from "@radix-ng/primitives/preview-card"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/hover-card (radix-force-ui style).
 *
 * IMPORTANT primitive mapping: p4one's reference used
 * `@radix-ng/primitives/hover-card` v0.50.0 (`RdxHoverCard*` directives). That
 * module no longer exists in radix-ng v1.x — the equivalent primitive was
 * renamed to **preview-card** (`@radix-ng/primitives/preview-card`,
 * `RdxPreviewCard*`), following Base UI naming. This port therefore maps the
 * registry's HoverCard parts onto the preview-card primitive while keeping the
 * registry's public HoverCard names and `data-slot`s.
 *
 * Part mapping (React → Angular):
 *
 *   <HoverCard>          → <div uiHoverCardRoot>
 *   <HoverCardTrigger>   → <button uiHoverCardTrigger [delay] [closeDelay]>
 *   <HoverCard.Portal>   → <ng-template uiHoverCardPortal>
 *     (positioner)       →   <div uiHoverCardPositioner [side] [sideOffset] [align]>
 *   <HoverCardContent>   →     <div uiHoverCardContent>
 *
 * The preview-card anatomy splits React's single `HoverCardContent` (Portal +
 * Content folded together) into a positioning wrapper (`uiHoverCardPositioner`)
 * and the styled box (`uiHoverCardContent`). Every demo writes both; the
 * positioner carries `side` / `sideOffset` / `align` / `alignOffset`.
 *
 * Usage:
 *   <div uiHoverCardRoot>
 *     <button uiButton variant="link" uiHoverCardTrigger>Hover Here</button>
 *     <ng-template uiHoverCardPortal>
 *       <div uiHoverCardPositioner>
 *         <div uiHoverCardContent>…</div>
 *       </div>
 *     </ng-template>
 *   </div>
 *
 * radix-ng owns open/close timers (trigger `delay` / `closeDelay`), dismissal
 * (Escape / outside press / focus-out) and the data-open / data-closed /
 * data-side state attributes that the `cn-hover-card-content` animation tokens
 * key off. No manual aria or animation wiring needed.
 */

/**
 * Angular port of `HoverCard` (the root). Groups all parts and owns open
 * state. The `open` model input/output is re-exposed under `[uiOpen]` /
 * `(uiOpenChange)` for controlled usage; demos use the uncontrolled form.
 */
@Directive({
  selector: "[uiHoverCardRoot]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPreviewCardRoot,
      inputs: ["open: uiOpen", "defaultOpen"],
      outputs: ["openChange: uiOpenChange", "onOpenChangeComplete"],
    },
  ],
  host: {
    "data-slot": "hover-card",
  },
})
export class HoverCardRootDirective {}

/**
 * Angular port of `HoverCardTrigger`. Apply to the element that reveals the
 * card (typically a `[uiButton]` or a link). Opens on settled hover or
 * keyboard focus; closes on leave/blur after `closeDelay`. Re-exposes the
 * hover timing inputs (`delay` / `closeDelay`) and `disabled`.
 */
@Directive({
  selector: "[uiHoverCardTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPreviewCardTrigger,
      inputs: ["disabled", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "hover-card-trigger",
  },
})
export class HoverCardTriggerDirective {}

/**
 * Angular port of `HoverCard.Portal`. Structural directive — teleports the
 * positioned card to document.body while open and keeps it mounted until exit
 * animations finish. Use the explicit `<ng-template uiHoverCardPortal>` form;
 * the positioner must live inside it.
 */
@Directive({
  selector: "ng-template[uiHoverCardPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxPreviewCardPortal, inputs: ["container"] }],
  host: {
    "data-slot": "hover-card-portal",
  },
})
export class HoverCardPortalDirective {}

/**
 * Angular port of the positioning half of React's `HoverCardContent`
 * (`align="center"`, `sideOffset=4` defaults live here, mirroring the React
 * source). Wraps `[rdxPreviewCardPositioner]`, which handles collision
 * flipping and stamps `data-side` for the slide-in animations.
 */
@Directive({
  selector: "[uiHoverCardPositioner]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPreviewCardPositioner,
      inputs: ["anchor", "side", "sideOffset", "align", "alignOffset", "dir"],
    },
  ],
  host: {
    "data-slot": "hover-card-positioner",
  },
})
export class HoverCardPositionerDirective {}

/**
 * Angular port of the styled half of `HoverCardContent` — the visible box.
 * Visual treatment is the `cn-hover-card-content` token (surface, ring,
 * shadow, width and the enter/exit + per-side animations driven by the
 * `data-open` / `data-closed` / `data-side` attributes radix stamps). The
 * `z-50` / transform-origin / outline-none positioning classes come straight
 * from the React source.
 */
@Component({
  selector: "div[uiHoverCardContent]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxPreviewCardPopup }],
  host: {
    "data-slot": "hover-card-content",
    "[class]": "classes()",
  },
})
export class HoverCardContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-hover-card-content cn-hover-card-content-logical z-50 origin-(--radix-hover-card-content-transform-origin) outline-hidden",
      this.className()
    )
  )
}

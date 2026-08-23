import { ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxTooltip,
  RdxTooltipArrow,
  RdxTooltipPortal,
  RdxTooltipPopup,
  RdxTooltipPositioner,
  RdxTooltipProvider,
  RdxTooltipTrigger,
} from "@radix-ng/primitives/tooltip"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/tooltip (radix-force-ui style), built on
 * @radix-ng/primitives/tooltip v1.x — the same declarative composition as the
 * React registry (root → trigger → portal → positioner → popup), not p4one's
 * v0.50 CDK-overlay directive API.
 *
 * Part mapping (React → Angular):
 *
 *   <TooltipProvider>   → <div uiTooltipProvider>            (optional; delays)
 *   <Tooltip>           → <div uiTooltip>
 *   <TooltipTrigger>    → <button uiTooltipTrigger> (attribute-only selector, so it can also ride a wrapper <span>)
 *   <TooltipContent>    → <ng-template uiTooltipPortal>
 *                            └ <div uiTooltipPositioner side="top">
 *                                ├ <div uiTooltipContent>…<span uiTooltipArrow/></div>
 *
 * radix-ng v1.x owns the a11y wiring: the popup binds role="tooltip",
 * aria-describedby (from the trigger) and drives data-open / data-closed /
 * data-side attributes that the cn-tooltip-* animation tokens key off — the
 * rich-popover mis-wiring p4one documented for v0.50 is gone in v1.x.
 */

/**
 * Angular port of `TooltipProvider`. Optional app-section wrapper that shares
 * open/close delays across tooltips. React's `delayDuration` maps to radix-ng's
 * `delay`; React default is 0, radix-ng default is 500.
 */
@Directive({
  selector: "[uiTooltipProvider]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipProvider,
      inputs: ["delay", "closeDelay", "timeout"],
    },
  ],
  host: {
    "data-slot": "tooltip-provider",
  },
})
export class TooltipProviderDirective {}

/**
 * Angular port of `Tooltip` (the root). Groups all parts and owns open state.
 */
@Directive({
  selector: "[uiTooltip]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltip,
      inputs: ["open: uiOpen", "defaultOpen", "delay", "closeDelay", "disabled"],
      outputs: ["onOpenChange: uiOpenChange"],
    },
  ],
  host: {
    "data-slot": "tooltip",
  },
})
export class TooltipRootDirective {}

/**
 * Angular port of `TooltipTrigger`. Attribute-only selector so it can ride any
 * element — usually a `[uiButton]`, or a wrapper `<span>` around a disabled
 * button (a disabled button emits no pointer events, matching the React
 * disabled example's span-render pattern).
 *
 * RdxTooltipTrigger opens on pointerenter/focus and closes on pointerleave/blur
 * and stamps type="button" + aria-describedby itself.
 */
@Directive({
  selector: "[uiTooltipTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipTrigger,
      inputs: ["disabled", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "tooltip-trigger",
  },
})
export class TooltipTriggerDirective {}

/**
 * Angular port of `TooltipPortal`. Structural directive — teleports the
 * tooltip to document.body while open.
 */
@Directive({
  selector: "ng-template[uiTooltipPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxTooltipPortal, inputs: ["container"] }],
  host: {
    "data-slot": "tooltip-portal",
  },
})
export class TooltipPortalDirective {}

/**
 * Angular port of the positioning half of React's `TooltipContent` (the Portal +
 * Content pair folded into one element there). Re-exposes the popper positioning
 * inputs; collision flipping is automatic. Default side is `top` (radix-ng
 * config), matching Radix.
 */
@Directive({
  selector: "[uiTooltipPositioner]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxTooltipPositioner,
      inputs: ["side", "sideOffset", "align", "alignOffset", "dir"],
    },
  ],
  host: {
    "data-slot": "tooltip-positioner",
    class: "z-50",
  },
})
export class TooltipPositionerDirective {}

/**
 * Angular port of the styled half of React's `TooltipContent` — the visible box.
 * Co-applies with radix-ng's `RdxTooltipPopup` (which stamps role="tooltip",
 * the content id for aria-describedby and the data-open / data-side animation
 * hooks); one attribute wires both.
 *
 * Class string mirrors the React source verbatim (`cn-tooltip-content` token +
 * z-50 / w-fit / max-w-xs / origin / explicit inverse colours), plus the
 * registry-wide `[&_svg]:fill-current` divergence for fill-based Material
 * Symbols icons. The `motion-reduce:animate-none` WCAG guard lives inside the
 * token.
 */
@Directive({
  selector: "[uiTooltipContent]",
  standalone: true,
  hostDirectives: [{ directive: RdxTooltipPopup }],
  host: {
    "data-slot": "tooltip-content",
    "[class]": "classes()",
  },
})
export class TooltipContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-tooltip-content z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) bg-foreground text-background [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * Angular port of `TooltipArrow` — optional pointer toward the trigger; place
 * inside `[uiTooltipContent]`.
 *
 * Parity deviation (same as p4one documented): the registry draws the arrow as a
 * rotated rounded square (`cn-tooltip-arrow`), but radix-ng renders a real SVG
 * triangle sized via its `width`/`height` inputs, so only the colour classes
 * transfer. `aria-hidden` — purely decorative (WCAG 1.1.1).
 */
@Component({
  selector: "span[uiTooltipArrow]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  templateUrl: "./tooltip.component.html",
  hostDirectives: [
    {
      directive: RdxTooltipArrow,
      inputs: ["width", "height"],
    },
  ],
  host: {
    "aria-hidden": "true",
    "data-slot": "tooltip-arrow",
    "[class]": "classes()",
  },
})
export class TooltipArrowComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("z-50 fill-foreground", this.className()))
}

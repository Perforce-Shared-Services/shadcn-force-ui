// Angular port of @force-ui/tooltip (radix-force-ui style), built on
// @radix-ng/primitives/tooltip (CDK overlay). Exported names mirror the registry
// source; selectors keep the native `[rdxTooltip*]` names so the radix root's
// content queries + DI resolve.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `TooltipProvider`
// (app-wide delay context) — open/close delays are per-root inputs (`openDelay` /
// `closeDelay`) instead.
//
// Structure differs from React: radix-ng splits the single React `TooltipContent`
// into a positioning `<ng-template rdxTooltipContent>` (TooltipContent) and the
// styled box `[rdxTooltipContentAttributes]` (TooltipContentBox) nested inside it.
import { RdxTooltipContentAttributesComponent } from '@radix-ng/primitives/tooltip';
import { TooltipContentAttributesDirective } from './tooltip-content.component';

export { TooltipRootDirective as Tooltip } from './tooltip-root.directive';
export { TooltipTriggerDirective as TooltipTrigger } from './tooltip-trigger.directive';
export {
  TooltipContentDirective as TooltipContent,
  TooltipArrowDirective as TooltipArrow,
  TOOLTIP_CONTENT_CLASS,
} from './tooltip-content.component';

// The styled box is a PAIR that co-applies on ONE `[rdxTooltipContentAttributes]`
// element: our directive (owns `[class]` + `data-slot`) AND radix-ng's
// `RdxTooltipContentAttributesComponent` (owns `role`, `data-state` / `data-side`
// and the animation lifecycle). The radix component is REQUIRED: it stamps
// `data-state`, and WITHOUT it the `data-open` / `data-[side]` animation classes
// never match, so the entrance fade/zoom + slide are dead. A component can't be a
// `hostDirective`, so both ship together here — one import wires both. (This was
// the family-wide bug: exporting only the styling directive left `data-state`
// unset and the tooltip's animations inert.)
export const TooltipContentBox = [
  TooltipContentAttributesDirective,
  RdxTooltipContentAttributesComponent,
] as const;

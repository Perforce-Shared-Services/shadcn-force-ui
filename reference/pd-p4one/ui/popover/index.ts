// Angular port of @force-ui/popover (radix-force-ui style), built on
// @radix-ng/primitives/popover (CDK overlay). Exported names mirror the registry
// source; selectors keep the native `[rdxPopover*]` names so the radix root's
// content queries + DI resolve.
//
// Structure differs from React: radix-ng splits the single React `PopoverContent`
// into a positioning `<ng-template rdxPopoverContent>` (PopoverContent) and the
// styled box `[rdxPopoverContentAttributes]` (PopoverContentBox) nested inside it.
//
// radix-ng additions over the React registry (documented): PopoverClose
// (`[rdxPopoverClose]`) and PopoverArrow (`[rdxPopoverArrow]`) — standard popover
// anatomy radix-ng ships but the React registry omits.
//
// PopoverAnchor is the NATIVE `RdxPopoverAnchorDirective` re-exported as-is (not
// wrapped): Angular does not expose a host-directive's `exportAs` to the
// template, so `#anchor="rdxPopoverAnchor"` (needed to feed the root's `anchor`
// input) only resolves against the real radix directive. Parity gap: it carries
// no `data-slot="popover-anchor"` stamp — acceptable for this niche part.
import { RdxPopoverContentAttributesComponent } from '@radix-ng/primitives/popover';
import { PopoverContentAttributesDirective } from './popover-content.component';

export { PopoverRootDirective as Popover } from './popover-root.directive';
export { PopoverTriggerDirective as PopoverTrigger } from './popover-trigger.directive';
export { RdxPopoverAnchorDirective as PopoverAnchor } from '@radix-ng/primitives/popover';
export {
  PopoverContentDirective as PopoverContent,
  PopoverHeaderDirective as PopoverHeader,
  PopoverTitleDirective as PopoverTitle,
  PopoverDescriptionDirective as PopoverDescription,
  PopoverCloseDirective as PopoverClose,
  PopoverArrowDirective as PopoverArrow,
  POPOVER_CONTENT_CLASS,
} from './popover-content.component';

// The styled box is a PAIR that co-applies on ONE `[rdxPopoverContentAttributes]`
// element: our directive (owns `[class]` + `data-slot` + the aria-labelledby /
// aria-describedby wiring to PopoverTitle/Description) AND radix-ng's
// `RdxPopoverContentAttributesComponent` (owns `role="dialog"`, `id`,
// `data-state` / `data-side` and the animation lifecycle). The radix component is
// REQUIRED: it stamps `data-state`, and WITHOUT it the `data-open` / `data-[side]`
// animation classes never match, so the entrance fade/zoom + slide are dead. A
// component can't be a `hostDirective`, so both ship together here — one import
// wires both. (This was the family-wide bug: exporting only the styling directive
// left `data-state` unset and the popover's animations inert.)
export const PopoverContentBox = [
  PopoverContentAttributesDirective,
  RdxPopoverContentAttributesComponent,
] as const;

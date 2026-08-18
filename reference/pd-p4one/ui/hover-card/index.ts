// Angular port of @force-ui/hover-card (radix-force-ui style), built on
// @radix-ng/primitives/hover-card (CDK overlay). Exported names mirror the
// registry source; selectors keep the native `[rdxHoverCard*]` names so the
// radix root's content queries + DI resolve.
//
// The styled sibling of popover (same panel surface/elevation) and the
// interaction sibling of tooltip (both hover-driven). Unlike the popover it
// opens on HOVER (openDelay/closeDelay), holds freeform preview content, and
// does NOT move focus into the card — so there is no Title/Description/Close
// anatomy (the registry ships none) and no focus-return wiring.
//
// Structure differs from React: radix-ng splits the single React
// `HoverCardContent` into a positioning `<ng-template rdxHoverCardContent>`
// (HoverCardContent) and the styled box `[rdxHoverCardContentAttributes]`
// (HoverCardContentBox) nested inside it.
//
// Parity with the React registry (Root/Trigger/Content only): NO arrow. radix-ng
// ships `RdxHoverCardArrowDirective` and `RdxHoverCardCloseDirective`, but both
// are omitted — the shadcn React hover-card (and the Figma component) have no
// arrow, and a hover card closes on pointer-leave so an explicit dismiss control
// is nonsensical. (The popover port DID add an arrow; the hover card matches
// shadcn and stays arrowless.)
//
// HoverCardAnchor is the NATIVE `RdxHoverCardAnchorDirective` re-exported as-is
// (not wrapped): Angular does not expose a host-directive's `exportAs` to the
// template, so `#anchor="rdxHoverCardAnchor"` (needed to feed the root's
// `anchor` input) only resolves against the real radix directive. Parity gap: it
// carries no `data-slot="hover-card-anchor"` stamp — acceptable for this niche
// part (same treatment as PopoverAnchor).
import { RdxHoverCardContentAttributesComponent } from '@radix-ng/primitives/hover-card';
import { HoverCardContentAttributesDirective } from './hover-card-content.component';

export { HoverCardRootDirective as HoverCard } from './hover-card-root.directive';
export { HoverCardTriggerDirective as HoverCardTrigger } from './hover-card-trigger.directive';
export { RdxHoverCardAnchorDirective as HoverCardAnchor } from '@radix-ng/primitives/hover-card';
export {
  HoverCardContentDirective as HoverCardContent,
  HOVER_CARD_CONTENT_CLASS,
} from './hover-card-content.component';

// The styled box is a PAIR that co-applies on ONE `[rdxHoverCardContentAttributes]`
// element: our directive (owns `[class]` + `data-slot` + optional `aria-label`)
// AND radix-ng's `RdxHoverCardContentAttributesComponent` (owns `role="dialog"`,
// `id`, `data-state` / `data-side` / `data-align`, the animation lifecycle
// listeners, and the box's own pointerenter/leave that keep the card open while
// the pointer is over it — WCAG 1.4.13 "hoverable").
//
// The radix component is REQUIRED, not optional. It is what stamps `data-state`
// / `data-side`, and WITHOUT it the `data-open` / `data-closed` / `data-[side]`
// animation classes never match, so the enter/exit fade + slide are dead and
// `cssClosingAnimation` has no `animationend` to wait on. A component can't be a
// `hostDirective`, so it can't be folded into our directive — instead both ship
// together here so ONE import wires both. Consumers add `HoverCardContentBox` to
// their `imports` (Angular flattens the array) and write a single
// `[rdxHoverCardContentAttributes]` in the template; both apply (verified —
// role=dialog + data-state + our data-slot/class all land on the one element).
//
// NOTE: the sibling overlay ports (popover / tooltip / dropdown-menu / select)
// export only their styling directive and NOT this radix component, so their
// data-state-driven animations are currently inert — the same fix (export the
// radix `*ContentAttributesComponent` as part of the box) applies to them.
export const HoverCardContentBox = [
  HoverCardContentAttributesDirective,
  RdxHoverCardContentAttributesComponent,
] as const;

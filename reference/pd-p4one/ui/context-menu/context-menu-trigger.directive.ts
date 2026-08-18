import { Directive } from '@angular/core';
import { RdxContextMenuTriggerDirective } from '@radix-ng/primitives/context-menu';

/**
 * Angular port of @force-ui/context-menu's `ContextMenuTrigger`.
 *
 * Unlike the React API — `<ContextMenu>` (root) wrapping `<ContextMenuTrigger>`
 * + `<ContextMenuContent>` as siblings — radix-ng has NO root/portal component.
 * Its `RdxContextMenuTriggerDirective` (built on CDK `CdkContextMenuTrigger`) is
 * self-contained: it listens for the native `(contextmenu)` (right-click /
 * long-press) event on its host, owns the CDK overlay, takes the menu body as a
 * `TemplateRef` via its own `[rdxContextMenuTrigger]` input, and portals it at
 * the pointer position on open. So the React `ContextMenu` (root) and
 * `ContextMenuPortal` parts have no Angular equivalent — they are intentionally
 * omitted (the CDK overlay replaces them).
 *
 * Applied to the element the user right-clicks (a row, a thumbnail, a canvas).
 * radix-ng's host bindings give it `data-state=open|closed` and
 * `data-disabled`. The registry trigger adds `select-none` (text isn't selected
 * by the click that opens the menu) — kept verbatim, stamped alongside the
 * registry `data-slot`. Re-exposes the radix inputs/outputs: `disabled`
 * suppresses the menu, `(onOpenChange)` fires on open. CDK does the collision
 * flipping; a context menu always opens at the cursor, so there is no
 * `side`/`align` (unlike the dropdown trigger).
 *
 * `alignOffset` is re-exposed for radix parity but is effectively a no-op here:
 * CDK positions the overlay at the pointer-event coordinates, not relative to a
 * trigger edge, so nudging by an align offset has no meaningful anchor. Left in
 * the surface for forward-compat; don't reach for it to position the panel.
 * Re-exported as `ContextMenuTrigger`; selector stays the native
 * `[rdxContextMenuTrigger]` so radix's CdkContextMenuTrigger wiring resolves.
 *
 * Usage:
 *   <div [rdxContextMenuTrigger]="menu" class="select-none">Right-click me</div>
 *   <ng-template #menu>
 *     <div rdxContextMenuContent>
 *       <button rdxContextMenuItem (onSelect)="edit()">Edit</button>
 *     </div>
 *   </ng-template>
 */
@Directive({
  selector: '[rdxContextMenuTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxContextMenuTriggerDirective,
      inputs: ['rdxContextMenuTrigger', 'disabled', 'alignOffset'],
      outputs: ['onOpenChange'],
    },
  ],
  host: {
    'data-slot': 'context-menu-trigger',
    class: 'select-none',
  },
})
export class ContextMenuTriggerDirective {}

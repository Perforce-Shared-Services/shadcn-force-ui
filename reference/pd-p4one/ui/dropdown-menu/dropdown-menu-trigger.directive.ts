import { Directive } from '@angular/core';
import { RdxDropdownMenuTriggerDirective } from '@radix-ng/primitives/dropdown-menu';

/**
 * Angular port of @force-ui/dropdown-menu's `DropdownMenuTrigger`.
 *
 * Unlike the React API — `<DropdownMenu>` (root) wrapping `<DropdownMenuTrigger>`
 * + `<DropdownMenuContent>` as siblings — radix-ng has NO root/portal component.
 * Its `RdxDropdownMenuTriggerDirective` (built on CDK Menu) is self-contained: it
 * owns the CDK overlay, takes the menu body as a `TemplateRef` via its own
 * `[rdxDropdownMenuTrigger]` input, and portals it on open. So the React
 * `DropdownMenu` (root) and `DropdownMenuPortal` parts have no Angular
 * equivalent — they are intentionally omitted (the CDK overlay replaces them).
 *
 * Applied to the trigger button; co-exists with `[uiButton]`. radix-ng's host
 * bindings give it `type="button"`, `aria-haspopup="menu"`, `aria-expanded`,
 * and `data-state=open|closed`. This wrapper only stamps the registry's
 * `data-slot="dropdown-menu-trigger"` and re-exposes the radix inputs/outputs
 * (`side` / `align` / `sideOffset` / `alignOffset` position the panel; CDK does
 * collision flipping). Re-exported as `DropdownMenuTrigger`; selector stays the
 * native `[rdxDropdownMenuTrigger]` so radix's CdkMenuTrigger wiring resolves.
 *
 * Usage:
 *   <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">Open</button>
 *   <ng-template #menu>
 *     <div rdxDropdownMenuContent>
 *       <button rdxDropdownMenuItem (onSelect)="edit()">Edit</button>
 *     </div>
 *   </ng-template>
 */
@Directive({
  selector: '[rdxDropdownMenuTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDropdownMenuTriggerDirective,
      inputs: [
        'rdxDropdownMenuTrigger',
        'disabled',
        'side',
        'align',
        'sideOffset',
        'alignOffset',
      ],
      outputs: ['onOpenChange'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-trigger',
  },
})
export class DropdownMenuTriggerDirective {}

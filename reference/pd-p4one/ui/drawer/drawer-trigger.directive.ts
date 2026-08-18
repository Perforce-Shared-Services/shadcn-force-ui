import { Directive } from '@angular/core';
import { RdxDialogTriggerDirective } from '@radix-ng/primitives/dialog';

/**
 * Angular port of @force-ui/drawer's `DrawerTrigger`.
 *
 * Upstream `drawer` wraps `vaul` (a React-only gesture library — swipe-to-dismiss,
 * snap points — with no Angular/radix-ng equivalent). This app has no touch-drag
 * requirement (desktop Electron), so the drawer is built on the SAME CDK-Dialog
 * machinery as `sheet` instead of adding a new npm dependency: a drawer is a sheet
 * with rounded corners, a directional grab-handle bar, and its own edge-panel
 * defaulting to `bottom` (vaul's own default) rather than `right`. See
 * `drawer-content.component.ts` for the full parity-gap writeup.
 *
 * Usage:
 *   <button uiButton [rdxDrawerTrigger]="drawer" [rdxDrawerConfig]="{ ariaLabel: 'Version details' }">
 *     Details
 *   </button>
 *   <ng-template #drawer>
 *     <div rdxDrawerContent direction="right">
 *       <div rdxDrawerHeader>
 *         <h2 rdxDrawerTitle>Version details</h2>
 *         <p rdxDrawerDescription>Everything about this version.</p>
 *       </div>
 *       <div rdxDrawerFooter>
 *         <button uiButton variant="outline" rdxDialogClose>Close</button>
 *       </div>
 *     </div>
 *   </ng-template>
 *
 * For programmatic drawers (no trigger button) inject `DrawerService`
 * (`RdxDialogService`) and call `.open({ content, ... })` — re-exported from the
 * barrel.
 */
@Directive({
  selector: '[rdxDrawerTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogTriggerDirective,
      inputs: ['rdxDialogTrigger: rdxDrawerTrigger', 'rdxDialogConfig: rdxDrawerConfig', 'id'],
    },
  ],
  host: {
    'data-slot': 'drawer-trigger',
  },
})
export class DrawerTriggerDirective {}

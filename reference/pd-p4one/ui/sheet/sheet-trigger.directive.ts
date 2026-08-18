import { Directive } from '@angular/core';
import { RdxDialogTriggerDirective } from '@radix-ng/primitives/dialog';

/**
 * Angular port of @force-ui/sheet's `SheetTrigger`.
 *
 * The Force UI sheet is the radix Dialog primitive positioned to a screen edge
 * (a drawer). radix-ng exposes that primitive through the SAME service/CDK-Dialog
 * machinery as the dialog — there is no declarative `<Sheet>` root, `SheetPortal`,
 * or `SheetOverlay`. `RdxDialogTriggerDirective` opens the sheet imperatively on
 * click: it takes the sheet body as a `TemplateRef` via `[rdxDialogTrigger]` and
 * an optional `[rdxDialogConfig]`, then portals the template through CDK Dialog
 * (backdrop, focus trap, Escape, focus return — all CDK). So the React `Sheet`
 * (root), `SheetPortal`, and `SheetOverlay` parts have no Angular equivalent: the
 * trigger owns the overlay and the backdrop is the CDK scrim.
 *
 * radix-ng's host bindings give the trigger `type="button"`,
 * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, and
 * `data-state=open|closed`. This wrapper only stamps `data-slot="sheet-trigger"`
 * and re-exposes the shared radix dialog inputs under sheet-flavored public
 * aliases (`rdxSheetTrigger` / `rdxSheetConfig`) so the sheet API is distinct
 * from the dialog's while the radix CDK wiring underneath is identical. Applied
 * to any `[uiButton]`. Re-exported as `SheetTrigger`.
 *
 * The edge the sheet slides from is a property of the CONTENT, not the trigger —
 * set `side` on `[rdxSheetContent]` (default `right`).
 *
 * For programmatic sheets (no trigger button) inject `SheetService`
 * (`RdxDialogService`) and call `.open({ content, ... })` — re-exported from the
 * barrel.
 *
 * Usage:
 *   <button uiButton [rdxSheetTrigger]="sheet" [rdxSheetConfig]="{ ariaLabel: 'Version details' }">
 *     Details
 *   </button>
 *   <ng-template #sheet>
 *     <div rdxSheetContent side="right">
 *       <div rdxSheetHeader>
 *         <h2 rdxSheetTitle>Version details</h2>
 *         <p rdxSheetDescription>Everything about this version.</p>
 *       </div>
 *       <div rdxSheetFooter>
 *         <button uiButton variant="outline" rdxDialogClose>Close</button>
 *       </div>
 *     </div>
 *   </ng-template>
 */
@Directive({
  selector: '[rdxSheetTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogTriggerDirective,
      inputs: ['rdxDialogTrigger: rdxSheetTrigger', 'rdxDialogConfig: rdxSheetConfig', 'id'],
    },
  ],
  host: {
    'data-slot': 'sheet-trigger',
  },
})
export class SheetTriggerDirective {}

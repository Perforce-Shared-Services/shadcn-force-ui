import { Directive } from '@angular/core';
import { RdxDialogTriggerDirective } from '@radix-ng/primitives/dialog';

/**
 * Angular port of @force-ui/dialog's `DialogTrigger`.
 *
 * radix-ng's dialog is service/CDK-Dialog based — there is no declarative
 * `<Dialog>` root or `<DialogPortal>` like the React shadcn composition. Instead
 * `RdxDialogTriggerDirective` opens the dialog imperatively on click: it takes
 * the dialog body as a `TemplateRef` via its own `[rdxDialogTrigger]` input and
 * an optional `[rdxDialogConfig]`, then portals the template through CDK Dialog
 * (backdrop, focus trap, Escape, focus return — all CDK). So the React `Dialog`
 * (root), `DialogPortal`, and `DialogOverlay` parts have no Angular equivalent:
 * the trigger owns the overlay, and the backdrop is the CDK scrim.
 *
 * radix-ng's host bindings give the trigger `type="button"`,
 * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, and
 * `data-state=open|closed`. This wrapper only stamps `data-slot="dialog-trigger"`
 * and re-exposes the radix inputs. Applied to any `[uiButton]`. Re-exported as
 * `DialogTrigger`; selector stays the native `[rdxDialogTrigger]`.
 *
 * For programmatic dialogs (no trigger button) inject `RdxDialogService` and
 * call `.open({ content, ... })` — also re-exported from the barrel.
 *
 * Usage:
 *   <button uiButton [rdxDialogTrigger]="dlg" [rdxDialogConfig]="{ ariaLabel: 'Delete version' }">
 *     Delete
 *   </button>
 *   <ng-template #dlg>
 *     <div rdxDialogContent>
 *       <div rdxDialogHeader>
 *         <h2 rdxDialogTitle>Delete this version?</h2>
 *         <p rdxDialogDescription>This can't be undone.</p>
 *       </div>
 *       <div rdxDialogFooter>
 *         <button uiButton variant="outline" rdxDialogClose>Cancel</button>
 *         <button uiButton variant="destructive" rdxDialogClose>Delete</button>
 *       </div>
 *     </div>
 *   </ng-template>
 */
@Directive({
  selector: '[rdxDialogTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogTriggerDirective,
      inputs: ['rdxDialogTrigger', 'rdxDialogConfig', 'id'],
    },
  ],
  host: {
    'data-slot': 'dialog-trigger',
  },
})
export class DialogTriggerDirective {}

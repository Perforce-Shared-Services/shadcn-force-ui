// Angular port of @force-ui/dialog (radix-force-ui style), built on
// @radix-ng/primitives/dialog (CDK Dialog — service/trigger based, not the React
// declarative composition). Exported names mirror the registry; selectors keep
// the native `[rdxDialog*]` names so the radix CDK wiring resolves.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `Dialog` (root)
// and `DialogPortal` — the trigger opens via CDK Dialog, no root/portal element;
// `DialogOverlay` — the backdrop is the CDK scrim (styled via dialog config's
// backdropClass, not an element).
//
// App/bootstrap setup: add `provideRdxDialogConfig()` to the application
// providers (it wires CDK's DialogModule). The trigger directive self-provides
// `RdxDialogService`.
export { DialogTriggerDirective as DialogTrigger } from './dialog-trigger.directive';
export {
  DialogContentComponent as DialogContent,
  DialogHeaderDirective as DialogHeader,
  DialogFooterDirective as DialogFooter,
  DialogTitleDirective as DialogTitle,
  DialogDescriptionDirective as DialogDescription,
  DIALOG_CONTENT_CLASS,
} from './dialog-content.component';

// Behavior-only parts + the imperative API, re-exported from radix-ng:
//  - DialogClose   — closes the dialog (put on a `[uiButton]` in the footer)
//  - DialogDismiss — dismisses without a result (`button[rdxDialogDismiss]`)
//  - RdxDialogService / provideRdxDialog* — open dialogs programmatically
export {
  RdxDialogCloseDirective as DialogClose,
  RdxDialogDismissDirective as DialogDismiss,
  RdxDialogService,
  provideRdxDialog,
  provideRdxDialogConfig,
} from '@radix-ng/primitives/dialog';
export type { RdxDialogConfig } from '@radix-ng/primitives/dialog';

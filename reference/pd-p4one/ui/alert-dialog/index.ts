// Angular port of @force-ui/alert-dialog (radix-force-ui style). An alert dialog
// is a dialog that demands a deliberate choice: NO close (X) button, NOT
// dismissable via backdrop or Escape — the user must pick a footer action.
//
// Built on @radix-ng/primitives/dialog (CDK Dialog — the same proven stack the
// `dialog` component uses), NOT the barebones @radix-ng/primitives/alert-dialog
// primitive (which lacks data-state animation, a description part, and config).
// The trigger forces `isAlert: true` + `canCloseWithBackdrop: false` into the
// dialog config: `isAlert` gives the container `role="alertdialog"` and removes
// the backdrop/Escape dismissal a plain dialog wires up. Exported names mirror
// the registry; selectors keep the native `[rdxAlertDialog*]` names.
//
// Parity gaps (no element needed — CDK owns them): `AlertDialog` (root),
// `AlertDialogPortal`, `AlertDialogOverlay` — the trigger opens via CDK Dialog,
// the backdrop is the CDK scrim.
//
// App/bootstrap setup: add `provideRdxDialogConfig()` to the application
// providers (it wires CDK's DialogModule — already present for `dialog`). The
// trigger self-provides `RdxDialogService`.
export { AlertDialogTriggerDirective as AlertDialogTrigger } from './alert-dialog-trigger.directive';
export {
  AlertDialogContentComponent as AlertDialogContent,
  AlertDialogHeaderDirective as AlertDialogHeader,
  AlertDialogFooterDirective as AlertDialogFooter,
  AlertDialogMediaDirective as AlertDialogMedia,
  AlertDialogTitleDirective as AlertDialogTitle,
  AlertDialogDescriptionDirective as AlertDialogDescription,
  AlertDialogActionDirective as AlertDialogAction,
  AlertDialogCancelDirective as AlertDialogCancel,
  ALERT_DIALOG_CONTENT_CLASS,
  type AlertDialogSize,
} from './alert-dialog-content.component';

// CDK Dialog wiring (already provided app-wide for `dialog`):
export { provideRdxDialogConfig, RdxDialogService } from '@radix-ng/primitives/dialog';

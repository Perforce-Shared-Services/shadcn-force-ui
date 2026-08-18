// Angular port of @force-ui/sheet (radix-force-ui style) — the radix Dialog
// primitive pinned to a screen edge (a drawer), built on
// @radix-ng/primitives/dialog (CDK Dialog — service/trigger based, not the React
// declarative composition). Exported names mirror the registry.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `Sheet` (root)
// and `SheetPortal` — the trigger opens via CDK Dialog, no root/portal element;
// `SheetOverlay` — the backdrop is the CDK scrim (styled via the dialog config's
// backdropClass, not an element).
//
// App/bootstrap setup: add `provideRdxDialogConfig()` to the application
// providers (it wires CDK's DialogModule — shared with dialog). The trigger
// directive self-provides `RdxDialogService`.
export { SheetTriggerDirective as SheetTrigger } from './sheet-trigger.directive';
export {
  SheetContentComponent as SheetContent,
  SheetHeaderDirective as SheetHeader,
  SheetFooterDirective as SheetFooter,
  SheetTitleDirective as SheetTitle,
  SheetDescriptionDirective as SheetDescription,
  SHEET_CONTENT_CLASS,
  type SheetSide,
} from './sheet-content.component';

// Behavior-only parts + the imperative API, re-exported from radix-ng (shared
// with dialog — a sheet IS a radix dialog):
//  - SheetClose    — closes the sheet (put on a `[uiButton]`; selector stays
//                    the native `[rdxDialogClose]`)
//  - SheetDismiss  — dismisses without a result (`button[rdxDialogDismiss]`)
//  - SheetService  — open sheets programmatically (RdxDialogService)
export {
  RdxDialogCloseDirective as SheetClose,
  RdxDialogDismissDirective as SheetDismiss,
  RdxDialogService as SheetService,
  provideRdxDialog,
  provideRdxDialogConfig,
} from '@radix-ng/primitives/dialog';
export type { RdxDialogConfig as SheetConfig } from '@radix-ng/primitives/dialog';

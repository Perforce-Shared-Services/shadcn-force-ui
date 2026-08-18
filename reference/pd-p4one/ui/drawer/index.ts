// Angular port of @force-ui/drawer (radix-force-ui style). Upstream wraps
// `vaul` (React-only swipe/snap-point gesture library, no radix-ng or Angular
// CDK equivalent). This app has no touch-drag requirement (desktop Electron),
// so the drawer reuses the SAME @radix-ng/primitives/dialog (CDK Dialog)
// machinery already backing `sheet` — a drawer is a sheet with rounded
// corners, a directional grab-handle bar, and a `bottom` default direction —
// rather than adding vaul as a new dependency. Exported names mirror the
// registry (`Drawer*` → `direction`, not `Sheet*` → `side`).
//
// Parity gaps (no radix-ng/vaul equivalent — intentionally omitted): `Drawer`
// (root) and `DrawerPortal` — the trigger opens via CDK Dialog, no
// root/portal element; `DrawerOverlay` — the backdrop is the CDK scrim (same
// call as sheet); vaul's swipe-to-dismiss + snap-point gestures — Escape /
// backdrop-click / an explicit footer action are the dismiss affordances.
//
// App/bootstrap setup: shares `provideRdxDialogConfig()` with dialog/sheet —
// no additional provider needed.
export { DrawerTriggerDirective as DrawerTrigger } from './drawer-trigger.directive';
export {
  DrawerContentComponent as DrawerContent,
  DrawerHeaderDirective as DrawerHeader,
  DrawerFooterDirective as DrawerFooter,
  DrawerTitleDirective as DrawerTitle,
  DrawerDescriptionDirective as DrawerDescription,
  DRAWER_CONTENT_CLASS,
  type DrawerDirection,
} from './drawer-content.component';

// Behavior-only parts + the imperative API, re-exported from radix-ng (shared
// with dialog/sheet — a drawer IS a radix dialog):
//  - DrawerClose    — closes the drawer (put on a `[uiButton]`; selector stays
//                     the native `[rdxDialogClose]`)
//  - DrawerDismiss  — dismisses without a result (`button[rdxDialogDismiss]`)
//  - DrawerService  — open drawers programmatically (RdxDialogService)
export {
  RdxDialogCloseDirective as DrawerClose,
  RdxDialogDismissDirective as DrawerDismiss,
  RdxDialogService as DrawerService,
  provideRdxDialog,
  provideRdxDialogConfig,
} from '@radix-ng/primitives/dialog';
export type { RdxDialogConfig as DrawerConfig } from '@radix-ng/primitives/dialog';

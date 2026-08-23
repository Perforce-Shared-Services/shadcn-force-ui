// Angular port of @force-ui/sheet (radix-force-ui style) — the radix Dialog
// primitive pinned to a screen edge (a drawer), built on @radix-ng/primitives
// v1.x's declarative dialog API (root / trigger / portal / popup — NOT p4one's
// CDK-based v0.50 service API). Exported names mirror the registry.
//
// Composition (the Angular equivalent of React's implicit SheetPortal +
// SheetOverlay):
//   <div uiSheet>
//     <button uiButton uiSheetTrigger>Open</button>
//     <ng-template uiSheetPortal>
//       <div uiSheetOverlay></div>
//       <div uiSheetContent side="right">…</div>
//     </ng-template>
//   </div>
export type { SheetSide } from "./sheet.component"
export {
  SheetDirective as Sheet,
  SheetTriggerDirective as SheetTrigger,
  SheetPortalDirective as SheetPortal,
  SheetOverlayDirective as SheetOverlay,
  SheetContentComponent as SheetContent,
  SheetHeaderDirective as SheetHeader,
  SheetFooterDirective as SheetFooter,
  SheetTitleDirective as SheetTitle,
  SheetDescriptionDirective as SheetDescription,
  SheetCloseDirective as SheetClose,
} from "./sheet.component"

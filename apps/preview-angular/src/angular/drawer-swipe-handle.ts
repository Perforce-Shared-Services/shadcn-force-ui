import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/angular-ui/drawer"

// apps/v4/examples/base/drawer-swipe-handle.tsx — a bottom drawer showing the
// grab-handle bar. In this port the handle renders automatically for
// direction="bottom" (no showSwipeHandle toggle — no drag gesture backs it).
@Component({
  selector: "preview-drawer-swipe-handle",
  standalone: true,
  imports: [
    DrawerRoot,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
    Button,
  ],
  template: `<div uiDrawerRoot>
  <button uiButton variant="secondary" uiDrawerTrigger>Open Drawer</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom">
      <div uiDrawerHeader>
        <h2 uiDrawerTitle>Drawer</h2>
        <p uiDrawerDescription>Drawer with a swipe handle.</p>
      </div>
      <div class="flex-1 p-4">
        <div class="h-80 w-full rounded-2xl bg-muted"></div>
      </div>
      <div uiDrawerFooter>
        <button uiButton uiDrawerClose>Close</button>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerSwipeHandleComponent {}

export default DrawerSwipeHandleComponent

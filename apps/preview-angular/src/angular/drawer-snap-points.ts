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

// apps/v4/examples/base/drawer-snap-points.tsx — React passes
// snapPoints={["31rem", 1]} + showSwipeHandle to vaul. The Angular drawer has
// no snap-point physics (vaul is React-only), so this renders the same content
// at a fixed near-full height; the snap interaction is not reproduced.
@Component({
  selector: "preview-drawer-snap-points",
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
  <!-- React: <Drawer snapPoints={["31rem", 1]} showSwipeHandle> — no Angular equivalent yet. -->
  <button uiButton variant="outline" uiDrawerTrigger>Open Snap Drawer</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom" class="h-[80vh]">
      <div uiDrawerHeader class="text-left">
        <h2 uiDrawerTitle>Snap points</h2>
        <p uiDrawerDescription>
          Drag the drawer to snap between a compact peek and a near full-height view.
        </p>
      </div>
      <div class="flex-1 p-4">
        <div class="group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full rounded-2xl bg-muted"></div>
      </div>
      <div uiDrawerFooter>
        <button uiButton uiDrawerClose>Close</button>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerSnapPointsComponent {}

export default DrawerSnapPointsComponent

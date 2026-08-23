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

// apps/v4/examples/base/drawer-sides.tsx — the same panel opened from any
// edge; this instance uses direction="left" (React's swipeDirection="left").
@Component({
  selector: "preview-drawer-sides",
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
  <button uiButton variant="secondary" uiDrawerTrigger>Open Left Drawer</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="left">
      <div uiDrawerHeader>
        <h2 uiDrawerTitle>Move Goal</h2>
        <p uiDrawerDescription>Set your daily activity goal.</p>
      </div>
      <div class="flex-1 p-4">
        <div class="size-full rounded-2xl bg-muted"></div>
      </div>
      <div uiDrawerFooter>
        <button uiButton uiDrawerClose>Close</button>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerSidesComponent {}

export default DrawerSidesComponent

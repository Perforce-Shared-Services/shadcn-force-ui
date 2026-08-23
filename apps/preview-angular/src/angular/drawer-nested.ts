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

// apps/v4/examples/base/drawer-nested.tsx — drawers stacked three levels
// deep; parent drawers stay mounted behind the frontmost one. (The React
// example goes four levels and keys placeholder sizing off vaul's
// data-swipe-axis attribute, which this port does not set.)
@Component({
  selector: "preview-drawer-nested",
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
        <p uiDrawerDescription>Open another drawer from the same direction.</p>
      </div>
      <div class="flex-1 p-4">
        <div class="aspect-video w-full bg-muted"></div>
      </div>
      <div uiDrawerFooter>
        <div uiDrawerRoot>
          <button uiButton variant="outline" uiDrawerTrigger>Open Nested Drawer</button>
          <ng-template uiDrawerPortal>
            <div uiDrawerOverlay></div>
            <div uiDrawerContent direction="bottom">
              <div uiDrawerHeader>
                <h2 uiDrawerTitle>Nested Drawer</h2>
                <p uiDrawerDescription>The parent drawer stays mounted behind this one.</p>
              </div>
              <div class="flex-1 p-4">
                <div class="aspect-video w-full bg-muted"></div>
              </div>
              <div uiDrawerFooter>
                <div uiDrawerRoot>
                  <button uiButton variant="outline" uiDrawerTrigger>Open Third Drawer</button>
                  <ng-template uiDrawerPortal>
                    <div uiDrawerOverlay></div>
                    <div uiDrawerContent direction="bottom">
                      <div uiDrawerHeader>
                        <h2 uiDrawerTitle>Third Drawer</h2>
                        <p uiDrawerDescription>Two drawers are stacked behind this one.</p>
                      </div>
                      <div class="flex-1 p-4">
                        <div class="aspect-video w-full bg-muted"></div>
                      </div>
                      <div uiDrawerFooter>
                        <button uiButton uiDrawerClose>Close</button>
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerNestedComponent {}

export default DrawerNestedComponent

import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/angular-ui/drawer"

// apps/v4/examples/base/drawer-non-modal.tsx — modal={false} +
// disablePointerDismissal, so the page stays interactive while open.
@Component({
  selector: "preview-drawer-non-modal",
  standalone: true,
  imports: [
    DrawerRoot,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
    Button,
  ],
  template: `<div uiDrawerRoot [modal]="false" [disablePointerDismissal]="true">
  <button uiButton variant="outline" uiDrawerTrigger>Non Modal</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom">
      <div uiDrawerHeader>
        <h2 uiDrawerTitle>Non Modal Drawer</h2>
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
export class DrawerNonModalComponent {}

export default DrawerNonModalComponent

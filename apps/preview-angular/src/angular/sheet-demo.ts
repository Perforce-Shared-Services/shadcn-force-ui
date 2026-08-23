import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
  SheetPortal,
} from "@/angular-ui/sheet"

// apps/v4/examples/base/sheet-demo.tsx
@Component({
  selector: "preview-sheet-demo",
  standalone: true,
  imports: [
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
    Button,
    Input,
    Label,
  ],
  template: `
    <div uiSheet>
      <button uiButton variant="outline" uiSheetTrigger>Open</button>
      <ng-template uiSheetPortal>
        <div uiSheetOverlay></div>
        <div uiSheetContent>
          <div uiSheetHeader>
            <h2 uiSheetTitle>Edit profile</h2>
            <p uiSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div class="grid flex-1 auto-rows-min gap-6 px-4">
            <div class="grid gap-3">
              <label uiLabel for="sheet-demo-name">Name</label>
              <input uiInput id="sheet-demo-name" value="Pedro Duarte" />
            </div>
            <div class="grid gap-3">
              <label uiLabel for="sheet-demo-username">Username</label>
              <input uiInput id="sheet-demo-username" value="&#64;peduarte" />
            </div>
          </div>
          <div uiSheetFooter>
            <button uiButton type="submit">Save changes</button>
            <button uiButton variant="outline" uiSheetClose>Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SheetDemoComponent {}

export default SheetDemoComponent

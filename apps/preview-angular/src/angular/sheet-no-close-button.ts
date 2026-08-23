import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
  SheetPortal,
} from "@/angular-ui/sheet"

// apps/v4/examples/base/sheet-no-close-button.tsx
@Component({
  selector: "preview-sheet-no-close-button",
  standalone: true,
  imports: [Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Button],
  template: `
    <div uiSheet>
      <button uiButton variant="outline" uiSheetTrigger>Open Sheet</button>
      <ng-template uiSheetPortal>
        <div uiSheetOverlay></div>
        <div uiSheetContent [showCloseButton]="false">
          <div uiSheetHeader>
            <h2 uiSheetTitle>No Close Button</h2>
            <p uiSheetDescription>
              This sheet doesn't have a close button in the top-right corner.
              Click outside to close.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SheetNoCloseButtonComponent {}

export default SheetNoCloseButtonComponent

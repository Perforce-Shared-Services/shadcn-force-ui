import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/angular-ui/dialog"

@Component({
  selector: "preview-dialog-no-close-button",
  standalone: true,
  imports: [DialogOverlay, Button, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription],
  template: `
    <div uiDialogRoot>
      <button uiButton variant="outline" uiDialogTrigger type="button">
        No Close Button
      </button>
      <ng-template uiDialogPortal>
        <div uiDialogOverlay></div>
        <div uiDialogContent [showCloseButton]="false">
          <div uiDialogHeader>
            <h2 uiDialogTitle>No Close Button</h2>
            <p uiDialogDescription>
              This dialog doesn't have a close button in the top-right corner.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class DialogNoCloseButtonComponent {}

export default DialogNoCloseButtonComponent

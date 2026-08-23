import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/angular-ui/dialog"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"

@Component({
  selector: "preview-dialog-close-button",
  standalone: true,
  imports: [DialogOverlay, Button, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Label, Input],
  template: `
    <div uiDialogRoot>
      <button uiButton variant="outline" uiDialogTrigger type="button">
        Share
      </button>
      <ng-template uiDialogPortal>
        <div uiDialogOverlay></div>
        <div uiDialogContent class="sm:max-w-md">
          <div uiDialogHeader>
            <h2 uiDialogTitle>Share link</h2>
            <p uiDialogDescription>
              Anyone who has this link will be able to view this.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <div class="grid flex-1 gap-2">
              <label uiLabel for="link" class="sr-only">Link</label>
              <input
                uiInput
                id="link"
                value="https://ui.shadcn.com/docs/installation"
                readonly
              />
            </div>
          </div>
          <div uiDialogFooter class="sm:justify-start">
            <button uiButton type="button" uiDialogClose>Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class DialogCloseButtonComponent {}

export default DialogCloseButtonComponent

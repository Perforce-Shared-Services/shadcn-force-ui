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
import { Field, FieldGroup } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"

@Component({
  selector: "preview-dialog-demo",
  standalone: true,
  imports: [DialogOverlay, Button, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Field, FieldGroup, Label, Input],
  template: `
    <div uiDialogRoot>
      <form class="grid gap-4">
        <button uiButton variant="outline" uiDialogTrigger type="button">
          Open Dialog
        </button>
        <ng-template uiDialogPortal>
          <div uiDialogOverlay></div>
          <div uiDialogContent class="sm:max-w-sm">
            <div uiDialogHeader>
              <h2 uiDialogTitle>Edit profile</h2>
              <p uiDialogDescription>
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>
            <div uiFieldGroup>
              <div uiField>
                <label uiLabel for="name-1">Name</label>
                <input uiInput id="name-1" name="name" value="Pedro Duarte" />
              </div>
              <div uiField>
                <label uiLabel for="username-1">Username</label>
                <input uiInput id="username-1" name="username" value="@peduarte" />
              </div>
            </div>
            <div uiDialogFooter>
              <button uiButton variant="outline" uiDialogClose type="button">
                Cancel
              </button>
              <button uiButton type="submit">Save changes</button>
            </div>
          </div>
        </ng-template>
      </form>
    </div>
  `,
})
export class DialogDemoComponent {}

export default DialogDemoComponent

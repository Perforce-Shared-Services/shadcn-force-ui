import { Component } from "@angular/core"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/angular-ui/alert-dialog"
import { Button } from "@/angular-ui/button"

@Component({
  selector: "preview-alert-dialog-media",
  standalone: true,
  imports: [
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    Button,
  ],
  template: `<div uiAlertDialog>
    <button uiButton variant="outline" uiAlertDialogTrigger>Share Project</button>
    <ng-template uiAlertDialogPortal>
      <div uiAlertDialogOverlay></div>
      <div uiAlertDialogContent>
        <div uiAlertDialogHeader>
          <div uiAlertDialogMedia>
            <!-- Material Symbols "add_circle" -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.27 200q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.3-127.34 86T453-80h.27Z"/></svg>
          </div>
          <h2 uiAlertDialogTitle>Share this project?</h2>
          <p uiAlertDialogDescription>
            Anyone with the link will be able to view and edit this project.
          </p>
        </div>
        <div uiAlertDialogFooter>
          <button uiButton variant="outline" uiAlertDialogCancel>Cancel</button>
          <button uiButton uiAlertDialogAction>Share</button>
        </div>
      </div>
    </ng-template>
  </div>`,
})
export class AlertDialogMediaComponent {}

export default AlertDialogMediaComponent

import { Component } from "@angular/core"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/angular-ui/alert-dialog"
import { Button } from "@/angular-ui/button"

@Component({
  selector: "preview-alert-dialog-small",
  standalone: true,
  imports: [
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    Button,
  ],
  template: `<div uiAlertDialog>
    <button uiButton variant="outline" uiAlertDialogTrigger>Show Dialog</button>
    <ng-template uiAlertDialogPortal>
      <div uiAlertDialogOverlay></div>
      <div uiAlertDialogContent size="sm">
        <div uiAlertDialogHeader>
          <h2 uiAlertDialogTitle>Allow accessory to connect?</h2>
          <p uiAlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </p>
        </div>
        <div uiAlertDialogFooter>
          <button uiButton variant="outline" uiAlertDialogCancel>Don't allow</button>
          <button uiButton uiAlertDialogAction>Allow</button>
        </div>
      </div>
    </ng-template>
  </div>`,
})
export class AlertDialogSmallComponent {}

export default AlertDialogSmallComponent

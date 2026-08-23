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
  selector: "preview-alert-dialog-demo",
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
      <div uiAlertDialogContent>
        <div uiAlertDialogHeader>
          <h2 uiAlertDialogTitle>Are you absolutely sure?</h2>
          <p uiAlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </p>
        </div>
        <div uiAlertDialogFooter>
          <button uiButton variant="outline" uiAlertDialogCancel>Cancel</button>
          <button uiButton uiAlertDialogAction>Continue</button>
        </div>
      </div>
    </ng-template>
  </div>`,
})
export class AlertDialogDemoComponent {}

export default AlertDialogDemoComponent

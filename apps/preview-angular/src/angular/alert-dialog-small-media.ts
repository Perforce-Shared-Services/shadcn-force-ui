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
  selector: "preview-alert-dialog-small-media",
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
    <button uiButton variant="outline" uiAlertDialogTrigger>Show Dialog</button>
    <ng-template uiAlertDialogPortal>
      <div uiAlertDialogOverlay></div>
      <div uiAlertDialogContent size="sm">
        <div uiAlertDialogHeader>
          <div uiAlertDialogMedia>
            <!-- Material Symbols "bluetooth" -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M450-94v-314L256-214l-42-42 224-224-224-224 42-42 194 194v-314h30l214 214-172 172 172 172L480-94h-30Zm60-458 100-100-100-98v198Zm0 342 100-98-100-100v198Z"/></svg>
          </div>
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
export class AlertDialogSmallMediaComponent {}

export default AlertDialogSmallMediaComponent

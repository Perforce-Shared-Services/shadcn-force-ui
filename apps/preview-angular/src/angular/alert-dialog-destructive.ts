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
  selector: "preview-alert-dialog-destructive",
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
    <button uiButton variant="destructive" uiAlertDialogTrigger>Delete Chat</button>
    <ng-template uiAlertDialogPortal>
      <div uiAlertDialogOverlay></div>
      <div uiAlertDialogContent size="sm">
        <div uiAlertDialogHeader>
          <div
            uiAlertDialogMedia
            class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
          >
            <!-- Material Symbols "delete" (fill-based; inherits tile colour) -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
          </div>
          <h2 uiAlertDialogTitle>Delete chat?</h2>
          <p uiAlertDialogDescription>
            This will permanently delete this chat conversation. View
            <a href="#">Settings</a> delete any memories saved during this chat.
          </p>
        </div>
        <div uiAlertDialogFooter>
          <button uiButton variant="outline" uiAlertDialogCancel>Cancel</button>
          <button uiButton variant="destructive" uiAlertDialogAction>Delete</button>
        </div>
      </div>
    </ng-template>
  </div>`,
})
export class AlertDialogDestructiveComponent {}

export default AlertDialogDestructiveComponent

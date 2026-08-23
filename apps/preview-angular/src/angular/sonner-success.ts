import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/** Renders a checkmark icon in front of the message. */
@Component({
  selector: "preview-sonner-success",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Save version</button>
    </div>
  `,
})
export class SonnerSuccessComponent {
  protected fire() {
    toast.success("Version saved")
  }
}

export default SonnerSuccessComponent

import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/** A primary action button; clicking it closes the toast and runs the callback. */
@Component({
  selector: "preview-sonner-action",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Remove file</button>
    </div>
  `,
})
export class SonnerActionComponent {
  protected fire() {
    toast("File removed from this version", {
      action: { label: "Undo", onClick: () => toast("Restored") },
    })
  }
}

export default SonnerActionComponent

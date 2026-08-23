import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/**
 * A 3-part error — what happened, why, what to do next. `richColors` tints
 * the toast with the Force error tokens.
 */
@Component({
  selector: "preview-sonner-error",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster richColors />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Submit version</button>
    </div>
  `,
})
export class SonnerErrorComponent {
  protected fire() {
    toast.error("Submit failed", {
      description: "The server rejected the version. Check your connection and try again.",
    })
  }
}

export default SonnerErrorComponent

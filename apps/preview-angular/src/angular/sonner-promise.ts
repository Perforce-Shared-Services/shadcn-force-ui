import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/** Starts in a loading state and updates automatically once the promise settles. */
@Component({
  selector: "preview-sonner-promise",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Submit version</button>
    </div>
  `,
})
export class SonnerPromiseComponent {
  protected fire() {
    void toast.promise(
      () => new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Submitting version…",
        success: "Version submitted",
        error: "Submit failed — try again",
      }
    )
  }
}

export default SonnerPromiseComponent

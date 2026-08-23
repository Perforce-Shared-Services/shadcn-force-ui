import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/** Gallery of every toast type, fired in sequence for visual review. */
@Component({
  selector: "preview-sonner-types",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster expand />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fireAll()">Fire one of each</button>
    </div>
  `,
})
export class SonnerTypesComponent {
  protected fireAll() {
    toast("Version saved", {
      description: "Monday, January 3rd at 6:00pm",
    })
    toast.success("Version submitted")
    toast.info("A new version is available from the server")
    toast.warning("This experiment has unsynced changes")
    toast.error("Submit failed", {
      description: "The server rejected the version. Check your connection and try again.",
    })
  }
}

export default SonnerTypesComponent

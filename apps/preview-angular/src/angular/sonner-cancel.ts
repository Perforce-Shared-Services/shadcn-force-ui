import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/**
 * Both a cancel (secondary) and action (primary) button. Toasts auto-dismiss
 * and can be pushed off-screen, so keep the choice reversible — use a Dialog
 * for "are you sure" prompts instead.
 */
@Component({
  selector: "preview-sonner-cancel",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Check for updates</button>
    </div>
  `,
})
export class SonnerCancelComponent {
  protected fire() {
    toast("A teammate published a new version", {
      description: "Version 12 is available from the server.",
      cancel: { label: "Not now" },
      action: { label: "Sync now", onClick: () => toast.success("Synced version 12") },
    })
  }
}

export default SonnerCancelComponent

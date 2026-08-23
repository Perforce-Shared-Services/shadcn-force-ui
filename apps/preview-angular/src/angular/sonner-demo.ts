import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

@Component({
  selector: "preview-sonner-demo",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <ui-sonner-toaster />
    <div class="flex flex-wrap gap-2">
      <button uiButton variant="outline" (click)="fire()">Save version</button>
    </div>
  `,
})
export class SonnerDemoComponent {
  protected fire() {
    toast("Version saved", {
      description: "Monday, January 3rd at 6:00pm",
    })
  }
}

export default SonnerDemoComponent

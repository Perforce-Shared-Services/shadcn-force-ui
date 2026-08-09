import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-spinner",
  standalone: true,
  imports: [Button],
  template: `<div class="flex flex-wrap items-center gap-3">
    <button uiButton [loading]="true">Saving…</button
    ><button uiButton variant="outline" [loading]="true">Syncing…</button>
  </div>`,
})
export class ButtonSpinnerComponent {}

export default ButtonSpinnerComponent

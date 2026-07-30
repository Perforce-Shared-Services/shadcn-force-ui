import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-spinner",
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button uiButton [loading]="true">Saving…</button>
      <button uiButton variant="outline" [loading]="true">Syncing…</button>
    </div>
  `,
})
export default class ButtonSpinnerComponent {}

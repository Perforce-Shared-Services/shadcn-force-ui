import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"
import { SpinnerComponent } from "@/angular-ui/spinner"

@Component({
  selector: "preview-spinner-button",
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button uiButton [loading]="true">Submitting…</button>
      <button uiButton variant="outline" [loading]="true">Syncing…</button>
      <button uiButton variant="ghost">
        <span uiSpinner color="inherit" data-icon="inline-start"></span>
        Loading
      </button>
    </div>
  `,
})
export default class SpinnerButtonComponent {}

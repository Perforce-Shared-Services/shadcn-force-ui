import { Button } from "@/ui/button"
import { Spinner } from "@/ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-button",
  standalone: true,
  imports: [Button, Spinner],
  template: `<div class="flex flex-wrap items-center gap-3">
    <button uiButton [loading]="true">Submitting…</button
    ><button uiButton variant="outline" [loading]="true">Syncing…</button
    ><button uiButton variant="ghost">
      <span uiSpinner color="inherit" data-icon="inline-start"></span>Loading
    </button>
  </div>`,
})
export class SpinnerButtonComponent {}

export default SpinnerButtonComponent

import { Badge } from "@/angular-ui/badge"
import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-badge",
  standalone: true,
  imports: [Badge, Spinner],
  template: `<div class="flex items-center gap-4 [--radius:1.2rem]">
    <span uiBadge><span uiSpinner data-icon="inline-start"></span>Syncing</span>
    <span uiBadge variant="secondary"
      ><span uiSpinner data-icon="inline-start"></span>Updating</span
    >
    <span uiBadge variant="outline"
      ><span uiSpinner data-icon="inline-start"></span>Processing</span
    >
  </div>`,
})
export class SpinnerBadgeComponent {}

export default SpinnerBadgeComponent

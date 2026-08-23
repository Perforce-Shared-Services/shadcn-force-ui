import { Badge } from "@/angular-ui/badge"
import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

// apps/v4/examples/base/badge-spinner.tsx
@Component({
  selector: "preview-badge-spinner",
  standalone: true,
  imports: [Badge, Spinner],
  template: `<div class="flex flex-wrap gap-2">
    <span uiBadge variant="destructive">
      <span uiSpinner data-icon="inline-start"></span>
      Deleting
    </span>
    <span uiBadge variant="secondary">
      Generating
      <span uiSpinner data-icon="inline-end"></span>
    </span>
  </div>`,
})
export class BadgeWithSpinnerComponent {}

export default BadgeWithSpinnerComponent

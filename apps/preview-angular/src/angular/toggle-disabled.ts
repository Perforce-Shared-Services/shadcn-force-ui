import { Toggle } from "@/angular-ui/toggle"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-disabled",
  standalone: true,
  imports: [Toggle],
  template: ` <div class="flex flex-wrap items-center gap-2">
    <button uiToggle aria-label="Toggle disabled" disabled>Disabled</button>
    <button uiToggle variant="outline" aria-label="Toggle disabled outline" disabled>
      Disabled
    </button>
  </div>`,
})
export class ToggleDisabledComponent {}

export default ToggleDisabledComponent

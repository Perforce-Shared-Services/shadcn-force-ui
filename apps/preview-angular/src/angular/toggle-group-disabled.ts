import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-disabled",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div uiToggleGroup variant="outline" value="all" disabled>
    <button uiToggleGroupItem value="all" aria-label="Toggle all">All</button>
    <button uiToggleGroupItem value="missed" aria-label="Toggle missed">
      Missed
    </button>
  </div>`,
})
export class ToggleGroupDisabledComponent {}

export default ToggleGroupDisabledComponent

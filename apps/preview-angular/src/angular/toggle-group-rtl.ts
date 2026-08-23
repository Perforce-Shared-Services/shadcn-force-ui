import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-rtl",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div dir="rtl">
    <div uiToggleGroup variant="outline" value="all">
      <button uiToggleGroupItem value="all" aria-label="Toggle all">All</button>
      <button uiToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </button>
    </div>
  </div>`,
})
export class ToggleGroupRtlComponent {}

export default ToggleGroupRtlComponent

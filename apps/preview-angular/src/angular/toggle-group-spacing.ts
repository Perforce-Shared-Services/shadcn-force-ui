import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-spacing",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div uiToggleGroup size="sm" variant="outline" value="top" class="gap-2">
    <button uiToggleGroupItem value="top" aria-label="Toggle top">Top</button>
    <button uiToggleGroupItem value="bottom" aria-label="Toggle bottom">
      Bottom
    </button>
    <button uiToggleGroupItem value="left" aria-label="Toggle left">Left</button>
    <button uiToggleGroupItem value="right" aria-label="Toggle right">
      Right
    </button>
  </div>`,
})
export class ToggleGroupSpacingComponent {}

export default ToggleGroupSpacingComponent

import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-sizes",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div class="flex flex-col gap-4">
    <div uiToggleGroup size="sm" variant="outline" value="top">
      <button uiToggleGroupItem value="top" aria-label="Toggle top">Top</button>
      <button uiToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Bottom
      </button>
      <button uiToggleGroupItem value="left" aria-label="Toggle left">
        Left
      </button>
      <button uiToggleGroupItem value="right" aria-label="Toggle right">
        Right
      </button>
    </div>
    <div uiToggleGroup variant="outline" value="top">
      <button uiToggleGroupItem value="top" aria-label="Toggle top">Top</button>
      <button uiToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Bottom
      </button>
      <button uiToggleGroupItem value="left" aria-label="Toggle left">
        Left
      </button>
      <button uiToggleGroupItem value="right" aria-label="Toggle right">
        Right
      </button>
    </div>
  </div>`,
})
export class ToggleGroupSizesComponent {}

export default ToggleGroupSizesComponent

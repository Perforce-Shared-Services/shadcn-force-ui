import { Toggle } from "@/angular-ui/toggle"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-sizes",
  standalone: true,
  imports: [Toggle],
  template: ` <div class="flex flex-wrap items-center gap-2">
    <button uiToggle variant="outline" aria-label="Toggle small" size="sm">
      Small
    </button>
    <button uiToggle variant="outline" aria-label="Toggle default" size="default">
      Default
    </button>
    <button uiToggle variant="outline" aria-label="Toggle large" size="lg">
      Large
    </button>
  </div>`,
})
export class ToggleSizesComponent {}

export default ToggleSizesComponent

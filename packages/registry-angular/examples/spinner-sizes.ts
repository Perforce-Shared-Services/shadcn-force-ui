import { Spinner } from "@/ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-sizes",
  standalone: true,
  imports: [Spinner],
  template: `<div class="flex items-center gap-4">
    <span uiSpinner color="primary" size="xs"></span
    ><span uiSpinner color="primary" size="sm"></span
    ><span uiSpinner color="primary" size="md"></span
    ><span uiSpinner color="primary" size="lg"></span>
  </div>`,
})
export class SpinnerSizesComponent {}

export default SpinnerSizesComponent

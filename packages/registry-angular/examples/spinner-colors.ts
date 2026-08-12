import { Spinner } from "@/ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-colors",
  standalone: true,
  imports: [Spinner],
  template: `<div class="flex items-center gap-4">
    <span uiSpinner color="default" size="md"></span
    ><span uiSpinner color="primary" size="md"></span>
    <div class="rounded-lg bg-primary p-2">
      <span uiSpinner color="onPrimary" size="md"></span>
    </div>
  </div>`,
})
export class SpinnerColorsComponent {}

export default SpinnerColorsComponent

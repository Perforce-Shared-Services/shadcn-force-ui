import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-size",
  standalone: true,
  imports: [Spinner],
  template: `<div class="flex items-center gap-6">
    <span uiSpinner class="size-3"></span>
    <span uiSpinner class="size-4"></span>
    <span uiSpinner class="size-6"></span>
    <span uiSpinner class="size-8"></span>
  </div>`,
})
export class SpinnerSizeComponent {}

export default SpinnerSizeComponent

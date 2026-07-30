import { Component } from "@angular/core"
import { SpinnerComponent } from "@/angular-ui/spinner"

@Component({
  selector: "preview-spinner-colors",
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div class="flex items-center gap-4">
      <span uiSpinner color="default" size="md"></span>
      <span uiSpinner color="primary" size="md"></span>
      <div class="rounded-lg bg-primary p-2">
        <span uiSpinner color="onPrimary" size="md"></span>
      </div>
    </div>
  `,
})
export default class SpinnerColorsComponent {}

import { Component } from "@angular/core"
import { SpinnerComponent } from "@/angular-ui/spinner"

@Component({
  selector: "preview-spinner-sizes",
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div class="flex items-center gap-4">
      <span uiSpinner color="primary" size="xs"></span>
      <span uiSpinner color="primary" size="sm"></span>
      <span uiSpinner color="primary" size="md"></span>
      <span uiSpinner color="primary" size="lg"></span>
    </div>
  `,
})
export default class SpinnerSizesComponent {}

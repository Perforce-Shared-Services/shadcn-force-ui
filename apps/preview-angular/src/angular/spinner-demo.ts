import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-demo",
  standalone: true,
  imports: [Spinner],
  template: `<span uiSpinner></span>`,
})
export class SpinnerDemoComponent {}

export default SpinnerDemoComponent

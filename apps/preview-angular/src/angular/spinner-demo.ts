import { Component } from "@angular/core"
import { SpinnerComponent } from "@/angular-ui/spinner"

@Component({
  selector: "preview-spinner-demo",
  standalone: true,
  imports: [SpinnerComponent],
  template: `<span uiSpinner></span>`,
})
export default class SpinnerDemoComponent {}

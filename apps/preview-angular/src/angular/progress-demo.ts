import { Progress } from "@/angular-ui/progress"
import { Component } from "@angular/core"

@Component({
  selector: "preview-progress-demo",
  standalone: true,
  imports: [Progress],
  template: `<div
    uiProgress
    [value]="75"
    aria-label="Uploading (75%)"
    class="w-full max-w-sm"
  ></div>`,
})
export class ProgressDemoComponent {}

export default ProgressDemoComponent

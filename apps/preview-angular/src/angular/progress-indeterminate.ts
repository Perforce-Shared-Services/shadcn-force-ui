import { Progress } from "@/angular-ui/progress"
import { Component } from "@angular/core"

@Component({
  selector: "preview-progress-indeterminate",
  standalone: true,
  imports: [Progress],
  template: `<div
    uiProgress
    [value]="null"
    aria-label="Syncing…"
    class="w-full max-w-sm"
  ></div>`,
})
export class ProgressIndeterminateComponent {}

export default ProgressIndeterminateComponent

import { Component } from "@angular/core"

import { Progress } from "@/angular-ui/progress"

// apps/v4/examples/base/progress-label.tsx — the React Progress ships
// ProgressLabel/ProgressValue parts; the Angular port is a single-part bar,
// so label + percentage render as a header row around it (documented
// deviation in progress.mdx).
@Component({
  selector: "preview-progress-label",
  standalone: true,
  imports: [Progress],
  template: `<div class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between text-sm">
      <span class="font-medium">Upload progress</span>
      <span class="text-muted-foreground">56%</span>
    </div>
    <div uiProgress class="w-full" [value]="56" aria-label="Upload progress"></div>
  </div>`,
})
export class ProgressLabelComponent {}

export default ProgressLabelComponent

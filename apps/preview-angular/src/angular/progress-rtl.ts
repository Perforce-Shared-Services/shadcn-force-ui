import { Component } from "@angular/core"

import { Progress } from "@/angular-ui/progress"

// apps/v4/examples/base/progress-rtl.tsx — static Arabic label + Arabic
// numerals (٥٦٪) + dir="rtl" render the same visual state as the React
// language-selector-driven example. Single-part Angular progress: value
// renders in a header row (see progress-label deviation note).
@Component({
  selector: "preview-progress-rtl",
  standalone: true,
  imports: [Progress],
  template: `<div dir="rtl" class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between text-sm">
      <span class="font-medium">تقدم الرفع</span>
      <span class="text-muted-foreground">٥٦٪</span>
    </div>
    <div uiProgress class="w-full" [value]="56" aria-label="تقدم الرفع"></div>
  </div>`,
})
export class ProgressRtlComponent {}

export default ProgressRtlComponent

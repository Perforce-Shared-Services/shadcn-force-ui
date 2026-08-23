import { Component, effect, signal } from "@angular/core"

import { Progress } from "@/angular-ui/progress"
import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/progress-controlled.tsx — slider drives the progress
// value through shared state.
@Component({
  selector: "preview-progress-controlled",
  standalone: true,
  imports: [Progress, Slider],
  template: `<div class="flex w-full max-w-sm flex-col gap-4">
    <div uiProgress class="w-full" [value]="value()" aria-label="Progress"></div>
    <div
      uiSlider
      aria-label="Adjust progress"
      [(value)]="sliderValue"
      [min]="0"
      [max]="100"
      [step]="1"
    ></div>
  </div>`,
})
export class ProgressControlledComponent {
  readonly value = signal(50)
  readonly sliderValue = signal([50])

  constructor() {
    effect(() => this.value.set(this.sliderValue()[0] ?? 0))
  }
}

export default ProgressControlledComponent

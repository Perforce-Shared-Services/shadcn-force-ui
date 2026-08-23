import { Component, signal } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-controlled.tsx — two-thumb range bound through
// state; the joined value renders beside the label. min 0 / max 1 / step 0.1.
@Component({
  selector: "preview-slider-controlled",
  standalone: true,
  imports: [Slider, Label],
  template: `<div class="mx-auto grid w-full max-w-xs gap-3">
    <div class="flex items-center justify-between gap-2">
      <label uiLabel for="slider-demo-temperature">Temperature</label>
      <span class="text-sm text-muted-foreground">{{ value().join(", ") }}</span>
    </div>
    <div
      uiSlider
      id="slider-demo-temperature"
      [(value)]="value"
      aria-labelledby="slider-demo-temperature"
      [min]="0"
      [max]="1"
      [step]="0.1"
    ></div>
  </div>`,
})
export class SliderControlledComponent {
  readonly value = signal<number[]>([0.3, 0.7])
}

export default SliderControlledComponent

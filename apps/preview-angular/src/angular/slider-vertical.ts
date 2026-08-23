import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-vertical.tsx — two vertical sliders, h-40.
@Component({
  selector: "preview-slider-vertical",
  standalone: true,
  imports: [Slider],
  template: `<div class="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
    <div uiSlider orientation="vertical" class="h-40" [defaultValue]="[50]" [max]="100" [step]="1" aria-label="Vertical left"></div>
    <div uiSlider orientation="vertical" class="h-40" [defaultValue]="[25]" [max]="100" [step]="1" aria-label="Vertical right"></div>
  </div>`,
})
export class SliderVerticalComponent {}

export default SliderVerticalComponent

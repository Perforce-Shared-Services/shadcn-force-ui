import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-range.tsx — two thumbs, step 5.
@Component({
  selector: "preview-slider-range",
  standalone: true,
  imports: [Slider],
  template: `<div uiSlider class="mx-auto w-full max-w-xs" [defaultValue]="[25, 50]" [max]="100" [step]="5" aria-label="Range slider"></div>`,
})
export class SliderRangeComponent {}

export default SliderRangeComponent

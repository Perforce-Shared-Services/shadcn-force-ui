import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-multiple.tsx — three thumbs, step 10.
@Component({
  selector: "preview-slider-multiple",
  standalone: true,
  imports: [Slider],
  template: `<div uiSlider class="mx-auto w-full max-w-xs" [defaultValue]="[10, 20, 70]" [max]="100" [step]="10" aria-label="Multiple thumbs"></div>`,
})
export class SliderMultipleComponent {}

export default SliderMultipleComponent

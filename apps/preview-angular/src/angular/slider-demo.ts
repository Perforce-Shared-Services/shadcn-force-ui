import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-demo.tsx — defaultValue [75], max 100, step 1.
@Component({
  selector: "preview-slider-demo",
  standalone: true,
  imports: [Slider],
  template: `<div uiSlider class="mx-auto w-full max-w-xs" [defaultValue]="[75]" [max]="100" [step]="1" aria-label="Demo slider"></div>`,
})
export class SliderDemoComponent {}

export default SliderDemoComponent

import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-disabled.tsx — defaultValue [50], disabled.
@Component({
  selector: "preview-slider-disabled",
  standalone: true,
  imports: [Slider],
  template: `<div uiSlider class="mx-auto w-full max-w-xs" [defaultValue]="[50]" [max]="100" [step]="1" disabled aria-label="Disabled slider"></div>`,
})
export class SliderDisabledComponent {}

export default SliderDisabledComponent

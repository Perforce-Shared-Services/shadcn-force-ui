import { Component } from "@angular/core"

import { Slider } from "@/angular-ui/slider"

// apps/v4/examples/base/slider-rtl.tsx drives dir from the language-selector
// translations (ar). Static dir="rtl" renders the same visual state.
@Component({
  selector: "preview-slider-rtl",
  standalone: true,
  imports: [Slider],
  template: `<div uiSlider dir="rtl" class="mx-auto w-full max-w-xs" [defaultValue]="[75]" [max]="100" [step]="1" aria-label="RTL slider"></div>`,
})
export class SliderRtlComponent {}

export default SliderRtlComponent

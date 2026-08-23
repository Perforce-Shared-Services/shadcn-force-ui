import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@/angular-ui/field"
import { Component, signal } from "@angular/core"

// TODO(port): swap the native range inputs for uiSlider once the slider
// component is ported — this demo mirrors field-slider.tsx, which uses a
// dual-thumb Slider ([200, 800], min 0, max 1000, step 10).
@Component({
  selector: "preview-field-slider",
  standalone: true,
  imports: [Field, FieldDescription, FieldTitle],
  template: `
    <div uiField class="w-full max-w-xs">
      <div uiFieldTitle>Price Range</div>
      <p uiFieldDescription>
        Set your budget range ($<span class="font-medium tabular-nums">{{ value()[0] }}</span> -
        <span class="font-medium tabular-nums">{{ value()[1] }}</span>).
      </p>
      <input
        type="range"
        min="0"
        max="1000"
        step="10"
        [value]="value()[0]"
        (input)="setMin($any($event.target).value)"
        aria-label="Minimum price"
        class="mt-2 w-full accent-primary"
      />
      <input
        type="range"
        min="0"
        max="1000"
        step="10"
        [value]="value()[1]"
        (input)="setMax($any($event.target).value)"
        aria-label="Maximum price"
        class="w-full accent-primary"
      />
    </div>
  `,
})
export class FieldSliderComponent {
  readonly value = signal<[number, number]>([200, 800])

  setMin(raw: string): void {
    const min = Math.min(Number(raw), this.value()[1])
    this.value.set([min, this.value()[1]])
  }

  setMax(raw: string): void {
    const max = Math.max(Number(raw), this.value()[0])
    this.value.set([this.value()[0], max])
  }
}

export default FieldSliderComponent

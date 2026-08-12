import { Label } from "@/ui/label"
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-demo",
  standalone: true,
  imports: [RadioGroup, RadioGroupItem, Label],
  template: ` <div uiRadioGroup defaultValue="option-1" class="gap-3">
    <div class="flex items-center gap-2">
      <button uiRadioGroupItem id="r1" value="option-1"></button>
      <label uiLabel for="r1">Default</label>
    </div>
    <div class="flex items-center gap-2">
      <button uiRadioGroupItem id="r2" value="option-2"></button>
      <label uiLabel for="r2">Comfortable</label>
    </div>
    <div class="flex items-center gap-2">
      <button uiRadioGroupItem id="r3" value="option-3"></button>
      <label uiLabel for="r3">Compact</label>
    </div>
  </div>`,
})
export class RadioGroupDemoComponent {}

export default RadioGroupDemoComponent

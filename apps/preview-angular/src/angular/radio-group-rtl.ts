import { Label } from "@/angular-ui/label"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-rtl",
  standalone: true,
  imports: [Label, RadioGroup, RadioGroupItem],
  template: ` <div dir="rtl">
    <div uiRadioGroup defaultValue="option-1" class="gap-3">
      <div class="flex items-center gap-2">
        <button uiRadioGroupItem id="rtl-r1" value="option-1"></button>
        <label uiLabel for="rtl-r1">افتراضي</label>
      </div>
      <div class="flex items-center gap-2">
        <button uiRadioGroupItem id="rtl-r2" value="option-2"></button>
        <label uiLabel for="rtl-r2">مريح</label>
      </div>
      <div class="flex items-center gap-2">
        <button uiRadioGroupItem id="rtl-r3" value="option-3"></button>
        <label uiLabel for="rtl-r3">مضغوط</label>
      </div>
    </div>
  </div>`,
})
export class RadioGroupRtlComponent {}

export default RadioGroupRtlComponent

import { Field, FieldLabel } from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-disabled",
  standalone: true,
  imports: [Field, FieldLabel, RadioGroup, RadioGroupItem],
  template: ` <div uiRadioGroup defaultValue="option2" class="w-fit">
    <div uiField orientation="horizontal" data-disabled>
      <button
        uiRadioGroupItem
        id="disabled-1"
        value="option1"
        [disabled]="true"
      ></button>
      <label uiFieldLabel for="disabled-1" class="font-normal">Disabled</label>
    </div>
    <div uiField orientation="horizontal">
      <button uiRadioGroupItem id="disabled-2" value="option2"></button>
      <label uiFieldLabel for="disabled-2" class="font-normal">Option 2</label>
    </div>
    <div uiField orientation="horizontal">
      <button uiRadioGroupItem id="disabled-3" value="option3"></button>
      <label uiFieldLabel for="disabled-3" class="font-normal">Option 3</label>
    </div>
  </div>`,
})
export class RadioGroupDisabledComponent {}

export default RadioGroupDisabledComponent

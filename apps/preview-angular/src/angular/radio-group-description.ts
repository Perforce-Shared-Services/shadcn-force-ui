import { Field, FieldContent, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-description",
  standalone: true,
  imports: [Field, FieldContent, FieldLabel, FieldDescription, RadioGroup, RadioGroupItem],
  template: ` <div uiRadioGroup defaultValue="comfortable" class="w-fit">
    <div uiField orientation="horizontal">
      <button uiRadioGroupItem id="desc-r1" value="default"></button>
      <div uiFieldContent>
        <label uiFieldLabel for="desc-r1">Default</label>
        <p uiFieldDescription>Standard spacing for most use cases.</p>
      </div>
    </div>
    <div uiField orientation="horizontal">
      <button uiRadioGroupItem id="desc-r2" value="comfortable"></button>
      <div uiFieldContent>
        <label uiFieldLabel for="desc-r2">Comfortable</label>
        <p uiFieldDescription>More space between elements.</p>
      </div>
    </div>
    <div uiField orientation="horizontal">
      <button uiRadioGroupItem id="desc-r3" value="compact"></button>
      <div uiFieldContent>
        <label uiFieldLabel for="desc-r3">Compact</label>
        <p uiFieldDescription>Minimal spacing for dense layouts.</p>
      </div>
    </div>
  </div>`,
})
export class RadioGroupDescriptionComponent {}

export default RadioGroupDescriptionComponent

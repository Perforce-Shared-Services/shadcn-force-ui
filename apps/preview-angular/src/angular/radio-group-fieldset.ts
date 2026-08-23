import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-fieldset",
  standalone: true,
  imports: [FieldSet, FieldLegend, FieldDescription, RadioGroup, Field, FieldLabel, RadioGroupItem],
  template: ` <fieldset uiFieldSet class="w-full max-w-xs">
    <legend uiFieldLegend variant="label">Subscription Plan</legend>
    <p uiFieldDescription>You can change your plan at any time.</p>
    <div uiRadioGroup defaultValue="free">
      <div uiField orientation="horizontal">
        <button uiRadioGroupItem id="plan-free" value="free"></button>
        <label uiFieldLabel for="plan-free" class="font-normal">Free</label>
      </div>
      <div uiField orientation="horizontal">
        <button uiRadioGroupItem id="plan-pro" value="pro"></button>
        <label uiFieldLabel for="plan-pro" class="font-normal">Pro</label>
      </div>
      <div uiField orientation="horizontal">
        <button uiRadioGroupItem id="plan-team" value="team"></button>
        <label uiFieldLabel for="plan-team" class="font-normal">Team</label>
      </div>
    </div>
  </fieldset>`,
})
export class RadioGroupFieldsetComponent {}

export default RadioGroupFieldsetComponent

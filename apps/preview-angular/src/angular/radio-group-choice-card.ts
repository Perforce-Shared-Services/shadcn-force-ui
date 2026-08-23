import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-choice-card",
  standalone: true,
  imports: [Field, FieldContent, FieldTitle, FieldDescription, FieldLabel, RadioGroup, RadioGroupItem],
  template: ` <div uiRadioGroup defaultValue="plus" class="max-w-sm">
    <label uiFieldLabel for="plus-plan">
      <div uiField orientation="horizontal">
        <div uiFieldContent>
          <span uiFieldTitle>Plus</span>
          <p uiFieldDescription>For individuals and small teams.</p>
        </div>
        <button uiRadioGroupItem id="plus-plan" value="plus"></button>
      </div>
    </label>
    <label uiFieldLabel for="pro-plan">
      <div uiField orientation="horizontal">
        <div uiFieldContent>
          <span uiFieldTitle>Pro</span>
          <p uiFieldDescription>For growing businesses.</p>
        </div>
        <button uiRadioGroupItem id="pro-plan" value="pro"></button>
      </div>
    </label>
    <label uiFieldLabel for="enterprise-plan">
      <div uiField orientation="horizontal">
        <div uiFieldContent>
          <span uiFieldTitle>Enterprise</span>
          <p uiFieldDescription>For large teams and enterprises.</p>
        </div>
        <button uiRadioGroupItem id="enterprise-plan" value="enterprise"></button>
      </div>
    </label>
  </div>`,
})
export class RadioGroupChoiceCardComponent {}

export default RadioGroupChoiceCardComponent

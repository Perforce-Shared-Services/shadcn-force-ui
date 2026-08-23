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
  selector: "preview-field-radio",
  standalone: true,
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    RadioGroup,
    RadioGroupItem,
  ],
  template: `
    <fieldset uiFieldSet class="w-full max-w-xs">
      <legend uiFieldLegend variant="label">Subscription Plan</legend>
      <p uiFieldDescription>
        Yearly and lifetime plans offer significant savings.
      </p>
      <div uiRadioGroup defaultValue="monthly">
        <div uiField orientation="horizontal">
          <button uiRadioGroupItem value="monthly" id="plan-monthly"></button>
          <label uiFieldLabel for="plan-monthly" class="font-normal">
            Monthly ($9.99/month)
          </label>
        </div>
        <div uiField orientation="horizontal">
          <button uiRadioGroupItem value="yearly" id="plan-yearly"></button>
          <label uiFieldLabel for="plan-yearly" class="font-normal">
            Yearly ($99.99/year)
          </label>
        </div>
        <div uiField orientation="horizontal">
          <button uiRadioGroupItem value="lifetime" id="plan-lifetime"></button>
          <label uiFieldLabel for="plan-lifetime" class="font-normal">
            Lifetime ($299.99)
          </label>
        </div>
      </div>
    </fieldset>
  `,
})
export class FieldRadioComponent {}

export default FieldRadioComponent

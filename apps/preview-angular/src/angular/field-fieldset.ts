import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-fieldset",
  standalone: true,
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input,
  ],
  template: `
    <fieldset uiFieldSet class="w-full max-w-sm">
      <legend uiFieldLegend>Address Information</legend>
      <p uiFieldDescription>
        We need your address to deliver your order.
      </p>
      <div uiFieldGroup>
        <div uiField>
          <label uiFieldLabel for="street">Street Address</label>
          <input uiInput id="street" type="text" placeholder="123 Main St" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div uiField>
            <label uiFieldLabel for="city">City</label>
            <input uiInput id="city" type="text" placeholder="New York" />
          </div>
          <div uiField>
            <label uiFieldLabel for="zip">Postal Code</label>
            <input uiInput id="zip" type="text" placeholder="90502" />
          </div>
        </div>
      </div>
    </fieldset>
  `,
})
export class FieldFieldsetComponent {}

export default FieldFieldsetComponent

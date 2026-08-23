import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/angular-ui/field"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-demo",
  standalone: true,
  imports: [Checkbox, Label, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle],
  template: ` <div uiFieldGroup class="max-w-sm">
    <div uiField orientation="horizontal">
      <button uiCheckbox id="terms-checkbox" name="terms-checkbox"></button>
      <label uiLabel for="terms-checkbox">Accept terms and conditions</label>
    </div>
    <div uiField orientation="horizontal">
      <button uiCheckbox id="terms-checkbox-2" name="terms-checkbox-2" [checked]="true"></button>
      <div uiFieldContent>
        <label uiFieldLabel for="terms-checkbox-2">
          Accept terms and conditions
        </label>
        <p uiFieldDescription>
          By clicking this checkbox, you agree to the terms.
        </p>
      </div>
    </div>
    <div uiField orientation="horizontal" data-disabled>
      <button uiCheckbox id="toggle-checkbox" name="toggle-checkbox" disabled></button>
      <label uiFieldLabel for="toggle-checkbox">Enable notifications</label>
    </div>
    <label uiFieldLabel>
      <div uiField orientation="horizontal">
        <button uiCheckbox id="toggle-checkbox-2" name="toggle-checkbox-2"></button>
        <div uiFieldContent>
          <span uiFieldTitle>Enable notifications</span>
          <p uiFieldDescription>
            You can enable or disable notifications at any time.
          </p>
        </div>
      </div>
    </label>
  </div>`,
})
export class CheckboxDemoComponent {}

export default CheckboxDemoComponent

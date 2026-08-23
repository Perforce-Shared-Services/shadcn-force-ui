import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-description",
  standalone: true,
  imports: [Checkbox, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel],
  template: ` <div uiFieldGroup class="mx-auto w-72">
    <div uiField orientation="horizontal">
      <button uiCheckbox id="terms-checkbox-desc" [checked]="true"></button>
      <div uiFieldContent>
        <label uiFieldLabel for="terms-checkbox-desc">
          Accept terms and conditions
        </label>
        <p uiFieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  </div>`,
})
export class CheckboxDescriptionComponent {}

export default CheckboxDescriptionComponent

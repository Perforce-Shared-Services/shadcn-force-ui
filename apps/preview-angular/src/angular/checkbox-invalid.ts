import { Checkbox } from "@/angular-ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-invalid",
  standalone: true,
  imports: [Checkbox, Field, FieldGroup, FieldLabel],
  template: ` <div uiFieldGroup class="mx-auto w-56">
    <div uiField orientation="horizontal" data-invalid>
      <button
        uiCheckbox
        id="terms-checkbox-invalid"
        aria-invalid="true"
      ></button>
      <label uiFieldLabel for="terms-checkbox-invalid">
        Accept terms and conditions
      </label>
    </div>
  </div>`,
})
export class CheckboxInvalidComponent {}

export default CheckboxInvalidComponent

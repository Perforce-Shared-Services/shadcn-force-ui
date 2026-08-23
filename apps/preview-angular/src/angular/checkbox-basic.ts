import { Checkbox } from "@/angular-ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-basic",
  standalone: true,
  imports: [Checkbox, Field, FieldGroup, FieldLabel],
  template: ` <div uiFieldGroup class="mx-auto w-56">
    <div uiField orientation="horizontal">
      <button uiCheckbox id="terms-checkbox-basic" [checked]="false"></button>
      <label uiFieldLabel for="terms-checkbox-basic">
        Accept terms and conditions
      </label>
    </div>
  </div>`,
})
export class CheckboxBasicComponent {}

export default CheckboxBasicComponent

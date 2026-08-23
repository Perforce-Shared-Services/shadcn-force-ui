import { Checkbox } from "@/angular-ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-disabled",
  standalone: true,
  imports: [Checkbox, Field, FieldGroup, FieldLabel],
  template: ` <div uiFieldGroup class="mx-auto w-56">
    <div uiField orientation="horizontal" data-disabled>
      <button
        uiCheckbox
        id="toggle-checkbox-disabled"
        [disabled]="true"
      ></button>
      <label uiFieldLabel for="toggle-checkbox-disabled">
        Enable notifications
      </label>
    </div>
  </div>`,
})
export class CheckboxDisabledComponent {}

export default CheckboxDisabledComponent

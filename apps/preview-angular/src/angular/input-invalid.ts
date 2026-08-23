import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-invalid",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField [attr.data-invalid]="true">
      <label uiFieldLabel for="input-invalid">Invalid Input</label>
      <input uiInput id="input-invalid" placeholder="Error" aria-invalid />
      <p uiFieldDescription>This field contains validation errors.</p>
    </div>
  `,
})
export class InputInvalidComponent {}

export default InputInvalidComponent

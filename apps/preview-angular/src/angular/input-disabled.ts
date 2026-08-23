import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-disabled",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField attr.data-disabled="true">
      <label uiFieldLabel for="input-demo-disabled">Email</label>
      <input
        uiInput
        id="input-demo-disabled"
        type="email"
        placeholder="Email"
        disabled
      />
      <p uiFieldDescription>This field is currently disabled.</p>
    </div>
  `,
})
export class InputDisabledComponent {}

export default InputDisabledComponent

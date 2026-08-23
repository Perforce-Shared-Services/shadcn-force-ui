import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-field",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField>
      <label uiFieldLabel for="input-field-username">Username</label>
      <input
        uiInput
        id="input-field-username"
        type="text"
        placeholder="Enter your username"
      />
      <p uiFieldDescription>
        Choose a unique username for your account.
      </p>
    </div>
  `,
})
export class InputFieldComponent {}

export default InputFieldComponent

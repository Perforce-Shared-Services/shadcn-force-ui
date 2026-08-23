import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-required",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField>
      <label uiFieldLabel for="input-required">
        Required Field <span class="text-destructive">*</span>
      </label>
      <input
        uiInput
        id="input-required"
        placeholder="This field is required"
        required
      />
      <p uiFieldDescription>This field must be filled out.</p>
    </div>
  `,
})
export class InputRequiredComponent {}

export default InputRequiredComponent

import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-file",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField>
      <label uiFieldLabel for="picture">Picture</label>
      <input uiInput id="picture" type="file" />
      <p uiFieldDescription>Select a picture to upload.</p>
    </div>
  `,
})
export class InputFileComponent {}

export default InputFileComponent

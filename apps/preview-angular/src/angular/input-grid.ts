import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-grid",
  standalone: true,
  imports: [Field, FieldGroup, FieldLabel, Input],
  template: `
    <div uiFieldGroup class="grid max-w-sm grid-cols-2">
      <div uiField>
        <label uiFieldLabel for="first-name">First Name</label>
        <input uiInput id="first-name" placeholder="Jordan" />
      </div>
      <div uiField>
        <label uiFieldLabel for="last-name">Last Name</label>
        <input uiInput id="last-name" placeholder="Lee" />
      </div>
    </div>
  `,
})
export class InputGridComponent {}

export default InputGridComponent

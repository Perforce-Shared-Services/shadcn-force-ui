import { Button } from "@/angular-ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-fieldgroup",
  standalone: true,
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
  ],
  template: `
    <div uiFieldGroup>
      <div uiField>
        <label uiFieldLabel for="fieldgroup-name">Name</label>
        <input uiInput id="fieldgroup-name" placeholder="Jordan Lee" />
      </div>
      <div uiField>
        <label uiFieldLabel for="fieldgroup-email">Email</label>
        <input
          uiInput
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
        <p uiFieldDescription>We'll send updates to this address.</p>
      </div>
      <div uiField orientation="horizontal">
        <button uiButton type="reset" variant="outline">Reset</button>
        <button uiButton type="submit">Submit</button>
      </div>
    </div>
  `,
})
export class InputFieldgroupComponent {}

export default InputFieldgroupComponent

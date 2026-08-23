import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-input",
  standalone: true,
  imports: [Field, FieldDescription, FieldGroup, FieldLabel, FieldSet, Input],
  template: `
    <fieldset uiFieldSet class="w-full max-w-xs">
      <div uiFieldGroup>
        <div uiField>
          <label uiFieldLabel for="username">Username</label>
          <input uiInput id="username" type="text" placeholder="Max Leiter" />
          <p uiFieldDescription>
            Choose a unique username for your account.
          </p>
        </div>
        <div uiField>
          <label uiFieldLabel for="password">Password</label>
          <p uiFieldDescription>Must be at least 8 characters long.</p>
          <input
            uiInput
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </div>
    </fieldset>
  `,
})
export class FieldInputComponent {}

export default FieldInputComponent

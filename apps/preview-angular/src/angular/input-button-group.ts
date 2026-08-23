import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Field, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-button-group",
  standalone: true,
  imports: [Button, ButtonGroup, Field, FieldLabel, Input],
  template: `
    <div uiField>
      <label uiFieldLabel for="input-button-group">Search</label>
      <div uiButtonGroup>
        <input uiInput id="input-button-group" placeholder="Type to search..." />
        <button uiButton variant="outline">Search</button>
      </div>
    </div>
  `,
})
export class InputButtonGroupComponent {}

export default InputButtonGroupComponent

import { Component } from "@angular/core"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-invalid",
  standalone: true,
  imports: [Field, FieldContent, FieldLabel, FieldDescription, Switch],
  template: ` <div uiField orientation="horizontal" class="max-w-sm" data-invalid>
    <div uiFieldContent>
      <label uiFieldLabel for="switch-terms">
        Accept terms and conditions
      </label>
      <p uiFieldDescription>
        You must accept the terms and conditions to continue.
      </p>
    </div>
    <button uiSwitch id="switch-terms" aria-invalid="true"></button>
  </div>`,
})
export class SwitchInvalidComponent {}

export default SwitchInvalidComponent

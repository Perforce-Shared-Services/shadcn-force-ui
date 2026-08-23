import { Field, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-switch",
  standalone: true,
  imports: [Field, FieldLabel, Switch],
  template: `
    <div uiField orientation="horizontal" class="w-fit">
      <label uiFieldLabel for="2fa">Multi-factor authentication</label>
      <button uiSwitch id="2fa" [checked]="false"></button>
    </div>
  `,
})
export class FieldSwitchComponent {}

export default FieldSwitchComponent

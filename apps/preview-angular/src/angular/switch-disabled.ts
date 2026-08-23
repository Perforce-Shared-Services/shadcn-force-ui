import { Component } from "@angular/core"
import { Field, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-disabled",
  standalone: true,
  imports: [Field, FieldLabel, Switch],
  template: ` <div uiField orientation="horizontal" data-disabled class="w-fit">
    <button uiSwitch id="switch-disabled-unchecked" [disabled]="true"></button>
    <label uiFieldLabel for="switch-disabled-unchecked">Disabled</label>
  </div>`,
})
export class SwitchDisabledComponent {}

export default SwitchDisabledComponent

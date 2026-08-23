import { Component } from "@angular/core"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-sizes",
  standalone: true,
  imports: [Field, FieldGroup, FieldLabel, Switch],
  template: ` <div uiFieldGroup class="w-full max-w-40">
    <div uiField orientation="horizontal">
      <button uiSwitch id="switch-size-sm" size="sm"></button>
      <label uiFieldLabel for="switch-size-sm">Small</label>
    </div>
    <div uiField orientation="horizontal">
      <button uiSwitch id="switch-size-default" size="default"></button>
      <label uiFieldLabel for="switch-size-default">Default</label>
    </div>
  </div>`,
})
export class SwitchSizesComponent {}

export default SwitchSizesComponent

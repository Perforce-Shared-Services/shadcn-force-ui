import { Component } from "@angular/core"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-description",
  standalone: true,
  imports: [Field, FieldContent, FieldLabel, FieldDescription, Switch],
  template: ` <div uiField orientation="horizontal" class="max-w-sm">
    <div uiFieldContent>
      <label uiFieldLabel for="switch-focus-mode">
        Share across devices
      </label>
      <p uiFieldDescription>
        Focus is shared across devices, and turns off when you leave the app.
      </p>
    </div>
    <button uiSwitch id="switch-focus-mode"></button>
  </div>`,
})
export class SwitchDescriptionComponent {}

export default SwitchDescriptionComponent

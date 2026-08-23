import { Label } from "@/angular-ui/label"
import { Switch } from "@/angular-ui/switch"
import { Component } from "@angular/core"

@Component({
  selector: "preview-switch-demo",
  standalone: true,
  imports: [Switch, Label],
  template: ` <div class="flex items-center space-x-2">
    <button uiSwitch id="airplane-mode"></button>
    <label uiLabel for="airplane-mode">Airplane Mode</label>
  </div>`,
})
export class SwitchDemoComponent {}

export default SwitchDemoComponent

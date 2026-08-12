import { Label } from "@/ui/label"
import { Switch } from "@/ui/switch"
import { Component } from "@angular/core"

@Component({
  selector: "preview-switch-demo",
  standalone: true,
  imports: [Switch, Label],
  template: ` <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <button uiSwitch id="airplane" [checked]="false"></button>
      <label uiLabel for="airplane">Airplane mode</label>
    </div>
    <div class="flex items-center gap-2">
      <button uiSwitch id="enabled" [checked]="true"></button>
      <label uiLabel for="enabled">Notifications enabled</label>
    </div>
  </div>`,
})
export class SwitchDemoComponent {}

export default SwitchDemoComponent

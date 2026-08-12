import { Checkbox } from "@/angular-ui/checkbox"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-demo",
  standalone: true,
  imports: [Checkbox, Label],
  template: ` <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <button uiCheckbox id="tos" [checked]="false"></button>
      <label uiLabel for="tos">Accept terms and conditions</label>
    </div>
    <div class="flex items-center gap-2">
      <button uiCheckbox id="checked-demo" [checked]="true"></button>
      <label uiLabel for="checked-demo">Already accepted</label>
    </div>
    <div class="flex items-center gap-2 opacity-50">
      <button uiCheckbox id="disabled-demo" [checked]="false" disabled></button>
      <label uiLabel for="disabled-demo">Disabled</label>
    </div>
  </div>`,
})
export class CheckboxDemoComponent {}

export default CheckboxDemoComponent

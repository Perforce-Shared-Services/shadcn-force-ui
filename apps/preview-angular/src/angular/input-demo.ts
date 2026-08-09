import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-demo",
  standalone: true,
  imports: [Input, Label],
  template: `<div class="flex w-full max-w-sm flex-col gap-1.5">
    <label uiLabel for="email-demo">Email</label
    ><input uiInput id="email-demo" type="email" placeholder="m@example.com" />
  </div>`,
})
export class InputDemoComponent {}

export default InputDemoComponent

import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-basic",
  standalone: true,
  imports: [Input],
  template: ` <input uiInput placeholder="Enter text" /> `,
})
export class InputBasicComponent {}

export default InputBasicComponent

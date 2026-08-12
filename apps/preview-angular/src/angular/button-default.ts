import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-default",
  standalone: true,
  imports: [Button],
  template: `<button uiButton>Default</button>`,
})
export class ButtonDefaultComponent {}

export default ButtonDefaultComponent

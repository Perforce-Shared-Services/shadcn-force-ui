import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-default",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton>Default</button>`,
})
export default class ButtonDefaultComponent {}

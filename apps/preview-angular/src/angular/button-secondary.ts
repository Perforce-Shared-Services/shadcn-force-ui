import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-secondary",
  standalone: true,
  imports: [Button],
  template: `<button uiButton variant="secondary">Secondary</button>`,
})
export class ButtonSecondaryComponent {}

export default ButtonSecondaryComponent

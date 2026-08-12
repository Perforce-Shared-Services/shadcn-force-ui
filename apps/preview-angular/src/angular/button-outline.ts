import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-outline",
  standalone: true,
  imports: [Button],
  template: `<button uiButton variant="outline">Outline</button>`,
})
export class ButtonOutlineComponent {}

export default ButtonOutlineComponent

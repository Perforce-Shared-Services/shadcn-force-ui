import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-outline",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton variant="outline">Outline</button>`,
})
export default class ButtonOutlineComponent {}

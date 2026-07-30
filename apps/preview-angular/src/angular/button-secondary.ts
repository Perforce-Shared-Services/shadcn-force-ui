import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-secondary",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton variant="secondary">Secondary</button>`,
})
export default class ButtonSecondaryComponent {}

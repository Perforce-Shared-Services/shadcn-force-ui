import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-link",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton variant="link">Link</button>`,
})
export default class ButtonLinkComponent {}

import { Button } from "@/ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-link",
  standalone: true,
  imports: [Button],
  template: `<button uiButton variant="link">Link</button>`,
})
export class ButtonLinkComponent {}

export default ButtonLinkComponent

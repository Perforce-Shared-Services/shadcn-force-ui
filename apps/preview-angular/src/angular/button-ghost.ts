import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-ghost",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton variant="ghost">Ghost</button>`,
})
export default class ButtonGhostComponent {}

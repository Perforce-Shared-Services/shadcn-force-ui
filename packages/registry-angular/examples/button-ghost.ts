import { Button } from "@/ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-ghost",
  standalone: true,
  imports: [Button],
  template: `<button uiButton variant="ghost">Ghost</button>`,
})
export class ButtonGhostComponent {}

export default ButtonGhostComponent

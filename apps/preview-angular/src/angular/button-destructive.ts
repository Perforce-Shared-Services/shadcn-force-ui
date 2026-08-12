import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-destructive",
  standalone: true,
  imports: [Button],
  template: `<button uiButton variant="destructive">Delete</button>`,
})
export class ButtonDestructiveComponent {}

export default ButtonDestructiveComponent

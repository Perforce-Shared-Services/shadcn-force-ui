import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-destructive",
  standalone: true,
  imports: [ButtonComponent],
  template: `<button uiButton variant="destructive">Delete</button>`,
})
export default class ButtonDestructiveComponent {}

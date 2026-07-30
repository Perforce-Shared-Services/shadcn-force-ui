import { Component } from "@angular/core"
import { KbdComponent, KbdGroupComponent } from "@/angular-ui/kbd"

@Component({
  selector: "preview-kbd-group",
  standalone: true,
  imports: [KbdComponent, KbdGroupComponent],
  template: `
    <span uiKbdGroup>
      <kbd uiKbd>Ctrl</kbd>
      <kbd uiKbd>Shift</kbd>
      <kbd uiKbd>P</kbd>
    </span>
  `,
})
export default class KbdGroupComponent {}

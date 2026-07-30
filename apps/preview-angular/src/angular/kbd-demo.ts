import { Component } from "@angular/core"
import { KbdComponent } from "@/angular-ui/kbd"

@Component({
  selector: "preview-kbd-demo",
  standalone: true,
  imports: [KbdComponent],
  template: `
    <div class="flex items-center gap-2">
      <kbd uiKbd>Ctrl</kbd>
      <kbd uiKbd>⌘K</kbd>
      <kbd uiKbd>Ctrl + B</kbd>
    </div>
  `,
})
export default class KbdDemoComponent {}

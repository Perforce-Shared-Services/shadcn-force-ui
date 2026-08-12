import { Kbd } from "@/ui/kbd"
import { Component } from "@angular/core"

@Component({
  selector: "preview-kbd-demo",
  standalone: true,
  imports: [Kbd],
  template: `<div class="flex items-center gap-2">
    <kbd uiKbd>Ctrl</kbd><kbd uiKbd>⌘K</kbd><kbd uiKbd>Ctrl + B</kbd>
  </div>`,
})
export class KbdDemoComponent {}

export default KbdDemoComponent

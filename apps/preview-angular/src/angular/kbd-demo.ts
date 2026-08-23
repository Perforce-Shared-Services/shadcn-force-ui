import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import { Component } from "@angular/core"

// apps/v4/examples/base/kbd-demo.tsx
@Component({
  selector: "preview-kbd-demo",
  standalone: true,
  imports: [Kbd, KbdGroup],
  template: `<div class="flex flex-col items-center gap-4">
    <span uiKbdGroup>
      <kbd uiKbd>⌘</kbd><kbd uiKbd>⇧</kbd><kbd uiKbd>⌥</kbd><kbd uiKbd>⌃</kbd>
    </span>
    <span uiKbdGroup>
      <kbd uiKbd>Ctrl</kbd><span>+</span><kbd uiKbd>B</kbd>
    </span>
  </div>`,
})
export class KbdDemoComponent {}

export default KbdDemoComponent

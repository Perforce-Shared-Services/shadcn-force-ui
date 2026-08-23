import { Button } from "@/angular-ui/button"
import { Kbd } from "@/angular-ui/kbd"
import { Component } from "@angular/core"

// apps/v4/examples/base/kbd-button.tsx
@Component({
  selector: "preview-kbd-button",
  standalone: true,
  imports: [Button, Kbd],
  template: `<button uiButton variant="outline">
    Accept<kbd uiKbd data-icon="inline-end" class="translate-x-0.5">⏎</kbd>
  </button>`,
})
export class KbdButtonComponent {}

export default KbdButtonComponent

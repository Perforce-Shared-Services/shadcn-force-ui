import { Kbd } from "@/angular-ui/kbd"
import { Component } from "@angular/core"

// apps/v4/examples/base/kbd-primary.tsx
@Component({
  selector: "preview-kbd-primary",
  standalone: true,
  imports: [Kbd],
  template: `<div class="flex items-center gap-4">
    <kbd uiKbd>⌘K</kbd>
    <div class="rounded-md bg-primary px-3 py-1.5">
      <kbd uiKbd variant="primary">⌘K</kbd>
    </div>
  </div>`,
})
export class KbdPrimaryComponent {}

export default KbdPrimaryComponent

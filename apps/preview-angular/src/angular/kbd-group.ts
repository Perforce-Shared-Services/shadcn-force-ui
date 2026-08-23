import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import { Component } from "@angular/core"

// apps/v4/examples/base/kbd-group.tsx
@Component({
  selector: "preview-kbd-group",
  standalone: true,
  imports: [Kbd, KbdGroup],
  template: `<div class="flex flex-col items-center gap-4">
    <p class="text-sm text-muted-foreground">
      Use
      <span uiKbdGroup>
        <kbd uiKbd>Ctrl + B</kbd><kbd uiKbd>Ctrl + K</kbd>
      </span>
      to open the command palette
    </p>
  </div>`,
})
export class KbdGroupPreviewComponent {}

export default KbdGroupPreviewComponent

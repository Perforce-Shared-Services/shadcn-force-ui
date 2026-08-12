import { Button } from "@/ui/button"
import { Kbd, KbdGroup } from "@/ui/kbd"
import { Component } from "@angular/core"

@Component({
  selector: "preview-kbd-primary",
  standalone: true,
  imports: [Button, Kbd, KbdGroup],
  template: `<div class="flex items-center gap-4">
    <kbd uiKbd variant="default">⌘K</kbd
    ><button uiButton>
      Open palette<span uiKbdGroup data-icon="inline-end"
        ><kbd uiKbd variant="primary">⌘</kbd
        ><kbd uiKbd variant="primary">K</kbd></span
      >
    </button>
  </div>`,
})
export class KbdPrimaryComponent {}

export default KbdPrimaryComponent

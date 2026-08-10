import { Kbd, KbdGroup } from "@/ui/kbd"
import { Component } from "@angular/core"

@Component({
  selector: "preview-kbd-group",
  standalone: true,
  imports: [Kbd, KbdGroup],
  template: `<span uiKbdGroup
    ><kbd uiKbd>Ctrl</kbd><kbd uiKbd>Shift</kbd><kbd uiKbd>P</kbd></span
  >`,
})
export class KbdGroupPreviewComponent {}

export default KbdGroupPreviewComponent

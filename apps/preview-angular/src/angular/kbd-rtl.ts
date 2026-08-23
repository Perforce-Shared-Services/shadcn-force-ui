import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import { Component } from "@angular/core"

// The React example drives dir from the language-selector translations (ar);
// the glyphs are language-neutral so dir="rtl" alone renders the same state.
// apps/v4/examples/base/kbd-rtl.tsx
@Component({
  selector: "preview-kbd-rtl",
  standalone: true,
  imports: [Kbd, KbdGroup],
  template: `<div class="flex flex-col items-center gap-4" dir="rtl">
    <span uiKbdGroup
      ><kbd uiKbd>⌘</kbd><kbd uiKbd>⇧</kbd><kbd uiKbd>⌥</kbd
      ><kbd uiKbd>⌃</kbd></span
    >
    <span uiKbdGroup><kbd uiKbd>Ctrl</kbd><span>+</span><kbd uiKbd>B</kbd></span>
  </div>`,
})
export class KbdRtlComponent {}

export default KbdRtlComponent

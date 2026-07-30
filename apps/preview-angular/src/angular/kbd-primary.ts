import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"
import { KbdComponent, KbdGroupComponent } from "@/angular-ui/kbd"

@Component({
  selector: "preview-kbd-primary",
  standalone: true,
  imports: [ButtonComponent, KbdComponent, KbdGroupComponent],
  template: `
    <div class="flex items-center gap-4">
      <kbd uiKbd variant="default">⌘K</kbd>
      <button uiButton>
        Open palette
        <span uiKbdGroup data-icon="inline-end">
          <kbd uiKbd variant="primary">⌘</kbd>
          <kbd uiKbd variant="primary">K</kbd>
        </span>
      </button>
    </div>
  `,
})
export default class KbdPrimaryComponent {}

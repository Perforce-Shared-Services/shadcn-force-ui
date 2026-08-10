import { Button } from "@/ui/button"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-demo",
  standalone: true,
  imports: [Button],
  template: `<div class="flex flex-wrap items-center gap-2">
    <button uiButton variant="outline">Button</button
    ><button uiButton variant="outline" size="icon" aria-label="Submit">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"
        />
      </svg>
    </button>
  </div>`,
})
export class ButtonDemoComponent {}

export default ButtonDemoComponent

import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

// apps/v4/examples/base/button-rounded.tsx — rounded-full override on default
// and icon buttons; ArrowUpIcon = Material Symbols arrow_upward.
@Component({
  selector: "preview-button-rounded",
  standalone: true,
  imports: [Button],
  template: `<div class="flex gap-2">
    <button uiButton class="rounded-full">Get Started</button>
    <button uiButton variant="outline" size="icon" class="rounded-full">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M450-686 223-459q-9 9-21 9t-21-9q-9-9-9-21t9-21l278-278q5-5 10-7t11-2q6 0 11 2t10 7l278 278q9 9 9 21t-9 21q-9 9-21 9t-21-9L510-686v496q0 13-8.5 21.5T480-160q-13 0-21.5-8.5T450-190v-496Z"
        />
      </svg>
    </button>
  </div>`,
})
export class ButtonRoundedComponent {}

export default ButtonRoundedComponent

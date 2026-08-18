import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-group-demo",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `<div uiButtonGroup>
    <div uiButtonGroup class="hidden sm:flex">
      <button uiButton variant="outline" size="icon" aria-label="Go Back">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
    </div>
    <div uiButtonGroup>
      <button uiButton variant="outline">Archive</button>
      <button uiButton variant="outline">Report</button>
    </div>
    <div uiButtonGroup>
      <button uiButton variant="outline">Snooze</button>
      <button uiButton variant="outline" size="icon" aria-label="More Options">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
          />
        </svg>
      </button>
    </div>
  </div>`,
})
export class ButtonGroupDemoComponent {}

export default ButtonGroupDemoComponent

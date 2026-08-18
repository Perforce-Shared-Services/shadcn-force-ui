import { Button } from "@/ui/button"
import { ButtonGroup } from "@/ui/button-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-group-orientation",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `<div
    uiButtonGroup
    orientation="vertical"
    aria-label="Media controls"
    class="h-fit"
  >
    <button uiButton variant="outline" size="icon" aria-label="Increase">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </button>
    <button uiButton variant="outline" size="icon" aria-label="Decrease">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M200-440v-80h560v80H200Z" />
      </svg>
    </button>
  </div>`,
})
export class ButtonGroupOrientationComponent {}

export default ButtonGroupOrientationComponent

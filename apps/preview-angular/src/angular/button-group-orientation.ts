import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"

@Component({
  selector: "preview-button-group-orientation",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `
    <div uiButtonGroup orientation="vertical" aria-label="Media controls" class="h-fit">
      <button uiButton variant="outline" size="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
        </svg>
      </button>
      <button uiButton variant="outline" size="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M200-450v-60h560v60H200Z"/>
        </svg>
      </button>
    </div>
  `,
})
export class ButtonGroupOrientationComponent {}

export default ButtonGroupOrientationComponent

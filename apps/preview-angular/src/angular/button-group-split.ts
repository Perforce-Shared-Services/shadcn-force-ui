import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/angular-ui/button-group"

@Component({
  selector: "preview-button-group-split",
  standalone: true,
  imports: [Button, ButtonGroup, ButtonGroupSeparator],
  template: `
    <div uiButtonGroup>
      <button uiButton variant="secondary">Button</button>
      <div uiButtonGroupSeparator></div>
      <button uiButton variant="secondary" size="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
        </svg>
      </button>
    </div>
  `,
})
export class ButtonGroupSplitComponent {}

export default ButtonGroupSplitComponent

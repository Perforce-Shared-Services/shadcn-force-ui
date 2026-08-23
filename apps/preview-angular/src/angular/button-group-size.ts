import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"

@Component({
  selector: "preview-button-group-size",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `
    <div class="flex flex-col items-start gap-8">
      <div uiButtonGroup>
        <button uiButton variant="outline" size="sm">Small</button>
        <button uiButton variant="outline" size="sm">Button</button>
        <button uiButton variant="outline" size="sm">Group</button>
        <button uiButton variant="outline" size="icon-sm">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
          </svg>
        </button>
      </div>
      <div uiButtonGroup>
        <button uiButton variant="outline">Default</button>
        <button uiButton variant="outline">Button</button>
        <button uiButton variant="outline">Group</button>
        <button uiButton variant="outline" size="icon">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
          </svg>
        </button>
      </div>
      <div uiButtonGroup>
        <button uiButton variant="outline" size="lg">Large</button>
        <button uiButton variant="outline" size="lg">Button</button>
        <button uiButton variant="outline" size="lg">Group</button>
        <button uiButton variant="outline" size="icon-lg">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class ButtonGroupSizeComponent {}

export default ButtonGroupSizeComponent

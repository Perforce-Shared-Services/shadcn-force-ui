import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/angular-ui/input-group"

// TODO(port): Tooltip is not ported yet (Wave 2) — the addon icon is rendered
// without its "Voice Mode" tooltip.
@Component({
  selector: "preview-button-group-nested",
  standalone: true,
  imports: [Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupInput],
  template: `
    <div uiButtonGroup>
      <div uiButtonGroup>
        <button uiButton variant="outline" size="icon">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
          </svg>
        </button>
      </div>
      <div uiButtonGroup>
        <div uiInputGroup>
          <input uiInputGroupInput placeholder="Send a message..." />
          <div uiInputGroupAddon align="inline-end">
            <!-- TODO(port): wrap in uiTooltip once Wave 2 lands -->
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M285-240v-480h60v480h-60ZM450-80v-800h60v800h-60ZM120-400v-160h60v160h-60Zm495 160v-480h60v480h-60Zm165-160v-160h60v160h-60Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ButtonGroupNestedComponent {}

export default ButtonGroupNestedComponent

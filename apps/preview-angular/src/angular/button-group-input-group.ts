import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/angular-ui/input-group"

// TODO(port): Tooltip is not ported yet (Wave 2) — the voice-mode button is
// rendered without its "Voice Mode" tooltip.
@Component({
  selector: "preview-button-group-input-group",
  standalone: true,
  imports: [Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput],
  template: `
    <div uiButtonGroup class="[--radius:9999rem]">
      <div uiButtonGroup>
        <button uiButton variant="outline" size="icon">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
          </svg>
        </button>
      </div>
      <div uiButtonGroup>
        <div uiInputGroup>
          <input
            uiInputGroupInput
            [placeholder]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
            [disabled]="voiceEnabled()"
          />
          <div uiInputGroupAddon align="inline-end">
            <!-- TODO(port): wrap in uiTooltip once Wave 2 lands -->
            <button
              uiInputGroupButton
              size="icon-xs"
              (click)="voiceEnabled.set(!voiceEnabled())"
              [attr.data-active]="voiceEnabled()"
              [attr.aria-pressed]="voiceEnabled()"
              class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M285-240v-480h60v480h-60ZM450-80v-800h60v800h-60ZM120-400v-160h60v160h-60Zm495 160v-480h60v480h-60Zm165-160v-160h60v160h-60Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ButtonGroupInputGroupComponent {
  readonly voiceEnabled = signal(false)
}

export default ButtonGroupInputGroupComponent

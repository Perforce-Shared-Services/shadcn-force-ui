import { Component } from "@angular/core"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/angular-ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

// apps/v4/examples/base/input-group-tooltip.tsx
@Component({
  selector: "preview-input-group-tooltip",
  standalone: true,
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Tooltip,
    TooltipTrigger,
    TooltipPortal,
    TooltipPositioner,
    TooltipContent,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Enter password" type="password" />
        <div uiInputGroupAddon align="inline-end">
          <div uiTooltip>
            <button uiInputGroupButton variant="ghost" aria-label="Info" size="icon-xs" uiTooltipTrigger type="button">
              <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
              </svg>
            </button>
            <ng-template uiTooltipPortal>
              <div uiTooltipPositioner side="top">
                <div uiTooltipContent><p>Password must be at least 8 characters</p></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Your email address" />
        <div uiInputGroupAddon align="inline-end">
          <div uiTooltip>
            <button uiInputGroupButton variant="ghost" aria-label="Help" size="icon-xs" uiTooltipTrigger type="button">
              <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30.5T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T491-513q-45 40-47 59t-2 60Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-157T197-764q54-53 127-84.5T480-880q84 0 157 31.5T764-764q53 54 84.5 127T880-480q0 83-31.5 156T764-197q-54 54-127 85.5T480-80Z"/>
              </svg>
            </button>
            <ng-template uiTooltipPortal>
              <div uiTooltipPositioner side="top">
                <div uiTooltipContent><p>We'll use this to send you notifications</p></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Enter API key" />
        <div uiTooltip>
          <div uiTooltipTrigger>
            <div uiInputGroupAddon align="inline-end">
              <button uiInputGroupButton variant="ghost" aria-label="Help" size="icon-xs" type="button">
                <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30.5T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T491-513q-45 40-47 59t-2 60Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-157T197-764q54-53 127-84.5T480-880q84 0 157 31.5T764-764q53 54 84.5 127T880-480q0 83-31.5 156T764-197q-54 54-127 85.5T480-80Z"/>
                </svg>
              </button>
            </div>
          </div>
          <ng-template uiTooltipPortal>
            <div uiTooltipPositioner side="left">
              <div uiTooltipContent><p>Click for help with API keys</p></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupTooltipComponent {}

export default InputGroupTooltipComponent

import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

// The trigger rides a wrapper <span> around a disabled button: a disabled
// button emits no pointer events, so the span is what receives hover/focus —
// same structure as the React example's render={<span/>}.
@Component({
  selector: "preview-tooltip-disabled",
  standalone: true,
  imports: [Button, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div uiTooltip>
      <span class="inline-block w-fit" uiTooltipTrigger>
        <button uiButton variant="outline" disabled type="button">Disabled</button>
      </span>
      <ng-template uiTooltipPortal>
        <div uiTooltipPositioner side="top">
          <div uiTooltipContent><p>This feature is currently unavailable</p></div>
        </div>
      </ng-template>
    </div>
  `,
})
export class TooltipDisabledComponent {}

export default TooltipDisabledComponent

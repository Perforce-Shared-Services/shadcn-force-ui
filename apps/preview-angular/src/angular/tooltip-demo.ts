import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

@Component({
  selector: "preview-tooltip-demo",
  standalone: true,
  imports: [Button, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div uiTooltip>
      <button uiButton variant="outline" uiTooltipTrigger type="button">Hover</button>
      <ng-template uiTooltipPortal>
        <div uiTooltipPositioner side="top">
          <div uiTooltipContent><p>Add to library</p></div>
        </div>
      </ng-template>
    </div>
  `,
})
export class TooltipDemoComponent {}

export default TooltipDemoComponent

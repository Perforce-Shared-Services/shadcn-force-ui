import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

// The React example maps over the four physical sides; Angular templates have no
// inline maps over component trees, so each side is written out explicitly.
@Component({
  selector: "preview-tooltip-sides",
  standalone: true,
  imports: [Button, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div class="flex flex-wrap gap-2">
      <div uiTooltip>
        <button uiButton variant="outline" class="w-fit capitalize" uiTooltipTrigger type="button">left</button>
        <ng-template uiTooltipPortal>
          <div uiTooltipPositioner side="left">
            <div uiTooltipContent><p>Add to library</p></div>
          </div>
        </ng-template>
      </div>
      <div uiTooltip>
        <button uiButton variant="outline" class="w-fit capitalize" uiTooltipTrigger type="button">top</button>
        <ng-template uiTooltipPortal>
          <div uiTooltipPositioner side="top">
            <div uiTooltipContent><p>Add to library</p></div>
          </div>
        </ng-template>
      </div>
      <div uiTooltip>
        <button uiButton variant="outline" class="w-fit capitalize" uiTooltipTrigger type="button">bottom</button>
        <ng-template uiTooltipPortal>
          <div uiTooltipPositioner side="bottom">
            <div uiTooltipContent><p>Add to library</p></div>
          </div>
        </ng-template>
      </div>
      <div uiTooltip>
        <button uiButton variant="outline" class="w-fit capitalize" uiTooltipTrigger type="button">right</button>
        <ng-template uiTooltipPortal>
          <div uiTooltipPositioner side="right">
            <div uiTooltipContent><p>Add to library</p></div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class TooltipSidesComponent {}

export default TooltipSidesComponent

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"
import { Component } from "@angular/core"

// apps/v4/examples/base/kbd-tooltip.tsx
@Component({
  selector: "preview-kbd-tooltip",
  standalone: true,
  imports: [Button, ButtonGroup, Kbd, KbdGroup, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div class="flex flex-wrap gap-4">
      <div uiButtonGroup>
        <div uiTooltip>
          <button uiButton variant="outline" uiTooltipTrigger type="button">Save</button>
          <ng-template uiTooltipPortal>
            <div uiTooltipPositioner side="top" alignOffset="-4">
              <div uiTooltipContent>
                Save Changes <kbd uiKbd>S</kbd>
              </div>
            </div>
          </ng-template>
        </div>
        <div uiTooltip>
          <button uiButton variant="outline" uiTooltipTrigger type="button">Print</button>
          <ng-template uiTooltipPortal>
            <div uiTooltipPositioner side="top" alignOffset="-4">
              <div uiTooltipContent>
                Print Document<span uiKbdGroup><kbd uiKbd>Ctrl</kbd><kbd uiKbd>P</kbd></span>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class KbdTooltipComponent {}

export default KbdTooltipComponent

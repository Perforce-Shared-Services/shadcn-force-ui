import { Bubble, BubbleContent, BubbleReactions } from "@/angular-ui/bubble"
import { Button } from "@/angular-ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-tooltip.tsx
// Material Symbols check — fill-based inline SVG (decorative).
@Component({
  selector: "preview-bubble-tooltip",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleReactions, Button, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4 py-12">
      <div uiBubble variant="secondary"><div uiBubbleContent>Did you remove the stale route?</div></div>
      <div uiBubble align="end">
        <div uiBubbleContent>Yes, removed it from the registry.</div>
        <div uiBubbleReactions>
          <div uiTooltip>
            <button uiButton variant="ghost" size="icon-xs" uiTooltipTrigger type="button" aria-label="Read">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-4" aria-hidden="true"><path d="M382-240 154-468l57-57 171 171 367-367 57 58-424 423Z"/></svg>
            </button>
            <ng-template uiTooltipPortal>
              <div uiTooltipPositioner side="top">
                <div uiTooltipContent><p>Read on Jan 5, 2026 at 4:32 PM</p></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BubbleTooltipComponent {}

export default BubbleTooltipComponent

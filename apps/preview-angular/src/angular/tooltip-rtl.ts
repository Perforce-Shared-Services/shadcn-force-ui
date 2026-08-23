import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" on each positioner render the same
// visual state, including the logical sides (inline-start / inline-end).
@Component({
  selector: "preview-tooltip-rtl",
  standalone: true,
  imports: [Button, Tooltip, TooltipTrigger, TooltipPortal, TooltipPositioner, TooltipContent],
  template: `
    <div class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        @for (s of physical; track s.side) {
          <div uiTooltip>
            <button uiButton variant="outline" uiTooltipTrigger type="button">{{ s.label }}</button>
            <ng-template uiTooltipPortal>
              <div uiTooltipPositioner [side]="s.side" dir="rtl">
                <div uiTooltipContent><p>إضافة إلى المكتبة</p></div>
              </div>
            </ng-template>
          </div>
        }
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        @for (s of logical; track s.side) {
          <div uiTooltip>
            <button uiButton variant="outline" uiTooltipTrigger type="button">{{ s.label }}</button>
            <ng-template uiTooltipPortal>
              <div uiTooltipPositioner [side]="s.side" dir="rtl">
                <div uiTooltipContent><p>إضافة إلى المكتبة</p></div>
              </div>
            </ng-template>
          </div>
        }
      </div>
    </div>
  `,
})
export class TooltipRtlComponent {
  protected readonly physical = [
    { side: "left", label: "يسار" },
    { side: "top", label: "لأعلى" },
    { side: "bottom", label: "لأسفل" },
    { side: "right", label: "يمين" },
  ] as const

  protected readonly logical = [
    { side: "inline-start", label: "بداية السطر" },
    { side: "inline-end", label: "نهاية السطر" },
  ] as const
}

export default TooltipRtlComponent

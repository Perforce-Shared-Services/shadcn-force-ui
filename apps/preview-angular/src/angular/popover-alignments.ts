import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverPortal,
  PopoverTrigger,
} from "@/angular-ui/popover"

@Component({
  selector: "preview-popover-alignments",
  standalone: true,
  imports: [Button, Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent],
  template: `
    <div class="flex gap-6">
      <div uiPopover>
        <button uiButton variant="outline" size="sm" uiPopoverTrigger type="button">Start</button>
        <ng-template uiPopoverPortal>
          <div uiPopoverPositioner side="bottom" align="start" [sideOffset]="4">
            <div uiPopoverContent class="w-40">Aligned to start</div>
          </div>
        </ng-template>
      </div>
      <div uiPopover>
        <button uiButton variant="outline" size="sm" uiPopoverTrigger type="button">Center</button>
        <ng-template uiPopoverPortal>
          <div uiPopoverPositioner side="bottom" align="center" [sideOffset]="4">
            <div uiPopoverContent class="w-40">Aligned to center</div>
          </div>
        </ng-template>
      </div>
      <div uiPopover>
        <button uiButton variant="outline" size="sm" uiPopoverTrigger type="button">End</button>
        <ng-template uiPopoverPortal>
          <div uiPopoverPositioner side="bottom" align="end" [sideOffset]="4">
            <div uiPopoverContent class="w-40">Aligned to end</div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class PopoverAlignmentsComponent {}

export default PopoverAlignmentsComponent

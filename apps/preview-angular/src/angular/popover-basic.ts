import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPositioner,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from "@/angular-ui/popover"

@Component({
  selector: "preview-popover-basic",
  standalone: true,
  imports: [Button, Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription],
  template: `
    <div uiPopover>
      <button uiButton variant="outline" class="w-fit" uiPopoverTrigger type="button">
        Open Popover
      </button>
      <ng-template uiPopoverPortal>
        <div uiPopoverPositioner side="bottom" align="start" [sideOffset]="4">
          <div uiPopoverContent>
            <div uiPopoverHeader>
              <div uiPopoverTitle>Dimensions</div>
              <p uiPopoverDescription>Set the dimensions for the layer.</p>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class PopoverBasicComponent {}

export default PopoverBasicComponent

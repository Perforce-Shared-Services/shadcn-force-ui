import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverPortal,
  PopoverTrigger,
} from "@/angular-ui/popover"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"

@Component({
  selector: "preview-popover-demo",
  standalone: true,
  imports: [Button, Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent, Label, Input],
  template: `
    <div uiPopover>
      <button uiButton variant="outline" uiPopoverTrigger type="button">
        Open popover
      </button>
      <ng-template uiPopoverPortal>
        <div uiPopoverPositioner side="bottom" align="center" [sideOffset]="4">
          <div uiPopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="leading-none font-medium">Dimensions</h4>
                <p class="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <label uiLabel for="popover-demo-width">Width</label>
                  <input uiInput id="popover-demo-width" value="100%" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label uiLabel for="popover-demo-max-width">Max. width</label>
                  <input uiInput id="popover-demo-max-width" value="300px" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label uiLabel for="popover-demo-height">Height</label>
                  <input uiInput id="popover-demo-height" value="25px" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label uiLabel for="popover-demo-max-height">Max. height</label>
                  <input uiInput id="popover-demo-max-height" value="none" class="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class PopoverDemoComponent {}

export default PopoverDemoComponent

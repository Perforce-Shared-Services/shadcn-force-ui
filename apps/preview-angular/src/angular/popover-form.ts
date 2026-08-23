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
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"

@Component({
  selector: "preview-popover-form",
  standalone: true,
  imports: [Button, Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, Field, FieldGroup, FieldLabel, Input],
  template: `
    <div uiPopover>
      <button uiButton variant="outline" uiPopoverTrigger type="button">
        Open Popover
      </button>
      <ng-template uiPopoverPortal>
        <div uiPopoverPositioner side="bottom" align="start" [sideOffset]="4">
          <div uiPopoverContent class="w-64">
            <div uiPopoverHeader>
              <div uiPopoverTitle>Dimensions</div>
              <p uiPopoverDescription>Set the dimensions for the layer.</p>
            </div>
            <div uiFieldGroup class="gap-4">
              <div uiField orientation="horizontal">
                <label uiFieldLabel for="popover-form-width" class="w-1/2">Width</label>
                <input uiInput id="popover-form-width" value="100%" />
              </div>
              <div uiField orientation="horizontal">
                <label uiFieldLabel for="popover-form-height" class="w-1/2">Height</label>
                <input uiInput id="popover-form-height" value="25px" />
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class PopoverFormComponent {}

export default PopoverFormComponent

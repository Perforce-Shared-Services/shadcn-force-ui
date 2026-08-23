import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/angular-ui/popover"
import { Textarea } from "@/angular-ui/textarea"

// apps/v4/examples/base/button-group-popover.tsx
// Material Symbols `smart_toy` — the React example's BotIcon.
const BOT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M147-376q-45 0-76-31.21T40-483q0-44.58 31.21-75.79Q102.42-590 147-590v-123q0-24 18-42t42-18h166q0-45 31-76t76-31q45 0 76 31.21T587-773h166q24 0 42 18t18 42v123q45 0 76 31.21T920-483q0 44.58-31.21 75.79Q857.58-376 813-376v196q0 24-18 42t-42 18H207q-24 0-42-18t-18-42v-196Zm224.5-111.74q11.5-11.73 11.5-28.5 0-16.76-11.74-28.26-11.73-11.5-28.5-11.5-16.76 0-28.26 11.74-11.5 11.73-11.5 28.5 0 16.76 11.74 28.26 11.73 11.5 28.5 11.5 16.76 0 28.26-11.74Zm274 0q11.5-11.73 11.5-28.5 0-16.76-11.74-28.26-11.73-11.5-28.5-11.5-16.76 0-28.26 11.74-11.5 11.73-11.5 28.5 0 16.76 11.74 28.26 11.73 11.5 28.5 11.5 16.76 0 28.26-11.74ZM312-285h336v-60H312v60ZM207-180h546v-533H207v533Zm273-267Z"/></svg>'

@Component({
  selector: "preview-button-group-popover",
  standalone: true,
  imports: [
    Button,
    ButtonGroup,
    Field,
    FieldLabel,
    FieldDescription,
    Popover,
    PopoverTrigger,
    PopoverPortal,
    PopoverPositioner,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
    Textarea,
  ],
  template: `<div uiButtonGroup>
    <button uiButton variant="outline">
      <span class="size-4" [innerHTML]="bot"></span>
      Copilot
    </button>
    <div uiPopover>
      <button uiButton variant="outline" size="icon" aria-label="Open Popover" uiPopoverTrigger type="button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z"/>
        </svg>
      </button>
      <ng-template uiPopoverPortal>
        <div uiPopoverPositioner align="end" [sideOffset]="4">
          <div uiPopoverContent class="rounded-xl text-sm">
            <div uiPopoverHeader>
              <div uiPopoverTitle>Start a new task with Copilot</div>
              <p uiPopoverDescription>
                Describe your task in natural language.
              </p>
            </div>
            <div uiField>
              <label uiFieldLabel for="task" class="sr-only">Task Description</label>
              <textarea
                uiTextarea
                id="task"
                placeholder="I need to..."
                class="resize-none"
              ></textarea>
              <p uiFieldDescription>
                Copilot will open a pull request for review.
              </p>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  </div>`,
})
export class ButtonGroupPopoverComponent {
  protected readonly bot = BOT_SVG
}

export default ButtonGroupPopoverComponent

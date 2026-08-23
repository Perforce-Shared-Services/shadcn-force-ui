import { Bubble, BubbleContent, BubbleReactions } from "@/angular-ui/bubble"
import { Button } from "@/angular-ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/angular-ui/popover"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-popover.tsx
// Material Symbols info — fill-based inline SVG (decorative).
@Component({
  selector: "preview-bubble-popover",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleReactions, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4 py-12">
      <div uiBubble align="end"><div uiBubbleContent>Run the build script.</div></div>
      <div uiBubble variant="destructive">
        <div uiBubbleContent>Failed to run the command.</div>
        <div uiBubbleReactions>
          <div uiPopover>
            <button uiButton variant="ghost" size="icon-xs" uiPopoverTrigger type="button" aria-label="Show error details" class="aria-expanded:text-destructive">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-4" aria-hidden="true"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </button>
            <ng-template uiPopoverPortal>
              <div uiPopoverPositioner align="start" sideOffset="4">
                <div uiPopoverContent>
                  <div uiPopoverHeader>
                    <div uiPopoverTitle class="text-sm">Command failed with exit code 1</div>
                    <div uiPopoverDescription class="text-sm">ENOENT: no such file or directory, open pnpm-lock.yaml</div>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BubblePopoverComponent {}

export default BubblePopoverComponent

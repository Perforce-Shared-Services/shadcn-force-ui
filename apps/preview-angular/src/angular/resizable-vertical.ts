import { Component } from "@angular/core"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/angular-ui/resizable"

@Component({
  selector: "preview-resizable-vertical",
  standalone: true,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <div
      uiResizablePanelGroup
      direction="vertical"
      class="min-h-[200px] max-w-sm rounded-lg border"
    >
      <div uiResizablePanel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </div>
      <div uiResizableHandle></div>
      <div uiResizablePanel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  `,
})
export class ResizableVerticalComponent {}

export default ResizableVerticalComponent

import { Component } from "@angular/core"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/angular-ui/resizable"

@Component({
  selector: "preview-resizable-handle",
  standalone: true,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <div
      uiResizablePanelGroup
      direction="horizontal"
      class="min-h-[200px] max-w-sm rounded-lg border"
    >
      <div uiResizablePanel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div uiResizableHandle withHandle></div>
      <div uiResizablePanel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  `,
})
export class ResizableHandleDemoComponent {}

export default ResizableHandleDemoComponent

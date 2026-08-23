import { Component } from "@angular/core"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/angular-ui/resizable"

@Component({
  selector: "preview-resizable-demo",
  standalone: true,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <div
      uiResizablePanelGroup
      direction="horizontal"
      class="max-w-sm rounded-lg border"
    >
      <div uiResizablePanel [defaultSize]="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div uiResizableHandle withHandle></div>
      <div uiResizablePanel [defaultSize]="50">
        <div uiResizablePanelGroup direction="vertical" class="h-full">
          <div uiResizablePanel [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </div>
          <div uiResizableHandle withHandle></div>
          <div uiResizablePanel [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResizableDemoComponent {}

export default ResizableDemoComponent

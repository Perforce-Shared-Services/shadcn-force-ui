import { Component } from "@angular/core"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/angular-ui/resizable"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-resizable-rtl",
  standalone: true,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <div
      uiResizablePanelGroup
      direction="horizontal"
      dir="rtl"
      class="max-w-sm rounded-lg border"
    >
      <div uiResizablePanel [defaultSize]="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">واحد</span>
        </div>
      </div>
      <div uiResizableHandle withHandle></div>
      <div uiResizablePanel [defaultSize]="50">
        <div uiResizablePanelGroup direction="vertical" dir="rtl" class="h-full">
          <div uiResizablePanel [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">اثنان</span>
            </div>
          </div>
          <div uiResizableHandle withHandle></div>
          <div uiResizablePanel [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">ثلاثة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResizableRtlComponent {}

export default ResizableRtlComponent

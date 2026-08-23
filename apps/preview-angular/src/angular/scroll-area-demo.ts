import { Component } from "@angular/core"

import { Separator } from "@/angular-ui/separator"
import { ScrollArea } from "@/angular-ui/scroll-area"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

@Component({
  selector: "preview-scroll-area-demo",
  standalone: true,
  imports: [ScrollArea, Separator],
  template: `<div uiScrollArea class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
      @for (tag of tags; track tag) {
        <div class="text-sm">{{ tag }}</div>
        <div uiSeparator class="my-2"></div>
      }
    </div>
  </div>`,
})
export class ScrollAreaDemoComponent {}

export default ScrollAreaDemoComponent

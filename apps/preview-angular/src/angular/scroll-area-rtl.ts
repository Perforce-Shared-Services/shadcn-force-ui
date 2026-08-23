import { Component } from "@angular/core"

import { Separator } from "@/angular-ui/separator"
import { ScrollArea } from "@/angular-ui/scroll-area"

// The React RTL example drives dir/labels from the language-selector
// translations (ar). Static Arabic labels + dir="rtl" render the same state.
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

@Component({
  selector: "preview-scroll-area-rtl",
  standalone: true,
  imports: [ScrollArea, Separator],
  template: `<div uiScrollArea dir="rtl" class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm leading-none font-medium">العلامات</h4>
      @for (tag of tags; track tag) {
        <div class="text-sm">{{ tag }}</div>
        <div uiSeparator class="my-2"></div>
      }
    </div>
  </div>`,
})
export class ScrollAreaRtlComponent {}

export default ScrollAreaRtlComponent

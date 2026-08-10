import { Separator } from "@/ui/separator"
import { Component } from "@angular/core"

@Component({
  selector: "preview-separator-vertical",
  standalone: true,
  imports: [Separator],
  template: `<div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <div uiSeparator orientation="vertical"></div>
    <div>Docs</div>
    <div uiSeparator orientation="vertical"></div>
    <div>Source</div>
  </div>`,
})
export class SeparatorVerticalComponent {}

export default SeparatorVerticalComponent

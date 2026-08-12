import { Separator } from "@/ui/separator"
import { Component } from "@angular/core"

@Component({
  selector: "preview-separator-demo",
  standalone: true,
  imports: [Separator],
  template: `<div>
    <div class="space-y-1">
      <h4 class="text-sm leading-none font-medium">Radix Primitives</h4>
      <p class="text-sm text-muted-foreground">
        An open-source UI component library.
      </p>
    </div>
    <div uiSeparator class="my-4"></div>
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Docs</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Source</div>
    </div>
  </div>`,
})
export class SeparatorDemoComponent {}

export default SeparatorDemoComponent

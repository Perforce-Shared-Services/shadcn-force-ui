import { Component } from "@angular/core"
import { SeparatorComponent } from "@/angular-ui/separator"

@Component({
  selector: "preview-separator-demo",
  standalone: true,
  imports: [SeparatorComponent],
  template: `
    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <div uiSeparator class="my-4"></div>
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <div uiSeparator orientation="vertical"></div>
        <div>Docs</div>
        <div uiSeparator orientation="vertical"></div>
        <div>Source</div>
      </div>
    </div>
  `,
})
export default class SeparatorDemoComponent {}

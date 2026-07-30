import { Component } from "@angular/core"
import { SeparatorComponent } from "@/angular-ui/separator"

@Component({
  selector: "preview-separator-vertical",
  standalone: true,
  imports: [SeparatorComponent],
  template: `
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Docs</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Source</div>
    </div>
  `,
})
export default class SeparatorVerticalComponent {}

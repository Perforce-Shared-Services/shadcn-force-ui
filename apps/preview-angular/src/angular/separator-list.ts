import { Component } from "@angular/core"

import { Separator } from "@/angular-ui/separator"

// apps/v4/examples/base/separator-list.tsx — definition-list rows divided by
// horizontal separators.
@Component({
  selector: "preview-separator-list",
  standalone: true,
  imports: [Separator],
  template: `<div class="flex w-full max-w-sm flex-col gap-2 text-sm">
    <dl class="flex items-center justify-between">
      <dt>Item 1</dt>
      <dd class="text-muted-foreground">Value 1</dd>
    </dl>
    <div uiSeparator></div>
    <dl class="flex items-center justify-between">
      <dt>Item 2</dt>
      <dd class="text-muted-foreground">Value 2</dd>
    </dl>
    <div uiSeparator></div>
    <dl class="flex items-center justify-between">
      <dt>Item 3</dt>
      <dd class="text-muted-foreground">Value 3</dd>
    </dl>
  </div>`,
})
export class SeparatorListComponent {}

export default SeparatorListComponent

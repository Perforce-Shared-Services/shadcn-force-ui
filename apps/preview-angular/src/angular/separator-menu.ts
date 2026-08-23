import { Component } from "@angular/core"

import { Separator } from "@/angular-ui/separator"

// apps/v4/examples/base/separator-menu.tsx — vertical separators between
// text columns; the third column collapses below md.
@Component({
  selector: "preview-separator-menu",
  standalone: true,
  imports: [Separator],
  template: `<div class="flex items-center gap-2 text-sm md:gap-4">
    <div class="flex flex-col gap-1">
      <span class="font-medium">Settings</span>
      <span class="text-xs text-muted-foreground">Manage preferences</span>
    </div>
    <div uiSeparator orientation="vertical" class="h-full"></div>
    <div class="flex flex-col gap-1">
      <span class="font-medium">Account</span>
      <span class="text-xs text-muted-foreground">Profile &amp; security</span>
    </div>
    <div uiSeparator orientation="vertical" class="hidden h-full md:block"></div>
    <div class="hidden flex-col gap-1 md:flex">
      <span class="font-medium">Help</span>
      <span class="text-xs text-muted-foreground">Support &amp; docs</span>
    </div>
  </div>`,
})
export class SeparatorMenuComponent {}

export default SeparatorMenuComponent

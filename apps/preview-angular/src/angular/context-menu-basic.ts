import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-basic.tsx
@Component({
  selector: "preview-context-menu-basic",
  standalone: true,
  imports: [ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem],
  template: `<div uiContextMenuRoot>
    <div
      uiContextMenuTrigger
      class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
    >
      <span class="hidden pointer-fine:inline-block">Right click here</span>
      <span class="hidden pointer-coarse:inline-block">Long press here</span>
    </div>
    <div uiContextMenuContent>
      <div uiContextMenuGroup>
        <button uiContextMenuItem>Back</button>
        <button uiContextMenuItem disabled>Forward</button>
        <button uiContextMenuItem>Reload</button>
      </div>
    </div>
  </div>`,
})
export class ContextMenuBasicComponent {}

export default ContextMenuBasicComponent

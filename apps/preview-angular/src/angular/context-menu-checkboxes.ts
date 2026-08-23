import { Component } from "@angular/core"

import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-checkboxes.tsx
@Component({
  selector: "preview-context-menu-checkboxes",
  standalone: true,
  imports: [ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuCheckboxItem],
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
        <button uiContextMenuCheckboxItem [checked]="true">
          Show Bookmarks Bar
        </button>
        <button uiContextMenuCheckboxItem>Show Full URLs</button>
        <button uiContextMenuCheckboxItem [checked]="true">
          Show Developer Tools
        </button>
      </div>
    </div>
  </div>`,
})
export class ContextMenuCheckboxesComponent {}

export default ContextMenuCheckboxesComponent

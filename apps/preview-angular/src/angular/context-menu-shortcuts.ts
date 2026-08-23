import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-shortcuts.tsx
@Component({
  selector: "preview-context-menu-shortcuts",
  standalone: true,
  imports: [
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuSeparator,
  ],
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
        <button uiContextMenuItem>
          Back
          <span uiContextMenuShortcut>⌘[</span>
        </button>
        <button uiContextMenuItem disabled>
          Forward
          <span uiContextMenuShortcut>⌘]</span>
        </button>
        <button uiContextMenuItem>
          Reload
          <span uiContextMenuShortcut>⌘R</span>
        </button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuItem>
          Save
          <span uiContextMenuShortcut>⌘S</span>
        </button>
        <button uiContextMenuItem>
          Save As...
          <span uiContextMenuShortcut>⇧⌘S</span>
        </button>
      </div>
    </div>
  </div>`,
})
export class ContextMenuShortcutsComponent {}

export default ContextMenuShortcutsComponent

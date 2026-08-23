import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-groups.tsx
@Component({
  selector: "preview-context-menu-groups",
  standalone: true,
  imports: [
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuLabel,
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
        <div uiContextMenuLabel>File</div>
        <button uiContextMenuItem>
          New File
          <span uiContextMenuShortcut>⌘N</span>
        </button>
        <button uiContextMenuItem>
          Open File
          <span uiContextMenuShortcut>⌘O</span>
        </button>
        <button uiContextMenuItem>
          Save
          <span uiContextMenuShortcut>⌘S</span>
        </button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <div uiContextMenuLabel>Edit</div>
        <button uiContextMenuItem>
          Undo
          <span uiContextMenuShortcut>⌘Z</span>
        </button>
        <button uiContextMenuItem>
          Redo
          <span uiContextMenuShortcut>⇧⌘Z</span>
        </button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuItem>
          Cut
          <span uiContextMenuShortcut>⌘X</span>
        </button>
        <button uiContextMenuItem>
          Copy
          <span uiContextMenuShortcut>⌘C</span>
        </button>
        <button uiContextMenuItem>
          Paste
          <span uiContextMenuShortcut>⌘V</span>
        </button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuItem variant="destructive">
          Delete
          <span uiContextMenuShortcut>⌫</span>
        </button>
      </div>
    </div>
  </div>`,
})
export class ContextMenuGroupsComponent {}

export default ContextMenuGroupsComponent

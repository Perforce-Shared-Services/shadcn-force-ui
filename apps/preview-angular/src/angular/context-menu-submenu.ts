import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-submenu.tsx
@Component({
  selector: "preview-context-menu-submenu",
  standalone: true,
  imports: [
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
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
          Copy
          <span uiContextMenuShortcut>⌘C</span>
        </button>
        <button uiContextMenuItem>
          Cut
          <span uiContextMenuShortcut>⌘X</span>
        </button>
      </div>
      <div uiContextMenuSub>
        <button uiContextMenuSubTrigger>More Tools</button>
        <div uiContextMenuSubContent>
          <div uiContextMenuGroup>
            <button uiContextMenuItem>Save Page...</button>
            <button uiContextMenuItem>Create Shortcut...</button>
            <button uiContextMenuItem>Name Window...</button>
          </div>
          <div uiContextMenuSeparator></div>
          <div uiContextMenuGroup>
            <button uiContextMenuItem>Developer Tools</button>
          </div>
          <div uiContextMenuSeparator></div>
          <div uiContextMenuGroup>
            <button uiContextMenuItem variant="destructive">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class ContextMenuSubmenuComponent {}

export default ContextMenuSubmenuComponent

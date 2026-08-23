import { Component } from "@angular/core"

import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-demo.tsx
@Component({
  selector: "preview-context-menu-demo",
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
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuLabel,
  ],
  template: `<div uiContextMenuRoot>
    <div
      uiContextMenuTrigger
      class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
    >
      <span class="hidden pointer-fine:inline-block">Right click here</span>
      <span class="hidden pointer-coarse:inline-block">Long press here</span>
    </div>
    <div uiContextMenuContent class="w-48">
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
        <div uiContextMenuSub>
          <button uiContextMenuSubTrigger>More Tools</button>
          <div uiContextMenuSubContent class="w-44">
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
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuCheckboxItem [checked]="true">
          Show Bookmarks
        </button>
        <button uiContextMenuCheckboxItem>Show Full URLs</button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <div uiContextMenuRadioGroup value="pedro">
          <div uiContextMenuLabel>People</div>
          <button uiContextMenuRadioItem value="pedro">Pedro Duarte</button>
          <button uiContextMenuRadioItem value="colm">Colm Tuite</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class ContextMenuDemoComponent {}

export default ContextMenuDemoComponent

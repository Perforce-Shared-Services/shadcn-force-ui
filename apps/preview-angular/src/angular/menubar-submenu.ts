import { Component } from "@angular/core"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/angular-ui/menubar"

// apps/v4/examples/base/menubar-submenu.tsx
@Component({
  selector: "preview-menubar-submenu",
  standalone: true,
  imports: [
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarShortcut,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
  ],
  template: `<div uiMenubar class="w-72">
    <div uiMenubarMenu>
      <button uiMenubarTrigger>File</button>
      <div uiMenubarContent>
        <div uiMenubarSub>
          <button uiMenubarSubTrigger>Share</button>
          <div uiMenubarSubContent>
            <button uiMenubarItem>Email link</button>
            <button uiMenubarItem>Messages</button>
            <button uiMenubarItem>Notes</button>
          </div>
        </div>
        <div uiMenubarSeparator></div>
        <button uiMenubarItem>
          Print... <span uiMenubarShortcut>⌘P</span>
        </button>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Edit</button>
      <div uiMenubarContent>
        <button uiMenubarItem>
          Undo <span uiMenubarShortcut>⌘Z</span>
        </button>
        <button uiMenubarItem>
          Redo <span uiMenubarShortcut>⇧⌘Z</span>
        </button>
        <div uiMenubarSeparator></div>
        <div uiMenubarSub>
          <button uiMenubarSubTrigger>Find</button>
          <div uiMenubarSubContent>
            <button uiMenubarItem>Find...</button>
            <button uiMenubarItem>Find Next</button>
            <button uiMenubarItem>Find Previous</button>
          </div>
        </div>
        <div uiMenubarSeparator></div>
        <button uiMenubarItem>Cut</button>
        <button uiMenubarItem>Copy</button>
        <button uiMenubarItem>Paste</button>
      </div>
    </div>
  </div>`,
})
export class MenubarSubmenuComponent {}

export default MenubarSubmenuComponent

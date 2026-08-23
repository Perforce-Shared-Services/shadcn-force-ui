import { Component } from "@angular/core"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/angular-ui/menubar"

// apps/v4/examples/base/menubar-demo.tsx
@Component({
  selector: "preview-menubar-demo",
  standalone: true,
  imports: [
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarShortcut,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
  ],
  template: `<div uiMenubar class="w-72">
    <div uiMenubarMenu>
      <button uiMenubarTrigger>File</button>
      <div uiMenubarContent>
        <div uiMenubarGroup>
          <button uiMenubarItem>
            New Tab <span uiMenubarShortcut>⌘T</span>
          </button>
          <button uiMenubarItem>
            New Window <span uiMenubarShortcut>⌘N</span>
          </button>
          <button uiMenubarItem disabled>New Incognito Window</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <div uiMenubarSub>
            <button uiMenubarSubTrigger>Share</button>
            <div uiMenubarSubContent>
              <div uiMenubarGroup>
                <button uiMenubarItem>Email link</button>
                <button uiMenubarItem>Messages</button>
                <button uiMenubarItem>Notes</button>
              </div>
            </div>
          </div>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem>
            Print... <span uiMenubarShortcut>⌘P</span>
          </button>
        </div>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Edit</button>
      <div uiMenubarContent>
        <div uiMenubarGroup>
          <button uiMenubarItem>
            Undo <span uiMenubarShortcut>⌘Z</span>
          </button>
          <button uiMenubarItem>
            Redo <span uiMenubarShortcut>⇧⌘Z</span>
          </button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <div uiMenubarSub>
            <button uiMenubarSubTrigger>Find</button>
            <div uiMenubarSubContent>
              <div uiMenubarGroup>
                <button uiMenubarItem>Search the web</button>
              </div>
              <div uiMenubarSeparator></div>
              <div uiMenubarGroup>
                <button uiMenubarItem>Find...</button>
                <button uiMenubarItem>Find Next</button>
                <button uiMenubarItem>Find Previous</button>
              </div>
            </div>
          </div>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem>Cut</button>
          <button uiMenubarItem>Copy</button>
          <button uiMenubarItem>Paste</button>
        </div>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>View</button>
      <div uiMenubarContent class="w-44">
        <div uiMenubarGroup>
          <button uiMenubarCheckboxItem>Bookmarks Bar</button>
          <button uiMenubarCheckboxItem [checked]="true">Full URLs</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>
            Reload <span uiMenubarShortcut>⌘R</span>
          </button>
          <button uiMenubarItem inset disabled>
            Force Reload <span uiMenubarShortcut>⇧⌘R</span>
          </button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>Toggle Fullscreen</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>Hide Sidebar</button>
        </div>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Profiles</button>
      <div uiMenubarContent>
        <div uiMenubarRadioGroup value="benoit">
          <button uiMenubarRadioItem value="andy">Andy</button>
          <button uiMenubarRadioItem value="benoit">Benoit</button>
          <button uiMenubarRadioItem value="Luis">Luis</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>Edit...</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>Add Profile...</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class MenubarDemoComponent {}

export default MenubarDemoComponent

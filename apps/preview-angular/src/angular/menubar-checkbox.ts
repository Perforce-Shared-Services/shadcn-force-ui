import { Component, signal } from "@angular/core"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/angular-ui/menubar"

// apps/v4/examples/base/menubar-checkbox.tsx
@Component({
  selector: "preview-menubar-checkbox",
  standalone: true,
  imports: [
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarCheckboxItem,
    MenubarSeparator,
    MenubarItem,
    MenubarShortcut,
  ],
  template: `<div uiMenubar class="w-72">
    <div uiMenubarMenu>
      <button uiMenubarTrigger>View</button>
      <div uiMenubarContent class="w-64">
        <button uiMenubarCheckboxItem>Always Show Bookmarks Bar</button>
        <button uiMenubarCheckboxItem [checked]="true">
          Always Show Full URLs
        </button>
        <div uiMenubarSeparator></div>
        <button uiMenubarItem inset>
          Reload <span uiMenubarShortcut>⌘R</span>
        </button>
        <button uiMenubarItem inset disabled>
          Force Reload <span uiMenubarShortcut>⇧⌘R</span>
        </button>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Format</button>
      <div uiMenubarContent>
        <button uiMenubarCheckboxItem [(checked)]="strikethrough">Strikethrough</button>
        <button uiMenubarCheckboxItem [(checked)]="code">Code</button>
        <button uiMenubarCheckboxItem [(checked)]="superscript">Superscript</button>
      </div>
    </div>
  </div>`,
})
export class MenubarCheckboxComponent {
  protected readonly strikethrough = signal(true)
  protected readonly code = signal(false)
  protected readonly superscript = signal(false)
}

export default MenubarCheckboxComponent

import { Component, signal } from "@angular/core"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/angular-ui/menubar"

// apps/v4/examples/base/menubar-radio.tsx
@Component({
  selector: "preview-menubar-radio",
  standalone: true,
  imports: [
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarItem,
    MenubarSeparator,
  ],
  template: `<div uiMenubar class="w-72">
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Profiles</button>
      <div uiMenubarContent>
        <div uiMenubarRadioGroup [value]="user()" (valueChange)="user.set($event)">
          <button uiMenubarRadioItem value="andy">Andy</button>
          <button uiMenubarRadioItem value="benoit">Benoit</button>
          <button uiMenubarRadioItem value="luis">Luis</button>
        </div>
        <div uiMenubarSeparator></div>
        <button uiMenubarItem inset>Edit...</button>
        <button uiMenubarItem inset>Add Profile...</button>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>Theme</button>
      <div uiMenubarContent>
        <div uiMenubarRadioGroup [value]="theme()" (valueChange)="theme.set($event)">
          <button uiMenubarRadioItem value="light">Light</button>
          <button uiMenubarRadioItem value="dark">Dark</button>
          <button uiMenubarRadioItem value="system">System</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class MenubarRadioComponent {
  protected readonly user = signal("benoit")
  protected readonly theme = signal("system")
}

export default MenubarRadioComponent

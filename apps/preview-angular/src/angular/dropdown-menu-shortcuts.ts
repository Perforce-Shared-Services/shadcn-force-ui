import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-shortcuts.tsx
@Component({
  selector: "preview-dropdown-menu-shortcuts",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>My Account</div>
        <button uiDropdownMenuItem>
          Profile
          <span uiDropdownMenuShortcut>⇧⌘P</span>
        </button>
        <button uiDropdownMenuItem>
          Billing
          <span uiDropdownMenuShortcut>⌘B</span>
        </button>
        <button uiDropdownMenuItem>
          Settings
          <span uiDropdownMenuShortcut>⌘S</span>
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <button uiDropdownMenuItem>
        Log out
        <span uiDropdownMenuShortcut>⇧⌘Q</span>
      </button>
    </div>
  </div>`,
})
export class DropdownMenuShortcutsComponent {}

export default DropdownMenuShortcutsComponent

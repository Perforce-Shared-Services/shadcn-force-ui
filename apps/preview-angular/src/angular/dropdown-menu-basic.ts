import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-basic.tsx
@Component({
  selector: "preview-dropdown-menu-basic",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>My Account</div>
        <button uiDropdownMenuItem>Profile</button>
        <button uiDropdownMenuItem>Billing</button>
        <button uiDropdownMenuItem>Settings</button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <button uiDropdownMenuItem>GitHub</button>
      <button uiDropdownMenuItem>Support</button>
      <button uiDropdownMenuItem disabled>API</button>
    </div>
  </div>`,
})
export class DropdownMenuBasicComponent {}

export default DropdownMenuBasicComponent

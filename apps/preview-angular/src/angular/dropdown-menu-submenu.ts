import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-submenu.tsx
@Component({
  selector: "preview-dropdown-menu-submenu",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>Team</button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>Invite users</button>
          <div uiDropdownMenuSubContent>
            <button uiDropdownMenuItem>Email</button>
            <button uiDropdownMenuItem>Message</button>
            <div uiDropdownMenuSub>
              <button uiDropdownMenuSubTrigger>More options</button>
              <div uiDropdownMenuSubContent>
                <button uiDropdownMenuItem>Calendly</button>
                <button uiDropdownMenuItem>Slack</button>
                <div uiDropdownMenuSeparator></div>
                <button uiDropdownMenuItem>Webhook</button>
              </div>
            </div>
            <div uiDropdownMenuSeparator></div>
            <button uiDropdownMenuItem>Advanced...</button>
          </div>
        </div>
        <button uiDropdownMenuItem>
          New Team
          <span uiDropdownMenuShortcut>⌘+T</span>
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuSubmenuComponent {}

export default DropdownMenuSubmenuComponent

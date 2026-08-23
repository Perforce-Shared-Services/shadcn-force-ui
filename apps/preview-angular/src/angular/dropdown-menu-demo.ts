import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-demo.tsx
@Component({
  selector: "preview-dropdown-menu-demo",
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
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent class="w-40">
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
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>Team</button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>Invite users</button>
          <div uiDropdownMenuSubContent>
            <button uiDropdownMenuItem>Email</button>
            <button uiDropdownMenuItem>Message</button>
            <div uiDropdownMenuSeparator></div>
            <button uiDropdownMenuItem>More...</button>
          </div>
        </div>
        <button uiDropdownMenuItem>
          New Team
          <span uiDropdownMenuShortcut>⌘+T</span>
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>GitHub</button>
        <button uiDropdownMenuItem>Support</button>
        <button uiDropdownMenuItem disabled>API</button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>
          Log out
          <span uiDropdownMenuShortcut>⇧⌘Q</span>
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuDemoComponent {}

export default DropdownMenuDemoComponent

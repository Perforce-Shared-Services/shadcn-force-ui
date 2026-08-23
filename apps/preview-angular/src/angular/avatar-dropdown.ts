import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import { Component } from "@angular/core"

// apps/v4/examples/base/avatar-dropdown.tsx
@Component({
  selector: "preview-avatar-dropdown",
  standalone: true,
  imports: [
    Avatar,
    AvatarImage,
    AvatarFallback,
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
  ],
  template: `<div uiDropdownMenuRoot>
    <button
      uiButton
      variant="ghost"
      size="icon"
      class="rounded-full"
      uiDropdownMenuTrigger
    >
      <span uiAvatar>
        <img uiAvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <span uiAvatarFallback>CN</span>
      </span>
    </button>
    <div uiDropdownMenuContent class="w-32">
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>Profile</button>
        <button uiDropdownMenuItem>Billing</button>
        <button uiDropdownMenuItem>Settings</button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem variant="destructive">Log out</button>
      </div>
    </div>
  </div>`,
})
export class AvatarDropdownComponent {}

export default AvatarDropdownComponent

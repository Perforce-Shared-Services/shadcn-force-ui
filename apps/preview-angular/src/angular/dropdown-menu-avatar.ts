import { Component } from "@angular/core"

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

// apps/v4/examples/base/dropdown-menu-avatar.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const BADGE_CHECK = svg("m437-433-73-76q-9-10-22-10t-23 9q-10 10-10 23t10 23l97 96q9 9 21 9t21-9l183-182q9-9 9-22t-10-22q-9-8-21.5-7.5T598-593L437-433ZM332-84l-62-106-124-25q-11-2-18.5-12t-5.5-21l14-120-79-92q-8-8-8-20t8-20l79-91-14-120q-2-11 5.5-21t18.5-12l124-25 62-107q6-10 17-14t22 1l109 51 109-51q11-5 22-1.5t17 13.5l63 108 123 25q11 2 18.5 12t5.5 21l-14 120 79 91q8 8 8 20t-8 20l-79 92 14 120q2 11-5.5 21T814-215l-123 25-63 107q-6 10-17 13.5T589-71l-109-51-109 51q-11 5-22 1t-17-14Z")
const CREDIT_CARD = svg("M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z")
const BELL = svg("M190-200q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z")
const LOGOUT = svg("M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180Zm545-330H390q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h333l-81-81q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l133 133q9 9 9 21t-9 21L687-326q-8.8 9-20.9 8.5-12.1-.5-21.49-9.5-8.61-9-8.61-21.5t9-21.5l80-80Z")

@Component({
  selector: "preview-dropdown-menu-avatar",
  standalone: true,
  imports: [
    Button,
    Avatar,
    AvatarImage,
    AvatarFallback,
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
        <span uiAvatarFallback>LR</span>
      </span>
    </button>
    <div uiDropdownMenuContent class="w-56">
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="badgeCheck"></svg>
          Account
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="card"></svg>
          Billing
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="bell"></svg>
          Notifications
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <button uiDropdownMenuItem>
        <svg aria-hidden="true" focusable="false" [innerHTML]="logout"></svg>
        Sign Out
      </button>
    </div>
  </div>`,
})
export class DropdownMenuAvatarComponent {
  protected readonly badgeCheck = BADGE_CHECK
  protected readonly card = CREDIT_CARD
  protected readonly bell = BELL
  protected readonly logout = LOGOUT
}

export default DropdownMenuAvatarComponent

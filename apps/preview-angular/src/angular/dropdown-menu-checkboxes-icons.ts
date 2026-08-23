import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-checkboxes-icons.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const MAIL = svg("M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm680-525L496-473q-4 2-7.5 3.5T480-468q-5 0-8.5-1.5T464-473L140-685v465h680v-465ZM480-522l336-218H145l335 218Z")
const CHAT = svg("M240-240 131-131q-14 14-32.5 6.34Q80-132.31 80-152v-668q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240Zm-26-60h606v-520H140v600l74-80Zm-74 0v-520 520Zm130-99h253q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H270q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-130h420q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H270q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-130h420q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H270q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Z")
const BELL = svg("M190-200q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z")

@Component({
  selector: "preview-dropdown-menu-checkboxes-icons",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Notifications</button>
    <div uiDropdownMenuContent class="w-48">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>Notification Preferences</div>
        <button uiDropdownMenuCheckboxItem [(checked)]="email">
          <svg aria-hidden="true" focusable="false" [innerHTML]="mail"></svg>
          Email notifications
        </button>
        <button uiDropdownMenuCheckboxItem [(checked)]="sms">
          <svg aria-hidden="true" focusable="false" [innerHTML]="chat"></svg>
          SMS notifications
        </button>
        <button uiDropdownMenuCheckboxItem [(checked)]="push">
          <svg aria-hidden="true" focusable="false" [innerHTML]="bell"></svg>
          Push notifications
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuCheckboxesIconsComponent {
  protected readonly mail = MAIL
  protected readonly chat = CHAT
  protected readonly bell = BELL

  protected readonly email = signal(true)
  protected readonly sms = signal(false)
  protected readonly push = signal(true)
}

export default DropdownMenuCheckboxesIconsComponent

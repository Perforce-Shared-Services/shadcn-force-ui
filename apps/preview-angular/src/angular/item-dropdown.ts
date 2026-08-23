import { Component } from "@angular/core"

import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/angular-ui/item"

// apps/v4/examples/base/item-dropdown.tsx — Item rows composed inside a
// dropdown menu. ChevronDownIcon = keyboard_arrow_down.
interface Person {
  username: string
  avatar: string
  email: string
}

@Component({
  selector: "preview-item-dropdown",
  standalone: true,
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>
      Select
      <svg
        data-icon="inline-end"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
        />
      </svg>
    </button>
    <div uiDropdownMenuContent class="w-48">
      <div uiDropdownMenuGroup>
        @for (person of people; track person.username) {
          <button uiDropdownMenuItem class="p-0">
            <div uiItem size="xs" class="w-full p-2">
              <div uiItemMedia>
                <span uiAvatar class="size-6.5">
                  <img uiAvatarImage [src]="person.avatar" class="grayscale" [alt]="person.username" />
                  <span uiAvatarFallback>{{ person.username.charAt(0) }}</span>
                </span>
              </div>
              <div uiItemContent class="gap-0">
                <div uiItemTitle>{{ person.username }}</div>
                <p uiItemDescription class="leading-none">{{ person.email }}</p>
              </div>
            </div>
          </button>
        }
      </div>
    </div>
  </div>`,
})
export class ItemDropdownComponent {
  readonly people: Person[] = [
    {
      username: "shadcn",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "maxleiter",
      avatar: "https://github.com/maxleiter.png",
      email: "maxleiter@vercel.com",
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@vercel.com",
    },
  ]
}

export default ItemDropdownComponent

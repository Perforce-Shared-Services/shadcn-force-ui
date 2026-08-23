import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Button } from "@/angular-ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "@/angular-ui/item"
import { Component } from "@angular/core"

interface Person {
  username: string
  avatar: string
  email: string
}

@Component({
  selector: "preview-item-group",
  standalone: true,
  imports: [
    Item,
    ItemGroup,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Button
  ],
  template: `<div uiItemGroup class="max-w-sm">
    @for (person of people; track person.username) {
      <div uiItem variant="outline" role="listitem">
        <div uiItemMedia>
          <span uiAvatar>
            <img uiAvatarImage [src]="person.avatar" [alt]="person.username" class="grayscale" />
            <span uiAvatarFallback>{{ person.username.charAt(0) }}</span>
          </span>
        </div>
        <div uiItemContent class="gap-1">
          <div uiItemTitle>{{ person.username }}</div>
          <p uiItemDescription>{{ person.email }}</p>
        </div>
        <div uiItemActions>
          <button uiButton variant="ghost" size="icon" class="rounded-full" aria-label="Follow">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z"/></svg>
          </button>
        </div>
      </div>
    }
  </div>`
})
export class ItemGroupComponentDemo {
  readonly people: Person[] = [
    {
      username: "shadcn",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com"
    },
    {
      username: "maxleiter",
      avatar: "https://github.com/maxleiter.png",
      email: "maxleiter@vercel.com"
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@vercel.com"
    }
  ]
}

export default ItemGroupComponentDemo

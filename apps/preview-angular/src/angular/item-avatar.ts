import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Button } from "@/angular-ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/angular-ui/item"
import { Component } from "@angular/core"

@Component({
  selector: "preview-item-avatar",
  standalone: true,
  imports: [
    Avatar,
    AvatarImage,
    AvatarFallback,
    Button,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
  ],
  template: `<div class="flex w-full max-w-lg flex-col gap-6">
    <div uiItem variant="outline">
      <div uiItemMedia>
        <span uiAvatar class="size-10"
          ><img
            uiAvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          /><span uiAvatarFallback>ER</span></span
        >
      </div>
      <div uiItemContent>
        <div uiItemTitle>Evil Rabbit</div>
        <p uiItemDescription>Last seen 5 months ago</p>
      </div>
      <div uiItemActions>
        <button
          uiButton
          variant="outline"
          size="icon-sm"
          class="rounded-full"
          aria-label="Invite"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path
              d="M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div uiItem variant="outline">
      <div uiItemMedia>
        <div
          class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
        >
          <span uiAvatar class="hidden sm:flex"
            ><img
              uiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            /><span uiAvatarFallback>CN</span></span
          ><span uiAvatar class="hidden sm:flex"
            ><img
              uiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            /><span uiAvatarFallback>LR</span></span
          ><span uiAvatar
            ><img
              uiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            /><span uiAvatarFallback>ER</span></span
          >
        </div>
      </div>
      <div uiItemContent>
        <div uiItemTitle>No Team Members</div>
        <p uiItemDescription>
          Invite your team to collaborate on this project.
        </p>
      </div>
      <div uiItemActions>
        <button uiButton variant="outline" size="sm">Invite</button>
      </div>
    </div>
  </div>`,
})
export class ItemAvatarComponent {}

export default ItemAvatarComponent

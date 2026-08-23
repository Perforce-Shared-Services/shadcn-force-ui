import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Button } from "@/angular-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Component } from "@angular/core"

@Component({
  selector: "preview-empty-avatar",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Avatar, AvatarImage, AvatarFallback, Button],
  template: ` <div uiEmpty>
    <div uiEmptyHeader>
      <div uiEmptyMedia>
        <span uiAvatar class="size-12">
          <img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" class="grayscale" />
          <span uiAvatarFallback>LR</span>
        </span>
      </div>
      <h3 uiEmptyTitle>User Offline</h3>
      <p uiEmptyDescription>
        This user is currently offline. You can leave a message to notify them
        or try again later.
      </p>
    </div>
    <div uiEmptyContent><button uiButton size="sm">Leave Message</button></div>
  </div>`,
})
export class EmptyAvatarComponent {}

export default EmptyAvatarComponent

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// apps/v4/examples/base/avatar-badge.tsx
@Component({
  selector: "preview-avatar-badge",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback, AvatarBadge],
  template: `<span uiAvatar
    ><img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><span
      uiAvatarFallback
      >CN</span
    ><span
      uiAvatarBadge
      class="bg-green-600 dark:bg-green-800"
    ></span></span
  >`,
})
export class AvatarWithBadgeComponent {}

export default AvatarWithBadgeComponent

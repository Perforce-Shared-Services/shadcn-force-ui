import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// apps/v4/examples/base/avatar-group-count.tsx
@Component({
  selector: "preview-avatar-group-count",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount],
  template: `<div uiAvatarGroup class="grayscale">
    <span uiAvatar
      ><img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><span
        uiAvatarFallback
        >CN</span
      ></span
    ><span uiAvatar
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
    <div uiAvatarGroupCount>+3</div>
  </div>`,
})
export class AvatarGroupCountComponent {}

export default AvatarGroupCountComponent

import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// apps/v4/examples/base/avatar-size.tsx
@Component({
  selector: "preview-avatar-size",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template: `<div class="flex flex-wrap items-center gap-2 grayscale">
    <span uiAvatar size="sm"
      ><img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><span
        uiAvatarFallback
        >CN</span
      ></span
    ><span uiAvatar
      ><img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><span
        uiAvatarFallback
        >CN</span
      ></span
    ><span uiAvatar size="lg"
      ><img uiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><span
        uiAvatarFallback
        >CN</span
      ></span
    >
  </div>`,
})
export class AvatarSizeComponent {}

export default AvatarSizeComponent

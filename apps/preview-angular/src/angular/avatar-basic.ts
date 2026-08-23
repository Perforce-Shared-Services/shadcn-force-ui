import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// apps/v4/examples/base/avatar-basic.tsx
@Component({
  selector: "preview-avatar-basic",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template: `<span uiAvatar
    ><img
      uiAvatarImage
      class="grayscale"
      src="https://github.com/shadcn.png"
      alt="@shadcn"
    /><span uiAvatarFallback>CN</span></span
  >`,
})
export class AvatarBasicComponent {}

export default AvatarBasicComponent

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { Component } from "@angular/core"

@Component({
  selector: "preview-avatar-demo",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template: `<span uiAvatar
    ><img uiAvatarImage src="https://github.com/shadcn.png" alt="shadcn" /><span
      uiAvatarFallback
      >SC</span
    ></span
  >`,
})
export class AvatarDemoComponent {}

export default AvatarDemoComponent

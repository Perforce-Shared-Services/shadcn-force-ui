import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/ui/avatar"
import { Component } from "@angular/core"

@Component({
  selector: "preview-avatar-group",
  standalone: true,
  imports: [Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount],
  template: `<div uiAvatarGroup>
    <span uiAvatar><span uiAvatarFallback>AL</span></span
    ><span uiAvatar><span uiAvatarFallback>JD</span></span
    ><span uiAvatar><span uiAvatarFallback>SC</span></span>
    <div uiAvatarGroupCount>+3</div>
  </div>`,
})
export class AvatarGroupPreviewComponent {}

export default AvatarGroupPreviewComponent

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// Material Symbols glyph matching the React example's PlusIcon.
const PLUS_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z"/></svg>`

// apps/v4/examples/base/avatar-group-count-icon.tsx
@Component({
  selector: "preview-avatar-group-count-icon",
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
    <div uiAvatarGroupCount [innerHTML]="plusSvg"></div>
  </div>`,
})
export class AvatarGroupCountIconComponent {
  protected readonly plusSvg = PLUS_SVG
}

export default AvatarGroupCountIconComponent

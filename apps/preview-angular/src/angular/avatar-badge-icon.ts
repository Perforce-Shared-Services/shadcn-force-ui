import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// Material Symbols glyph matching the React example's PlusIcon
// (apps/v4/examples/material-symbols-map.ts).
const PLUS_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z"/></svg>`

// apps/v4/examples/base/avatar-badge-icon.tsx
@Component({
  selector: "preview-avatar-badge-icon",
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback, AvatarBadge],
  template: `<span uiAvatar class="grayscale"
    ><img
      uiAvatarImage
      src="https://github.com/pranathip.png"
      alt="@pranathip"
    /><span uiAvatarFallback>PP</span><span uiAvatarBadge [innerHTML]="plusSvg"></span></span
  >`,
})
export class AvatarBadgeIconComponent {
  protected readonly plusSvg = PLUS_SVG
}

export default AvatarBadgeIconComponent

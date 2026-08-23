import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/angular-ui/avatar"
import { Component } from "@angular/core"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic label + dir="rtl" render the same visual state.
// apps/v4/examples/base/avatar-rtl.tsx
@Component({
  selector: "preview-avatar-rtl",
  standalone: true,
  imports: [
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
    AvatarGroup,
    AvatarGroupCount,
  ],
  template: `<div
    dir="rtl"
    class="flex flex-row flex-wrap items-center gap-6 md:gap-12"
  >
    <span uiAvatar>
      <img
        uiAvatarImage
        class="grayscale"
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <span uiAvatarFallback>CN</span>
    </span>
    <span uiAvatar>
      <img uiAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <span uiAvatarFallback>ER</span>
      <span uiAvatarBadge class="bg-green-600 dark:bg-green-800"></span>
    </span>
    <div uiAvatarGroup class="grayscale">
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
      <div uiAvatarGroupCount>+٣</div>
    </div>
  </div>`,
})
export class AvatarRtlComponent {}

export default AvatarRtlComponent

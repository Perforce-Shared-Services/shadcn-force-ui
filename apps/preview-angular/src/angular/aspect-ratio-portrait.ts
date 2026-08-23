import { AspectRatio } from "@/angular-ui/aspect-ratio"
import { Component } from "@angular/core"

// apps/v4/examples/base/aspect-ratio-portrait.tsx
@Component({
  selector: "preview-aspect-ratio-portrait",
  standalone: true,
  imports: [AspectRatio],
  template: `<div
    uiAspectRatio
    [ratio]="9 / 16"
    class="w-full max-w-[10rem] overflow-hidden rounded-lg bg-muted"
  >
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Photo"
      class="size-full rounded-lg object-cover grayscale dark:brightness-20"
    />
  </div>`,
})
export class AspectRatioPortraitComponent {}

export default AspectRatioPortraitComponent

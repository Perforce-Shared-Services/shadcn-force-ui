import { AspectRatio } from "@/angular-ui/aspect-ratio"
import { Component } from "@angular/core"

// apps/v4/examples/base/aspect-ratio-square.tsx
@Component({
  selector: "preview-aspect-ratio-square",
  standalone: true,
  imports: [AspectRatio],
  template: `<div
    uiAspectRatio
    [ratio]="1 / 1"
    class="w-full max-w-[12rem] overflow-hidden rounded-lg bg-muted"
  >
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Photo"
      class="size-full rounded-lg object-cover grayscale dark:brightness-20"
    />
  </div>`,
})
export class AspectRatioSquareComponent {}

export default AspectRatioSquareComponent

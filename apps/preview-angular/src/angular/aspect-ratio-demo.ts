import { AspectRatio } from "@/angular-ui/aspect-ratio"
import { Component } from "@angular/core"

@Component({
  selector: "preview-aspect-ratio-demo",
  standalone: true,
  imports: [AspectRatio],
  template: `<div
    uiAspectRatio
    [ratio]="16 / 9"
    class="w-full max-w-sm overflow-hidden rounded-lg bg-muted"
  >
    <img
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
      alt="Mountain"
      class="size-full object-cover"
    />
  </div>`,
})
export class AspectRatioDemoComponent {}

export default AspectRatioDemoComponent

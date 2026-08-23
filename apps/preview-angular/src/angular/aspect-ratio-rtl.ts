import { AspectRatio } from "@/angular-ui/aspect-ratio"
import { Component } from "@angular/core"

// apps/v4/examples/base/aspect-ratio-rtl.tsx — the React example drives
// dir/caption from the language-selector translations (ar). Static Arabic
// caption + dir="rtl" render the same visual state.
@Component({
  selector: "preview-aspect-ratio-rtl",
  standalone: true,
  imports: [AspectRatio],
  template: `<figure class="w-full max-w-sm" dir="rtl">
    <div uiAspectRatio [ratio]="16 / 9" class="overflow-hidden rounded-lg bg-muted">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        class="size-full object-cover grayscale dark:brightness-20"
      />
    </div>
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      منظر طبيعي جميل
    </figcaption>
  </figure>`,
})
export class AspectRatioRtlComponent {}

export default AspectRatioRtlComponent

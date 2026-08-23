import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

// RTL convention for Angular previews: static content + dir="rtl".
@Component({
  selector: "preview-skeleton-rtl",
  standalone: true,
  imports: [Skeleton],
  template: `<div class="flex items-center gap-4" dir="rtl">
    <div uiSkeleton class="h-12 w-12 rounded-full"></div>
    <div class="space-y-2">
      <div uiSkeleton class="h-4 w-[250px]"></div>
      <div uiSkeleton class="h-4 w-[200px]"></div>
    </div>
  </div>`,
})
export class SkeletonRtlComponent {}

export default SkeletonRtlComponent

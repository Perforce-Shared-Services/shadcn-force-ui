import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

@Component({
  selector: "preview-skeleton-form",
  standalone: true,
  imports: [Skeleton],
  template: `<div class="flex w-full max-w-xs flex-col gap-7">
    <div class="flex flex-col gap-3">
      <div uiSkeleton class="block h-4 w-20"></div>
      <div uiSkeleton class="block h-8 w-full"></div>
    </div>
    <div class="flex flex-col gap-3">
      <div uiSkeleton class="block h-4 w-24"></div>
      <div uiSkeleton class="block h-8 w-full"></div>
    </div>
    <div uiSkeleton class="block h-8 w-24"></div>
  </div>`,
})
export class SkeletonFormComponent {}

export default SkeletonFormComponent

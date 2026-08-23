import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

@Component({
  selector: "preview-skeleton-table",
  standalone: true,
  imports: [Skeleton],
  template: `<div class="flex w-full max-w-sm flex-col gap-2">
      <div class="flex gap-4">
        <div uiSkeleton class="block h-4 flex-1"></div>
        <div uiSkeleton class="block h-4 w-24"></div>
        <div uiSkeleton class="block h-4 w-20"></div>
      </div>
      <div class="flex gap-4">
        <div uiSkeleton class="block h-4 flex-1"></div>
        <div uiSkeleton class="block h-4 w-24"></div>
        <div uiSkeleton class="block h-4 w-20"></div>
      </div>
      <div class="flex gap-4">
        <div uiSkeleton class="block h-4 flex-1"></div>
        <div uiSkeleton class="block h-4 w-24"></div>
        <div uiSkeleton class="block h-4 w-20"></div>
      </div>
      <div class="flex gap-4">
        <div uiSkeleton class="block h-4 flex-1"></div>
        <div uiSkeleton class="block h-4 w-24"></div>
        <div uiSkeleton class="block h-4 w-20"></div>
      </div>
      <div class="flex gap-4">
        <div uiSkeleton class="block h-4 flex-1"></div>
        <div uiSkeleton class="block h-4 w-24"></div>
        <div uiSkeleton class="block h-4 w-20"></div>
      </div>
  </div>`,
})
export class SkeletonTableComponent {}

export default SkeletonTableComponent

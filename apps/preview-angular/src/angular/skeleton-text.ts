import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

@Component({
  selector: "preview-skeleton-text",
  standalone: true,
  imports: [Skeleton],
  template: `<div class="flex w-full max-w-xs flex-col gap-2">
    <div uiSkeleton class="block h-4 w-full"></div>
    <div uiSkeleton class="block h-4 w-full"></div>
    <div uiSkeleton class="block h-4 w-3/4"></div>
  </div>`,
})
export class SkeletonTextComponent {}

export default SkeletonTextComponent

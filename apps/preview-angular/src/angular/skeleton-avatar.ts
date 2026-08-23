import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

@Component({
  selector: "preview-skeleton-avatar",
  standalone: true,
  imports: [Skeleton],
  template: `<div class="flex w-fit items-center gap-4">
    <div uiSkeleton class="size-10 shrink-0 rounded-full"></div>
    <div class="grid gap-2">
      <div uiSkeleton class="h-4 w-[150px]"></div>
      <div uiSkeleton class="h-4 w-[100px]"></div>
    </div>
  </div>`,
})
export class SkeletonAvatarComponent {}

export default SkeletonAvatarComponent

import { Card, CardContent, CardHeader } from "@/angular-ui/card"
import { Skeleton } from "@/angular-ui/skeleton"
import { Component } from "@angular/core"

@Component({
  selector: "preview-skeleton-card",
  standalone: true,
  imports: [Card, CardHeader, CardContent, Skeleton],
  template: `<div uiCard class="w-full max-w-xs">
    <div uiCardHeader>
      <div uiSkeleton class="block h-4 w-2/3"></div>
      <div uiSkeleton class="block h-4 w-1/2"></div>
    </div>
    <div uiCardContent>
      <div uiSkeleton class="block aspect-video w-full"></div>
    </div>
  </div>`,
})
export class SkeletonCardComponent {}

export default SkeletonCardComponent

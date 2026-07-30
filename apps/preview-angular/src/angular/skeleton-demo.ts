import { Component } from "@angular/core"
import { SkeletonComponent } from "@/angular-ui/skeleton"

@Component({
  selector: "preview-skeleton-demo",
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="flex items-center space-x-4">
      <div uiSkeleton class="size-12 rounded-full"></div>
      <div class="space-y-2">
        <div uiSkeleton class="h-4 w-[250px]"></div>
        <div uiSkeleton class="h-4 w-[200px]"></div>
      </div>
    </div>
  `,
})
export default class SkeletonDemoComponent {}

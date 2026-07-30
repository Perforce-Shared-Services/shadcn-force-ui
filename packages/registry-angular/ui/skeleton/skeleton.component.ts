import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/skeleton (radix-force-ui style).
 *
 * Usage:
 *   <div uiSkeleton class="h-4 w-48"></div>
 *   <div uiSkeleton class="size-12 rounded-full"></div>
 *
 * The skeleton is aria-hidden — it is purely visual. The "loading" state
 * belongs on the container via aria-busy="true".
 *
 * cn-skeleton CSS class provides: animate-pulse rounded-md bg-muted
 * motion-reduce:animate-none — no need to repeat them here.
 */
@Component({
  selector: "[uiSkeleton]",
  standalone: true,
  templateUrl: "./skeleton.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "skeleton",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class SkeletonComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-skeleton", this.className())
  )
}

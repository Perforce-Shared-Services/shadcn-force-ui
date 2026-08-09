import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/aspect-ratio (radix-force-ui style).
 *
 * Uses the CSS `aspect-ratio` property directly — no padding-bottom hack needed
 * for Angular 20+ (modern browser baseline). Set `ratio` as a number (width/height)
 * or a CSS string like "16/9".
 *
 * Usage:
 *   <div uiAspectRatio [ratio]="16/9">
 *     <img src="..." alt="..." class="size-full object-cover" />
 *   </div>
 *   <div uiAspectRatio ratio="4/3">…</div>
 */
@Component({
  selector: "div[uiAspectRatio]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "aspect-ratio",
    "[style.aspectRatio]": "ratio()",
    "[class]": "classes()",
  },
})
export class AspectRatioComponent {
  readonly ratio = input<number | string>(16 / 9)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("relative w-full", this.className())
  )
}

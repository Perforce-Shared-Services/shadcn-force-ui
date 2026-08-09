import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/progress (radix-force-ui style).
 *
 * Pure Angular — no radix-ng dependency. ARIA attributes applied directly.
 *
 * Usage:
 *   <div uiProgress [value]="75" aria-label="Uploading (75%)"></div>
 *   <div uiProgress [value]="null" aria-label="Syncing…"></div>  ← indeterminate
 *
 * Always supply aria-label or aria-labelledby — the component cannot infer
 * an accessible name from context. value=null → indeterminate (pulsing indicator,
 * aria-valuenow omitted per APG progressbar pattern).
 */
@Component({
  selector: "[uiProgress]",
  standalone: true,
  templateUrl: "./progress.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "progress",
    "role": "progressbar",
    "aria-valuemin": "0",
    "[attr.aria-valuemax]": "max()",
    "[attr.aria-valuenow]": "value() ?? null",
    "[attr.data-state]": "state()",
    "[class]": "classes()",
  },
})
export class ProgressComponent {
  readonly value = input<number | null | undefined>(undefined)
  readonly max = input<number>(100)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly state = computed(() => {
    const v = this.value()
    if (v == null) return "indeterminate"
    return v >= this.max() ? "complete" : "loading"
  })

  protected readonly indicatorClasses = computed(() =>
    cn(
      "cn-progress-indicator size-full flex-1 motion-reduce:transition-none motion-reduce:animate-none",
      this.state() === "indeterminate" ? "animate-pulse" : "transition-all"
    )
  )

  protected readonly indicatorTransform = computed(() => {
    if (this.state() === "indeterminate") return "translateX(0)"
    const pct = ((this.value() ?? 0) / this.max()) * 100
    return `translateX(-${100 - pct}%)`
  })

  protected readonly classes = computed(() =>
    cn("cn-progress relative flex w-full items-center overflow-x-hidden", this.className())
  )
}

import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * `[uiInputGroupText]` — muted inline text inside an addon (a prefix/suffix
 * label, a unit, a count).
 */
const inputGroupTextClasses =
  "cn-input-group-text flex items-center [&_svg]:pointer-events-none"

@Component({
  selector: "[uiInputGroupText]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-group-text",
    "[class]": "classes()",
  },
})
export class InputGroupTextComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn(inputGroupTextClasses, this.className()))
}

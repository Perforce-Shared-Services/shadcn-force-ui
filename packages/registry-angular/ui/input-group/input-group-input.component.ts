import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { inputVariants } from "@/angular-ui/input"

/**
 * `input[uiInputGroupInput]` — the control inside `[uiInputGroup]`. It reuses
 * the standalone input's outline style stripped of its own box (no border, no
 * ring, transparent bg) because the group draws the chrome.
 * `data-slot=input-group-control` is what the group's focus-within /
 * aria-invalid selectors key off.
 */
const groupInputOverrides = "cn-input-group-input flex-1"

@Component({
  selector: "input[uiInputGroupInput]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-group-control",
    "[class]": "classes()",
  },
})
export class InputGroupInputComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: "outline" }), groupInputOverrides, this.className())
  )
}

import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { textareaVariants } from "@/angular-ui/textarea"

/**
 * `textarea[uiInputGroupTextarea]` — the multi-line control inside
 * `[uiInputGroup]`. Like InputGroupInput, it reuses the standalone textarea
 * style stripped of its own box (no border/ring, transparent) because the
 * group draws the chrome. Pairs with a `block-end` addon for the counter/
 * action row (e.g. "0/280" + a Post button).
 */
const groupTextareaOverrides = "cn-input-group-textarea flex-1 resize-none"

@Component({
  selector: "textarea[uiInputGroupTextarea]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-group-control",
    "[class]": "classes()",
  },
})
export class InputGroupTextareaComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(textareaVariants({ variant: "outline" }), groupTextareaOverrides, this.className())
  )
}

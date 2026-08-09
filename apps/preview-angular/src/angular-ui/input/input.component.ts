import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { inputVariants, type InputVariant } from "./input.variants"

/**
 * Angular port of @force-ui/input (radix-force-ui style).
 *
 * Attribute selector on a native <input> — usage:
 *   <input uiInput type="email" placeholder="m@example.com" />
 *   <input uiInput variant="filled" />
 *
 * Four variants: outline (default), filled, underline, ghost.
 * See DIVERGENCES.md for notes on the tiered border approach.
 */
@Component({
  selector: "input[uiInput]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class InputComponent {
  readonly variant = input<InputVariant>("outline")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: this.variant() }), this.className())
  )
}

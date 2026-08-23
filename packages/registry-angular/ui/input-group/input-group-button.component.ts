import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariant } from "@/angular-ui/button"

import { inputGroupButtonVariants, type InputGroupButtonSize } from "./input-group-button.variants"

/**
 * `button[uiInputGroupButton]` — a compact action inside an addon (clear,
 * password reveal, submit). A ghost Button with the input-group size scale
 * layered on top; the size classes override the button's defaults via
 * tailwind-merge.
 *
 * a11y: an icon-only button (e.g. size="icon-xs" with just a glyph) MUST carry
 * an `aria-label` — the glyph is not an accessible name (WCAG 4.1.2). `type`
 * is forced to "button" so it never accidentally submits a form.
 */
@Component({
  selector: "button[uiInputGroupButton]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: "button",
    "data-slot": "button",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class InputGroupButtonComponent {
  readonly variant = input<ButtonVariant>("ghost")
  readonly size = input<InputGroupButtonSize>("xs")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant() }),
      inputGroupButtonVariants({ size: this.size() }),
      this.className()
    )
  )
}

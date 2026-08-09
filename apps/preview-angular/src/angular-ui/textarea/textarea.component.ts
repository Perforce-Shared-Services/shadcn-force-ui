import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"
import { textareaVariants, type TextareaVariant } from "./textarea.variants"

/**
 * Angular port of @force-ui/textarea (radix-force-ui style).
 *
 * Attribute selector on a native <textarea> — usage:
 *   <textarea uiTextarea placeholder="Write a message…"></textarea>
 *   <textarea uiTextarea variant="filled" [resizable]="false"></textarea>
 */
@Component({
  selector: "textarea[uiTextarea]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "textarea",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class TextareaComponent {
  readonly variant = input<TextareaVariant>("outline")
  readonly resizable = input(true, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      textareaVariants({ variant: this.variant() }),
      this.resizable() ? "resize-y" : "resize-none",
      this.className()
    )
  )
}

import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"
import { RdxToggle } from "@radix-ng/primitives/toggle"

import { cn } from "@/lib/utils"
import { toggleVariants, type ToggleSize, type ToggleVariant } from "./toggle.variants"

/**
 * Angular port of @force-ui/toggle (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <button uiToggle [(pressed)]="bold" aria-label="Bold">
 *     <svg>…</svg>
 *   </button>
 */
@Component({
  selector: "[uiToggle]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxToggle,
      inputs: ["pressed", "defaultPressed", "disabled", "value"],
      outputs: ["onPressedChange"],
    },
  ],
  host: {
    "data-slot": "toggle",
    "type": "button",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class ToggleComponent {
  readonly variant = input<ToggleVariant>("default")
  readonly size = input<ToggleSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(toggleVariants({ variant: this.variant(), size: this.size() }), this.className())
  )
}

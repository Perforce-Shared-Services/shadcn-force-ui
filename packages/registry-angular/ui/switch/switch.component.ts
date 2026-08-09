import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"
import { RdxSwitchRoot, RdxSwitchThumb } from "@radix-ng/primitives/switch"

import { cn } from "@/lib/utils"

export type SwitchSize = "default" | "sm"

/**
 * Angular port of @force-ui/switch (radix-force-ui style).
 *
 * Attribute selector on a native <button> — usage:
 *   <button uiSwitch [(checked)]="enabled"></button>
 *   <button uiSwitch size="sm" [checked]="true"></button>
 */
@Component({
  selector: "button[uiSwitch]",
  standalone: true,
  imports: [RdxSwitchThumb],
  templateUrl: "./switch.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxSwitchRoot,
      inputs: ["checked", "defaultChecked", "disabled", "required"],
      outputs: ["checkedChange", "onCheckedChange"],
    },
  ],
  host: {
    "data-slot": "switch",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class SwitchComponent {
  readonly size = input<SwitchSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly thumbClass = computed(() =>
    cn("cn-switch-thumb group/switch pointer-events-none block rounded-full ring-0 transition-transform motion-reduce:transition-none")
  )

  protected readonly classes = computed(() =>
    cn(
      "cn-switch group/switch peer relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors motion-reduce:transition-none outline-none focus-visible:ring-3 aria-invalid:ring-3 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
      this.className()
    )
  )
}

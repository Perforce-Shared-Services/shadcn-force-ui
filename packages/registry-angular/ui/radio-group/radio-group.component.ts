import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"
import { RdxRadioGroupDirective, RdxRadioIndicatorDirective, RdxRadioItemDirective } from "@radix-ng/primitives/radio"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/radio-group (radix-force-ui style).
 *
 * Usage:
 *   <div uiRadioGroup [(value)]="selected">
 *     <button uiRadioGroupItem value="option-1"></button>
 *     <label>Option 1</label>
 *   </div>
 */
@Component({
  selector: "[uiRadioGroup]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxRadioGroupDirective,
      inputs: ["value", "defaultValue", "disabled", "required", "orientation"],
      outputs: ["valueChange", "onValueChange"],
    },
  ],
  host: {
    "data-slot": "radio-group",
    "[class]": "classes()",
  },
})
export class RadioGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-radio-group grid w-full", this.className()))
}

@Component({
  selector: "button[uiRadioGroupItem]",
  standalone: true,
  imports: [RdxRadioIndicatorDirective],
  templateUrl: "./radio-group-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxRadioItemDirective,
      inputs: ["value", "id", "required", "disabled"],
    },
  ],
  host: {
    "data-slot": "radio-group-item",
    "[class]": "classes()",
  },
})
export class RadioGroupItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-radio-group-item peer relative flex aspect-square shrink-0 cursor-pointer rounded-full border transition-colors motion-reduce:transition-none outline-none focus-visible:ring-3 aria-invalid:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
      this.className()
    )
  )
}

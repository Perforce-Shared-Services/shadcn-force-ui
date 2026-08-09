import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { RdxToggle } from "@radix-ng/primitives/toggle"
import { RdxToggleGroup } from "@radix-ng/primitives/toggle-group"

import { cn } from "@/lib/utils"
import { toggleVariants, type ToggleSize, type ToggleVariant } from "../toggle/toggle.variants"

export type ToggleGroupOrientation = "horizontal" | "vertical"

/**
 * Angular port of @force-ui/toggle-group (radix-force-ui style).
 *
 * Usage:
 *   <div uiToggleGroup type="single" [(value)]="alignment">
 *     <button uiToggleGroupItem value="left" aria-label="Left">…</button>
 *   </div>
 *
 * Note: ToggleGroupItem uses RdxToggle (not a separate directive in v1.x).
 * Pass value on each item for the group to track selection.
 */
@Component({
  selector: "[uiToggleGroup]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxToggleGroup,
      inputs: ["value", "disabled"],
      outputs: ["valueChange", "onValueChange"],
    },
  ],
  host: {
    "data-slot": "toggle-group",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class ToggleGroupComponent {
  readonly variant = input<ToggleVariant>("default")
  readonly size = input<ToggleSize>("default")
  readonly orientation = input<ToggleGroupOrientation>("horizontal")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-toggle-group group/toggle-group flex items-center",
      this.orientation() === "vertical" ? "flex-col" : "flex-row",
      this.className()
    )
  )
}

@Component({
  selector: "button[uiToggleGroupItem]",
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
    "data-slot": "toggle-group-item",
    "type": "button",
    "[attr.data-variant]": "resolvedVariant()",
    "[attr.data-size]": "resolvedSize()",
    "[class]": "classes()",
  },
})
export class ToggleGroupItemComponent {
  readonly variant = input<ToggleVariant>("default")
  readonly size = input<ToggleSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly group = inject(ToggleGroupComponent, { optional: true })

  protected readonly resolvedVariant = computed<ToggleVariant>(() => this.group?.variant() ?? this.variant())
  protected readonly resolvedSize = computed<ToggleSize>(() => this.group?.size() ?? this.size())

  protected readonly classes = computed(() =>
    cn(
      "cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10",
      toggleVariants({ variant: this.resolvedVariant(), size: this.resolvedSize() }),
      this.className()
    )
  )
}

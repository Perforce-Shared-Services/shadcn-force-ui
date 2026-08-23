import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

import { inputGroupVariants, type InputGroupVariant } from "./input-group.variants"

/**
 * Angular port of @force-ui/input-group (radix-force-ui style).
 *
 * `[uiInputGroup]` is the wrapper that owns the field chrome (border, focus
 * ring, invalid, disabled) so an `<input uiInputGroupInput>` plus one or more
 * `<div uiInputGroupAddon>` (icons, buttons, text, kbd) read as a single
 * control. The inner input is rendered borderless — the group draws the box.
 *
 * Usage:
 *   <div uiInputGroup variant="filled">
 *     <div uiInputGroupAddon><svg>...</svg></div>
 *     <input uiInputGroupInput placeholder="Search files and versions" />
 *   </div>
 *
 * a11y / labelling: the group is `role="group"`. Label the FIELD by giving the
 * inner control an id and a programmatic `<label for>` (the group isn't a
 * labelable element). Error state: set `aria-invalid` on the inner control
 * (drives the group's red chrome) AND link a visible message via
 * `aria-describedby` — colour is not a sufficient signal (WCAG 1.4.1).
 */
@Component({
  selector: "[uiInputGroup]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-group",
    role: "group",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class InputGroupComponent {
  readonly variant = input<InputGroupVariant>("outline")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(inputGroupVariants({ variant: this.variant() }), this.className())
  )
}

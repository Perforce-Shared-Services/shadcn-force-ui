import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input } from "@angular/core"

import { cn } from "@/lib/utils"

import { inputGroupAddonVariants, type InputGroupAddonAlign } from "./input-group-addon.variants"

/**
 * `[uiInputGroupAddon]` — a slot inside `[uiInputGroup]` for icons, buttons,
 * text, or kbd. `align` positions it (inline-start/end = left/right of the
 * field; block-start/end = stacked above/below). Clicking the addon focuses
 * the group's control (unless the click landed on a button), so the whole
 * affordance behaves like one field.
 *
 * Icon convention: the addon cva sizes direct-child icons to `size-4`
 * (`[&_svg:not([class*='size-'])]:size-4`) and `[&>svg]:fill-current` makes
 * fill-based glyphs inherit the addon's `text-muted-foreground` colour.
 * Consumers do NOT size icons per-element — drop the `<svg>` in.
 *
 * a11y deviation from the registry source: React puts `role="group"` on every
 * addon; we drop it — an addon is a presentational slot, not a named set of
 * controls, and nested unnamed groups are screen-reader noise. The outer
 * `[uiInputGroup]` keeps `role="group"` (see DIVERGENCES.md).
 */
@Component({
  selector: "[uiInputGroupAddon]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-group-addon",
    "[attr.data-align]": "align()",
    "[class]": "classes()",
    "(click)": "onClick($event)",
  },
})
export class InputGroupAddonComponent {
  private readonly el = inject(ElementRef)

  readonly align = input<InputGroupAddonAlign>("inline-start")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(inputGroupAddonVariants({ align: this.align() }), this.className())
  )

  protected onClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }
    const host = this.el.nativeElement as HTMLElement
    const control = host.parentElement?.querySelector<HTMLElement>("input, textarea")
    control?.focus()
  }
}

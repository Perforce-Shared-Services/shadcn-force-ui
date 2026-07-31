import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { badgeVariants, type BadgeVariant } from "./badge.variants"

/**
 * Angular port of @force-ui/badge (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <span uiBadge>Default</span>
 *   <span uiBadge variant="success" srLabel="Synced:">42</span>
 *   <a uiBadge variant="link" href="...">Open</a>
 *
 * Icons: project an inline SVG as content tagged data-icon="inline-start" or
 * "inline-end". The cn-badge CSS class adds side padding and sizes the svg.
 *
 * srLabel: prepends a visually-hidden prefix for screen readers. Use on
 * count- or icon-only badges where color alone conveys meaning (WCAG 1.4.1).
 */
@Component({
  selector: "[uiBadge]",
  standalone: true,
  template: `@if (srLabel()) {
  <span class="sr-only">{{ srLabel() }} </span>
}
<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "badge",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly srLabel = input<string | undefined>(undefined)

  protected readonly classes = computed(() =>
    cn(badgeVariants({ variant: this.variant() }), this.className())
  )
}

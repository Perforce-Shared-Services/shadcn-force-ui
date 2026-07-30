import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { kbdVariants, type KbdVariant } from "./kbd.variants"

/**
 * Angular port of @force-ui/kbd (radix-force-ui style).
 *
 * Attribute selectors on native <kbd> elements — usage:
 *   <kbd uiKbd>Ctrl</kbd>
 *   <kbd uiKbd variant="primary">⌘</kbd>
 *   <span uiKbdGroup><kbd uiKbd>⌘</kbd><kbd uiKbd>K</kbd></span>
 *
 * variant="default" — muted pill for light surfaces.
 * variant="primary" — translucent pill for placement on a solid/brand surface
 * (e.g. inside a default button or tooltip). Matches Figma Background=Primary.
 */
@Component({
  selector: "[uiKbd]",
  standalone: true,
  templateUrl: "./kbd.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "kbd",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class KbdComponent {
  readonly variant = input<KbdVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(kbdVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiKbdGroup]",
  standalone: true,
  templateUrl: "./kbd.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "kbd-group",
    "[class]": "classes()",
  },
})
export class KbdGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-kbd-group inline-flex items-center", this.className())
  )
}

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

export type SeparatorOrientation = "horizontal" | "vertical"

/**
 * Angular port of @force-ui/separator (radix-force-ui style).
 *
 * Usage:
 *   <div uiSeparator></div>
 *   <div uiSeparator orientation="vertical"></div>
 *
 * Uses data-[orientation=…] Tailwind variants directly — the cn-separator*
 * CSS tokens in style-force-ui.css are unused by all framework ports.
 * See DIVERGENCES.md §separator-1.
 *
 * decorative (default true): decorative separators get role="none" and are
 * hidden from the a11y tree. Pass decorative="false" for a semantic separator
 * between landmark regions (announces as role="separator").
 */
@Component({
  selector: "[uiSeparator]",
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "separator",
    "[attr.role]": "decorative() ? 'none' : 'separator'",
    "[attr.aria-orientation]":
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class SeparatorComponent {
  readonly orientation = input<SeparatorOrientation>("horizontal")
  readonly decorative = input(true, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
      this.className()
    )
  )
}

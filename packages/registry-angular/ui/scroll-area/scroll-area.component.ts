import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

import { scrollAreaVariants } from "./scroll-area.variants"

/**
 * Angular port of @force-ui/scroll-area (radix-force-ui style).
 *
 * Usage (attribute selector keeps the host's native element semantics — the
 * Angular idiom for React's `asChild`; the host MUST be sized, the viewport
 * fills and scrolls within it):
 *   <div uiScrollArea class="h-72 w-48"> …long content… </div>
 *   <div uiScrollArea orientation="horizontal" class="w-96"> …wide content… </div>
 *
 * Divergence from the React source (DIVERGENCES.md §scroll-area-1): radix-ui's
 * ScrollArea renders a JS-driven overlay scrollbar (`ScrollBar`, `Thumb`,
 * `Corner` sub-components). `@radix-ng/primitives` ships no equivalent, so —
 * matching the p4one reference — this port scrolls natively and themes the
 * browser scrollbar via `scrollbar-width`/`scrollbar-color` in
 * `scroll-area.variants.ts`. Those sub-components are therefore not exported.
 *
 * Accessibility: the viewport is `tabindex="0"` so the region is keyboard-
 * operable (WCAG 2.1.1). Because that makes it a tab stop it always carries an
 * accessible name (WCAG 4.1.2): pass `ariaLabel` to make it a named
 * `role="region"` landmark (WCAG 1.3.1); omit it and it falls back to a generic
 * "Scrollable region" name with no landmark role.
 */
@Component({
  selector: "[uiScrollArea]",
  standalone: true,
  templateUrl: "./scroll-area.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "scroll-area",
    "[attr.data-orientation]": "orientation()",
    // `relative` from the registry root; rounded-[inherit] on the viewport
    // picks the border radius up from the host.
    "[class]": "classes()",
  },
})
export class ScrollAreaComponent {
  /** Which axis scrolls. Mirrors the registry `ScrollBar` orientation prop. */
  readonly orientation = input<"vertical" | "horizontal" | "both">("vertical")
  /** Accessible name; when set the viewport becomes a labelled `role="region"`. */
  readonly ariaLabel = input<string | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("relative", this.className()))

  protected readonly viewportClasses = computed(() =>
    scrollAreaVariants({ orientation: this.orientation() })
  )
}

import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

import { markerVariants, type MarkerVariant } from "./marker.variants"

/**
 * Angular port of @force-ui/marker (force-ui style).
 *
 * A single-line meta row (a timestamp/status/breadcrumb-style marker) that
 * pairs an optional decorative icon with content. Attribute selectors — the
 * host stays whatever element the caller writes (a `<div>` for a static
 * marker, an `<a>`/`<button>` when the whole row is clickable — the Angular
 * equivalent of React's `render={<a/>}` composition).
 *
 * `variant="separator"` draws a flanking line on either side of the content;
 * `variant="border"` draws a bottom rule instead.
 */

@Component({
  selector: "[uiMarker]",
  standalone: true,
  templateUrl: "./marker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "marker",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()"
  }
})
export class MarkerComponent {
  readonly variant = input<MarkerVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(markerVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiMarkerIcon]",
  standalone: true,
  templateUrl: "./marker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "marker-icon",
    "aria-hidden": "true",
    "[class]": "classes()"
  }
})
export class MarkerIconComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // `[&_svg]:fill-current` — Material Symbols SVGs are fill-based and paint
  // black without it (see DIVERGENCES.md §button-2).
  protected readonly classes = computed(() =>
    cn("cn-marker-icon shrink-0 [&_svg]:fill-current", this.className())
  )
}

@Component({
  selector: "[uiMarkerContent]",
  standalone: true,
  templateUrl: "./marker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "marker-content",
    "[class]": "classes()"
  }
})
export class MarkerContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-marker-content min-w-0 wrap-break-word", this.className())
  )
}

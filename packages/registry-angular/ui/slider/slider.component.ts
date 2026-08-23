import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
  output,
} from "@angular/core"
import {
  RdxSliderControl,
  RdxSliderIndicator,
  RdxSliderRoot,
  RdxSliderThumb,
  RdxSliderTrack,
} from "@radix-ng/primitives/slider"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/slider (force-ui style).
 *
 * Uses the @radix-ng/primitives v1.x API, where every slider part is a
 * *directive* on a plain div (`RdxSliderRoot` on `div[rdxSliderRoot]`,
 * `RdxSliderTrack`, `RdxSliderIndicator`, `RdxSliderThumb`,
 * `RdxSliderControl`). This is unlike p4one's v0.50.0 sources, where the
 * root was an `<rdx-slider>` component that had to be wrapped — here the
 * DOM mirrors the registry's React structure exactly:
 * root > track > range, plus one thumb per value.
 *
 * Usage:
 *   <div uiSlider [(value)]="quality" [max]="100" aria-label="Quality"></div>
 *   <div uiSlider [value]="[25, 75]" [max]="100"></div>          <!-- range -->
 *   <div uiSlider orientation="vertical" class="h-40"></div>
 *
 * `value` is a `number[]` model — one entry per thumb. Pass a single-element
 * array for a plain value slider, two or more for multi-thumb (radix-ng sorts
 * and clamps automatically).
 *
 * Accessibility: pass `aria-label` / `aria-labelledby` on this component —
 * they are forwarded onto each thumb, which is where `role="slider"` lives
 * (the v1.x root carries `role="group"`). A slider with no accessible name is
 * a WCAG 4.1.2 failure.
 *
 * Styling: `cn-slider*` tokens from style-force-ui.css carry the shared
 * visuals; layout classes not covered by tokens stay inline here. The
 * `disabled:` variants on the thumb token cover the disabled state — v1.x
 * gates pointer/keyboard interaction itself, unlike v0.50 which needed TS-side
 * compensation.
 */
@Component({
  selector: "[uiSlider]",
  standalone: true,
  imports: [
    RdxSliderControl,
    RdxSliderIndicator,
    RdxSliderRoot,
    RdxSliderThumb,
    RdxSliderTrack,
  ],
  templateUrl: "./slider.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  readonly min = input(0, { transform: numberAttribute })
  readonly max = input(100, { transform: numberAttribute })
  readonly step = input(1, { transform: numberAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })

  /** React-parity orientation prop: `"vertical"` renders a vertical slider. */
  readonly orientation = input<"horizontal" | "vertical">("horizontal")

  /** Uncontrolled initial value(s). */
  readonly defaultValue = input<number[] | undefined>(undefined)

  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly ariaLabel = input<string | undefined>(undefined, { alias: "aria-label" })
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  })
  /** Reading direction, forwarded to the radix root (drives RTL math). */
  readonly dirInput = input<"ltr" | "rtl" | undefined>(undefined, { alias: "dir" })

  /** Controlled value — one entry per thumb. Two-way bindable. */
  readonly value = model<number[]>([0])

  /** Emitted when interaction ends, with the final value(s). */
  readonly onValueCommit = output<number[]>()

  protected readonly isVertical = computed(() => this.orientation() === "vertical")

  protected readonly wrapperClasses = computed(() =>
    cn(
      // Layout classes not covered by the cn-slider token (which carries
      // data-vertical:min-h-40).
      "relative flex w-full touch-none select-none",
      this.isVertical()
        ? "h-full min-h-40 w-auto flex-col"
        : "items-center",
      this.className(),
    ),
  )

  /**
   * The control div is the pointer-tracking area (v1.x moved pointer handling
   * out of the root into RdxSliderControl). Thumbs position themselves against
   * it, so it carries `relative` and mirrors the root's axis layout.
   */
  protected readonly controlClasses = computed(() =>
    cn(
      "relative flex touch-none select-none",
      this.isVertical()
        ? "h-full w-full flex-col items-stretch"
        : "w-full items-center",
    ),
  )

  /** One thumb index per current value. */
  protected readonly thumbIndices = computed(() =>
    this.value().map((_, index) => index),
  )
}

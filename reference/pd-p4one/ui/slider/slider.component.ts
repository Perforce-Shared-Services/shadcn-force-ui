import {
  type AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
} from '@angular/core';
import {
  RdxSliderRangeComponent,
  RdxSliderRootComponent,
  RdxSliderThumbComponent,
  RdxSliderTrackComponent,
} from '@radix-ng/primitives/slider';

import { cn } from '@/app/lib/utils';

import {
  SLIDER_RANGE_CLASS,
  SLIDER_THUMB_CLASS,
  SLIDER_TRACK_CLASS,
  SLIDER_WRAPPER_CLASS,
} from './slider.variants';

/**
 * Angular port of @force-ui/slider (radix-force-ui style).
 *
 * radix-ng ships the slider root as a *component* (`RdxSliderRootComponent`,
 * element selector `rdx-slider` — it owns the horizontal/vertical pointer-
 * tracking span internally). A component can't be attached via
 * `hostDirectives`, so — unlike `uiButton`/`uiSwitch`/`uiProgress`, which
 * decorate the caller's own host tag — this component wraps `<rdx-slider>` as
 * a genuine child. The upstream React `Slider` has no `asChild` escape hatch
 * either (it's not composable by callers), so the extra wrapper costs no
 * flexibility that existed to begin with. `data-slot="slider"` sits on the
 * `<rdx-slider>` element itself (the functional equivalent of the registry's
 * `SliderPrimitive.Root`), not on this component's own host.
 *
 * Attribute selector — usage:
 *   <div uiSlider [(value)]="quality" [aria-label]="'Preview quality'"></div>
 *   <div uiSlider [min]="0" [max]="10" [step]="1" [(value)]="polyBudget"></div>
 *   <div uiSlider vertical [(value)]="brightness" [aria-label]="'Brightness'"></div>
 *   <div uiSlider [(value)]="range" [aria-label]="'Range'"></div>  ← 2 values = 2 thumbs
 *   <div uiSlider disabled [value]="[50]" [aria-label]="'Locked'"></div>
 *
 * `value` is a `number[]` model — one entry per thumb. Most sliders use a
 * single-element array; pass two for a min/max range slider (radix-ng sorts
 * and clamps automatically, matching the registry's multi-thumb behavior).
 *
 * Accessibility: use `ariaLabel` / `ariaLabelledby` on this component (NOT a
 * plain `aria-label` attribute on the host `<div>`) — the host div carries no
 * ARIA role, so an attribute placed there is inert to screen readers; this
 * port forwards the label onto each thumb, which is where `role="slider"`
 * actually lives. A slider with no accessible name is a WCAG 4.1.2 failure.
 * Multi-thumb (range) sliders get the SAME label on every thumb — radix-ng
 * (like the upstream registry) has no per-thumb label API.
 *
 * `disabled`: radix-ng 0.50 doesn't gate its own slide handlers on `disabled()`
 * (an upstream gap — dragging still works internally), and the DOM split
 * between the root component tag and its inner styled span means the
 * registry's `data-disabled:opacity-50` variant can't reach the classes at all
 * (see `slider.variants.ts`). This port compensates with `class.opacity-50` +
 * `class.pointer-events-none` + `class.cursor-not-allowed` on `<rdx-slider>`,
 * which reliably blocks pointer dragging and matches the disabled cursor the
 * sibling `uiSwitch` already sets (never rely on dimmed opacity alone as the
 * only disabled signal).
 *
 * KNOWN UPSTREAM GAPS (radix-ng 0.50, confirmed via axe; not fixable from the
 * composing side — the affected bindings are internal host bindings on
 * vendor directives/components, unreachable via content projection, and
 * subclassing radix-ng's signal-query-based components is unreliable, see the
 * `project_radix_ng_component_root_porting` memory). Flagged for the audit
 * pass / DS backlog:
 * - The track container renders its OWN always-tabbable `role="slider"`
 *   (`[rdxSliderImpl]`) with no `aria-valuenow`, alongside each thumb's own
 *   `role="slider"` — every slider is really 2 Tab stops per thumb, and the
 *   container one is a critical `aria-required-attr` violation. A disabled
 *   slider is still 2 focusable, `aria-disabled="true"`-announcing stops
 *   rather than 0 (this port's `tabindex` fix only reaches the thumb it
 *   templates, not the container).
 * - Range (multi-thumb) sliders: each thumb's `aria-valuenow` binds the
 *   RAW `modelValue` array (radix-ng bug — it computes a correct per-thumb
 *   `value()` for the drag/percent math but binds the array to the ARIA
 *   attribute instead), so screen readers hear `aria-valuenow="20,80"` on
 *   BOTH thumbs — an `aria-valid-attr-value` failure. Single-thumb sliders
 *   are unaffected (a 1-element array stringifies to the same value). This
 *   one is NOT compensated (see below) — it's a live signal-driven binding,
 *   so any manual override would be overwritten on the next tick.
 *
 * The container's `role`/`tabindex` above ARE compensated: `[rdxSliderImpl]`
 * sets them as plain STATIC host-metadata strings (`role: 'slider', tabindex:
 * '0'`), not reactive bindings, so once Angular applies them on first render
 * nothing re-asserts them — `ngAfterViewInit` strips both, permanently. This
 * removes the container from the tab order (every slider is back to exactly
 * one Tab stop per thumb) and drops its unlabelled, valueless `role="slider"`
 * (fixes axe `aria-input-field-name` + `aria-required-attr` +
 * `nested-interactive`) without losing anything — the thumb already carries
 * the real, fully-valued `role="slider"`. Pointer/keyboard interaction is
 * untouched (both are wired via `(pointerdown)`/`(keydown)` HostListeners on
 * the same element, independent of `role`/`tabindex`).
 */
@Component({
  selector: '[uiSlider]',
  standalone: true,
  imports: [
    RdxSliderRangeComponent,
    RdxSliderRootComponent,
    RdxSliderThumbComponent,
    RdxSliderTrackComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rdx-slider
      data-slot="slider"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [orientation]="vertical() ? 'vertical' : 'horizontal'"
      [styleClass]="wrapperClasses()"
      [class.opacity-50]="disabled()"
      [class.pointer-events-none]="disabled()"
      [class.cursor-not-allowed]="disabled()"
      [modelValue]="value()"
      (modelValueChange)="value.set($event)"
      (valueCommit)="valueCommit.emit($event)"
    >
      <rdx-slider-track data-slot="slider-track" [class]="trackClass">
        <rdx-slider-range data-slot="slider-range" [class]="rangeClass"></rdx-slider-range>
      </rdx-slider-track>
      @for (thumb of value(); track $index) {
        <rdx-slider-thumb
          data-slot="slider-thumb"
          [class]="thumbClass"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-labelledby]="ariaLabelledby()"
        ></rdx-slider-thumb>
      }
    </rdx-slider>
  `,
})
export class SliderComponent implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly vertical = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });

  readonly value = model<number[]>([0]);
  readonly valueCommit = output<number[]>();

  protected readonly trackClass = SLIDER_TRACK_CLASS;
  protected readonly rangeClass = SLIDER_RANGE_CLASS;
  protected readonly thumbClass = SLIDER_THUMB_CLASS;

  protected readonly wrapperClasses = computed(() => cn(SLIDER_WRAPPER_CLASS, this.className()));

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement.querySelector('[rdxsliderimpl]');
    container?.removeAttribute('role');
    container?.removeAttribute('tabindex');
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { SPINNER_SVG } from './spinner.icons';
import {
  spinnerVariants,
  type SpinnerColor,
  type SpinnerSize,
} from './spinner.variants';

/**
 * Angular port of @force-ui/spinner, reconciled to the Force design spec
 * (`spinner.md`).
 *
 * Attribute selector — usage:
 *   <span uiSpinner></span>                              // default neutral, sm
 *   <span uiSpinner color="primary" size="lg"></span>    // page-level overlay
 *   <span uiSpinner color="onPrimary"></span>            // on a solid primary
 *
 * A Spinner is a visual indicator ONLY. Per the spec it does NOT carry its own
 * `role` or `aria-label` — that would double-announce "loading spinner" with no
 * added information. Instead it is marked `aria-hidden="true"`, and the
 * CONTAINER (button, input, region) owns the semantic state via `aria-busy` and
 * announces start/end in text through an `aria-live` region. This is a
 * deliberate divergence from the registry source, which put
 * `role="status" aria-label="Loading"` on the svg (owner-confirmed).
 *
 * Remove the Spinner from the DOM when the operation completes — do not hide it
 * with `opacity`/`visibility`; removal lets assistive tech announce the end of
 * the wait. Respect delayed appearance for sub-200ms operations and prefer a
 * Skeleton when the shape of incoming content is known (spec guidance).
 *
 * Motion: rotates once per 500ms (linear); under `prefers-reduced-motion` the
 * rotation stops (the arc holds static at full opacity) and the container's
 * `aria-live` text carries the in-progress meaning (WCAG 2.3.3). See
 * `spinner.variants.ts` for why a pulse is not used (1.4.11 contrast).
 */
@Component({
  selector: '[uiSpinner]',
  standalone: true,
  template: '<span class="flex size-full items-center justify-center" [innerHTML]="icon"></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'spinner',
    'aria-hidden': 'true',
    '[attr.data-color]': 'color()',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class SpinnerComponent {
  readonly color = input<SpinnerColor>('default');
  readonly size = input<SpinnerSize>('sm');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /**
   * Inline SVG spinner glyph (single swap point). Bundled statically from
   * `@material-symbols/svg-400`, so bypassing the sanitizer is safe and
   * necessary (Angular's HTML sanitizer strips `<svg>` from `[innerHTML]`).
   */
  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SPINNER_SVG,
  );

  protected readonly classes = computed(() =>
    cn(spinnerVariants({ color: this.color(), size: this.size() }), this.className()),
  );
}

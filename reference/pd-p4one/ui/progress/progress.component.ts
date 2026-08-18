import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  RdxProgressIndicatorDirective,
  RdxProgressRootDirective,
} from '@radix-ng/primitives/progress';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/progress (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <div uiProgress [value]="75" aria-label="Uploading asset (75%)"></div>
 *   <div uiProgress [value]="null" aria-label="Syncing workspace…"></div>  ← indeterminate
 *
 * Accessibility:
 * - The host gets `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and
 *   `aria-valuenow` from the RdxProgressRootDirective (WCAG 1.3.1 / APG progressbar role).
 * - Always supply `aria-label` or `aria-labelledby` on the host — the component cannot
 *   derive an accessible name from its context.
 * - `value=null` → `data-state="indeterminate"`, `aria-valuenow` omitted (APG correct).
 *   The indicator pulses to signal an ongoing operation (WCAG H1).
 * - `valueLabel` accepts a `(value, max) => string` function that drives `aria-valuetext`
 *   — use it to surface human-readable labels like "3 of 5 files".
 * - Screen readers receive value updates via the `progressbar` role. For STATUS-MESSAGE
 *   announcements that must interrupt the user (e.g. "Upload failed"), use a separate
 *   `aria-live="assertive"` region adjacent to the bar — do NOT add aria-live to the
 *   bar itself, which would cause noisy per-tick announcements.
 * - WCAG 1.4.11 note: the `h-1` (4px) track at `bg-primary/20` does not meet 3:1
 *   non-text contrast in isolation. This is an accepted design decision aligned with
 *   the Figma source (base/primary + alpha/20 overlay). The indicator fill (bg-primary)
 *   carries the functional signal; the track is supplementary context.
 */
@Component({
  selector: '[uiProgress]',
  standalone: true,
  imports: [RdxProgressIndicatorDirective],
  hostDirectives: [
    {
      directive: RdxProgressRootDirective,
      inputs: ['value', 'max', 'valueLabel'],
    },
  ],
  template: `
    <div
      rdxProgressIndicator
      data-slot="progress-indicator"
      [class]="indicatorClasses()"
      [style.transform]="indicatorTransform()">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'progress',
    '[class]': 'computedClass()',
  },
})
export class ProgressComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly rdxProgress = inject(RdxProgressRootDirective);

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-primary/20',
      this.className(),
    ),
  );

  protected readonly indicatorClasses = computed(() => {
    const indeterminate = this.rdxProgress.progressState() === 'indeterminate';
    return cn(
      'size-full flex-1 bg-primary motion-reduce:transition-none motion-reduce:animate-none',
      indeterminate ? 'animate-pulse' : 'transition-all',
    );
  });

  protected readonly indicatorTransform = computed(() => {
    const state = this.rdxProgress.progressState();
    if (state === 'indeterminate') return 'translateX(0)';
    const value = this.rdxProgress.value();
    const max = this.rdxProgress.max();
    const pct = value != null ? (value / max) * 100 : 0;
    return `translateX(-${100 - pct}%)`;
  });
}

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { StepperItemComponent } from './stepper-item.component';
import { STEPPER_COMPLETED_SVG } from './stepper.icons';

/**
 * Stepper indicator — the numbered circle. MUST sit inside a
 * `[uiStepperItem]` (reads its `state` via DI, mirrors `ui/toggle-group-item`
 * reading its parent group).
 *
 * Projects the step number (`<ng-content />`, e.g. `<span uiStepperIndicator>1</span>`)
 * until the item is completed, then swaps to a checkmark — this is the
 * generic shadcn-vue `stepper`'s own behaviour (its indicator is a plain
 * numbered circle with no built-in icon swap), extended here per Force's
 * `wizard.md` composition spec: "Completed: A filled checkmark icon in
 * `--force-color-icon-success-accessible`".
 *
 * Colour is reconciled against the Force spec, not copied verbatim from the
 * upstream Vue source: the source's completed state uses the generic neutral
 * `bg-accent`/`text-accent-foreground` pair, but this app's `--accent` token
 * is a neutral grey, not semantic success (see the `feedback_status_token_model`
 * convention — status colours are explicit `-solid`/`on-*` pairs, never a
 * generic accent standing in for meaning). Completed uses `bg-success-solid
 * text-on-success` (the same solid-status pairing `ui/badge`'s `success-solid`
 * variant uses); active uses `bg-primary text-primary-foreground`, matching
 * `wizard.md`'s literal token assignment (`--force-color-bg-primary` for the
 * active indicator) exactly.
 */
@Component({
  selector: '[uiStepperIndicator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-indicator',
    '[attr.data-state]': 'item?.state()',
    '[class]': 'classes()',
  },
  template: `
    @if (item?.state() === 'completed') {
      <span aria-hidden="true" class="[&>svg]:size-4 [&>svg]:fill-current" [innerHTML]="completedIcon"></span>
      <span class="sr-only">Completed:</span>
    } @else {
      <ng-content />
    }
  `,
})
export class StepperIndicatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly item = inject(StepperItemComponent, { optional: true });

  /**
   * Sanitizer-trusted inline SVG checkmark. The markup is bundled from
   * `@material-symbols/svg-400` at build time (trusted, static), so bypassing
   * the sanitizer is safe and necessary (Angular's HTML sanitizer strips
   * `<svg>` from `[innerHTML]`).
   */
  protected readonly completedIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    STEPPER_COMPLETED_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none',
      'data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
      'data-[state=completed]:border-success-solid data-[state=completed]:bg-success-solid data-[state=completed]:text-on-success',
      this.className(),
    ),
  );
}

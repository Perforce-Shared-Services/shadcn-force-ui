import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { StepperComponent } from './stepper.component';

/**
 * Connector line between two stepper items. Sits directly under
 * `[uiStepper]`, as a sibling of `[uiStepperItem]` (not nested inside one).
 *
 * Always neutral (`bg-border`), regardless of the neighbouring steps'
 * completion — `wizard.md`'s composition section is explicit that the
 * connector lines use `--force-color-border-default` with no progress-colour
 * variant, unlike the upstream Vue source (which tints the separator
 * `bg-accent` once its OWN item is completed). Following the spec's literal
 * rule here rather than the generic source, per the port skill's "spec is
 * canon for rules" convention.
 */
@Component({
  selector: '[uiStepperSeparator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-separator',
    'aria-hidden': 'true',
    '[attr.data-orientation]': 'root?.orientation()',
    '[class]': 'classes()',
  },
})
export class StepperSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(StepperComponent, { optional: true });

  protected readonly classes = computed(() =>
    cn(
      'bg-border shrink-0',
      'data-horizontal:h-px data-horizontal:flex-1 data-horizontal:mt-4',
      // Column flex has no cross-axis height to `self-stretch` into (no
      // fixed-height ancestor) — a fixed `h-4` reliably renders a visible
      // connector between two stacked circles regardless of container height.
      'data-vertical:w-px data-vertical:h-4 data-vertical:ml-4',
      this.className(),
    ),
  );
}

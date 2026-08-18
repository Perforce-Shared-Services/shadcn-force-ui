import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/** Stepper step sub-label — a brief one-line hint under the title. */
@Component({
  selector: '[uiStepperDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-description',
    '[class]': 'classes()',
  },
})
export class StepperDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('text-xs text-muted-foreground', this.className()),
  );
}

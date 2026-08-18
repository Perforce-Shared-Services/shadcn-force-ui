import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Optional helper line under a choice's label (e.g. "For individuals and
 * small teams" under a plan name). A plain `<span>`, matching upstream (which
 * ships only the opaque `cn-questionnaire-choice-description` hook with no
 * portable Tailwind) — sized/coloured the same as `ui/field`'s
 * `FieldDescription`.
 */
@Component({
  selector: 'span[uiQuestionnaireChoiceDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-choice-description',
    '[class]': 'classes()',
  },
})
export class QuestionnaireChoiceDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('text-sm font-normal text-muted-foreground', this.className()),
  );
}

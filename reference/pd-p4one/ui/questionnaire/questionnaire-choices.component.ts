import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Layout container for an item's `[uiQuestionnaireChoice]`s (and an optional
 * trailing `[uiQuestionnaireInput]` for a freeform "other" answer).
 *
 * Upstream class: `cn-questionnaire-choices group/questionnaire-choices grid
 * min-w-0` — drops the opaque `cn-questionnaire-choices` hook, keeps the
 * plain-Tailwind rest (including the `group/questionnaire-choices` name,
 * unused by any descendant class today but kept for upstream parity).
 */
@Component({
  selector: '[uiQuestionnaireChoices]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-choices',
    '[class]': 'classes()',
  },
})
export class QuestionnaireChoicesComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('group/questionnaire-choices grid min-w-0 gap-2', this.className()),
  );
}

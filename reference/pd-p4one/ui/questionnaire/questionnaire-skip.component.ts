import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/app/ui/button/button.variants';

import { QuestionnaireComponent } from './questionnaire.component';

/**
 * Skips the active item without answering it — hidden when the active item
 * is `required` (upstream: "QuestionnaireSkip component for intentional
 * non-responses", only meaningful on an optional item). Reuses
 * `buttonVariants()` directly; see `QuestionnairePreviousComponent` for why.
 *
 * Lives as a sibling of `[uiQuestionnaireItem]` (part of the shared
 * navigation row rendered once, not per-item — matching upstream's
 * `<QuestionnaireNavigation />` usage), so it reads the active item's
 * `required` flag from the root, not by injecting an enclosing item.
 */
@Component({
  selector: 'button[uiQuestionnaireSkip]',
  standalone: true,
  template: '<ng-content>Skip</ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-skip',
    type: 'button',
    '[hidden]': 'root?.activeRequired() ?? false',
    '[class]': 'classes()',
    '(click)': 'root?.skip()',
  },
})
export class QuestionnaireSkipComponent {
  readonly variant = input<ButtonVariant>('outline');
  readonly size = input<ButtonSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(QuestionnaireComponent, { optional: true });

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      this.className(),
    ),
  );
}

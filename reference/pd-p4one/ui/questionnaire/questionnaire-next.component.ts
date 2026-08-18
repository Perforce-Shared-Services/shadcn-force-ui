import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/app/ui/button/button.variants';

import { QuestionnaireComponent } from './questionnaire.component';

/**
 * Advances to the next item, validating the active one first (blocked +
 * surfaced via `[uiQuestionnaireError]` if `required` and unanswered). Hidden
 * on the last item — `[uiQuestionnaireSubmit]` takes its place there.
 * `type="button"` so Enter on a mid-flow field doesn't prematurely submit the
 * form; the last item's `[uiQuestionnaireSubmit]` is the only `type="submit"`.
 */
@Component({
  selector: 'button[uiQuestionnaireNext]',
  standalone: true,
  template: '<ng-content>Next</ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-next',
    type: 'button',
    '[hidden]': 'root?.isLast() ?? false',
    '[class]': 'classes()',
    '(click)': 'root?.next()',
  },
})
export class QuestionnaireNextComponent {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(QuestionnaireComponent, { optional: true });

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      this.className(),
    ),
  );
}

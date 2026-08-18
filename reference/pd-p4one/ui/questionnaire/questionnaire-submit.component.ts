import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/app/ui/button/button.variants';

import { QuestionnaireComponent } from './questionnaire.component';

/**
 * Ends the questionnaire on the last item — validates it, then emits the
 * parent `[uiQuestionnaire]`'s `(submitted)` with the full answers snapshot.
 * `type="submit"` (the only nav button that is): lets Enter on the last
 * item's field submit the form, which `QuestionnaireComponent.handleFormSubmit`
 * routes back into the same `submit()` path as a direct click. Hidden on every
 * item except the last — `[uiQuestionnaireNext]` covers the rest.
 */
@Component({
  selector: 'button[uiQuestionnaireSubmit]',
  standalone: true,
  template: '<ng-content>Save answers</ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-submit',
    type: 'submit',
    '[hidden]': '!(root?.isLast() ?? false)',
    '[class]': 'classes()',
  },
})
export class QuestionnaireSubmitComponent {
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

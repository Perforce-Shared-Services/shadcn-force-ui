import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/app/ui/button/button.variants';

import { QuestionnaireComponent } from './questionnaire.component';

/**
 * Goes back one item. Hidden on the first item — reuses `buttonVariants()`
 * directly (§3.5 "reuse existing ui/* first") rather than hand-rolling the
 * opaque `cn-questionnaire-previous` hook upstream ships; the plain-Tailwind
 * grid-placement classes (`col-start-1 row-start-1 justify-self-start`) are
 * kept verbatim from upstream.
 */
@Component({
  selector: 'button[uiQuestionnairePrevious]',
  standalone: true,
  template: '<ng-content>Previous</ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-previous',
    type: 'button',
    '[hidden]': 'root?.isFirst() ?? true',
    '[class]': 'classes()',
    '(click)': 'root?.previous()',
  },
})
export class QuestionnairePreviousComponent {
  readonly variant = input<ButtonVariant>('outline');
  readonly size = input<ButtonSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(QuestionnaireComponent, { optional: true });

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
      this.className(),
    ),
  );
}

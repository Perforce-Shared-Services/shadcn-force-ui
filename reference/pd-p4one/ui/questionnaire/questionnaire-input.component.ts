import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { inputVariants } from '@/app/ui/input/input.variants';

import { QuestionnaireItemComponent } from './questionnaire-item.component';
import { QuestionnaireComponent } from './questionnaire.component';

/**
 * Freeform "other" answer, placed alongside `[uiQuestionnaireChoice]`s inside
 * `[uiQuestionnaireChoices]` (upstream: "Freeform Answers: Combine
 * QuestionnaireChoice with QuestionnaireInput"). Reuses `ui/input`'s
 * `inputVariants()` cva directly (§3.5 "reuse existing ui/* first") rather
 * than hand-rolling the opaque `cn-questionnaire-input` hook upstream ships —
 * this app already has a fully themed input, so there is nothing left to
 * hand-roll.
 *
 * A single item answers EITHER a choice OR the freeform input, never both:
 * typing here clears any selected choice's value (radio: replaces it outright
 * anyway; checkbox: this input isn't meant to combine with multi-select, so it
 * simply becomes the item's answer). `min-h-11 sm:min-h-0` matches upstream's
 * touch-target sizing note for the choice row it sits beside.
 *
 * Both a selected `[uiQuestionnaireChoice]` and this input write the SAME
 * item-level string answer, so a naive display would echo a chosen radio's
 * value back into this field too (confusing — looks like the user typed the
 * choice's own value). Guarded by excluding any string that matches a
 * registered choice's `value` — a real string coincidentally equal to a
 * choice's value is the one edge case this doesn't distinguish, acceptable
 * given the alternative (tracking the answer's source) isn't worth the
 * complexity for a same-value collision this rare.
 */
@Component({
  selector: 'input[uiQuestionnaireInput]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-input',
    type: 'text',
    '[attr.name]': 'item?.name()',
    '[class]': 'classes()',
    '[value]': 'value()',
    '(input)': 'onInput($event)',
  },
})
export class QuestionnaireInputComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly item = inject(QuestionnaireItemComponent, { optional: true });
  private readonly root = inject(QuestionnaireComponent, { optional: true });

  protected readonly value = computed(() => {
    const item = this.item;
    const answer = item && this.root?.answerFor(item.name());
    if (typeof answer !== 'string') return '';
    const isChoiceValue = item?.choicesList().some((choice) => choice.value() === answer);
    return isChoiceValue ? '' : answer;
  });

  protected onInput(event: Event): void {
    if (!this.item || !this.root) return;
    const value = (event.target as HTMLInputElement).value;
    this.root.setAnswer(this.item.name(), value || undefined);
  }

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: 'outline' }), 'min-h-11 sm:min-h-0', this.className()),
  );
}

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { QuestionnaireItemComponent } from './questionnaire-item.component';

/**
 * Validation message for the item's required-and-unanswered state, read
 * from the parent `[uiQuestionnaireItem]`'s `error()` (set by
 * `QuestionnaireComponent.next()`/`.submit()`).
 *
 * Same `role="alert"` + hide-while-empty shape as `ui/field`'s `FieldError`
 * (an empty `role="alert"` is announced as a blank alert by NVDA/JAWS on
 * mount — WCAG 4.1.3) — reimplemented here rather than nesting `FieldError`
 * because the message source is the root's error map, not an `[errors]`
 * input, and the projected-content precedence `FieldError` needs doesn't
 * apply (this component never has children, only the computed message).
 *
 * `id` matches the parent item's `errorId()`, which the item binds as its
 * own `aria-describedby` — wires this message to the fieldset for screen
 * readers (WCAG 4.1.2 / 3.3.1), caught missing in the ux-auditor pass.
 */
@Component({
  selector: '[uiQuestionnaireError]',
  standalone: true,
  template: '{{ message() }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    'data-slot': 'questionnaire-error',
    '[id]': 'item?.errorId()',
    '[hidden]': '!message()',
    '[class]': 'classes()',
  },
})
export class QuestionnaireErrorComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly item = inject(QuestionnaireItemComponent, { optional: true });

  protected readonly message = computed(() => this.item?.error());

  protected readonly classes = computed(() => cn('text-sm text-destructive', this.className()));
}

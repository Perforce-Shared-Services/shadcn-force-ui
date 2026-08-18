import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Supplementary guidance under the item's title. A native `<p>`.
 *
 * Upstream class: `cn-questionnaire-description text-pretty
 * text-muted-foreground` — drops the opaque `cn-questionnaire-description`
 * hook, keeps the plain-Tailwind rest verbatim. Adds `text-sm` (documented
 * addition): the dropped hook almost certainly carried a size in upstream's
 * own stylesheet, and `ui/field`'s `FieldDescription` sibling uses the same
 * `text-sm text-muted-foreground` pairing.
 *
 * Figma (28979:9976) groups Title+Description in a zero-gap "Header" block,
 * then a separate `gap-4` to the next section (Choices) — tried mirroring
 * that with a `[[data-slot=questionnaire-title]+&]:-mt-4` cancel (the same
 * trick `FieldDescription` uses), but a `<legend>` inside a `flex` fieldset
 * doesn't participate in the flex formatting context like a normal child
 * (browsers render it specially, per spec) — the negative margin didn't
 * cancel the gap, it overlapped Title and Description outright. Reverted:
 * Item's uniform `gap-4` between Title/Description/Choices/Error stands,
 * a close-enough approximation over exact zero-gap parity.
 */
@Component({
  selector: 'p[uiQuestionnaireDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-description',
    '[class]': 'classes()',
  },
})
export class QuestionnaireDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('text-pretty text-sm text-muted-foreground', this.className()),
  );
}

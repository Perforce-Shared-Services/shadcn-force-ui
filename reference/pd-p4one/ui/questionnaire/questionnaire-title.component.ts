import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { QuestionnaireItemComponent } from './questionnaire-item.component';

/**
 * The active item's question — a `<legend>` (native fieldset/legend pairing,
 * matching upstream's "title becomes legend" accessibility note).
 *
 * Upstream class: `cn-questionnaire-title cn-font-heading text-pretty`.
 * `cn-questionnaire-title` is an opaque hook private to the upstream
 * registry's own build (dropped); `cn-font-heading` IS a genuine Force UI
 * utility (already used verbatim by `ui/card`, `ui/dialog`, `ui/alert`, …) and
 * `text-pretty` is plain Tailwind — both kept. `text-foreground` +
 * `-webkit-text-fill-color` pin added for the same reason as
 * `ui/field`'s `FieldLegend`: a bare `<legend>` renders near-white in this
 * app's cascade otherwise (WCAG 1.4.3), see that component's JSDoc.
 *
 * Size verified against Figma (28979:9977): `text/base/font-size` (16px) at
 * `font-weight/medium` (500), `leading-[1.375]`. Written as `text-[1rem]`
 * rather than the stock `text-base` utility — same gotcha as `FieldLegend`:
 * this app's `tailwind.css` repurposes `text-base` as a COLOR token
 * (`--color-base`), so it would shadow the font-size instead of setting it.
 *
 * `multiple` (checkbox-type) required items append a "(required)" text
 * suffix, real content inside the legend so it's part of the fieldset's
 * accessible name automatically, no extra ARIA needed. `[uiQuestionnaireItem]`
 * can't carry `aria-required` itself (fieldset's implicit role is "group",
 * which doesn't support it — see that component's JSDoc) and native
 * `required` on a checkbox means "THIS box", not "at least one" — so a
 * `multiple` required item had NO signal at all that it needed an answer
 * before the reader hit the Next-button error (WCAG 3.3.2, caught in audit).
 * `radio`-type items are unaffected — native `required` on the radio group
 * already carries this for free (see `QuestionnaireChoiceComponent`).
 */
@Component({
  selector: 'legend[uiQuestionnaireTitle]',
  standalone: true,
  template: `<ng-content />@if (showRequiredHint()) {
      <span data-slot="questionnaire-title-required"> (required)</span>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-title',
    '[class]': 'classes()',
  },
})
export class QuestionnaireTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly item = inject(QuestionnaireItemComponent, { optional: true });

  protected readonly showRequiredHint = computed(
    () => (this.item?.required() ?? false) && (this.item?.multiple() ?? false),
  );

  protected readonly classes = computed(() =>
    cn(
      'cn-font-heading text-pretty text-[1rem] font-medium leading-[1.375] text-foreground [-webkit-text-fill-color:var(--foreground)]',
      this.className(),
    ),
  );
}

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  type OnDestroy,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { QuestionnaireComponent } from './questionnaire.component';
import type { QuestionnaireChoiceComponent } from './questionnaire-choice.component';

/**
 * One question — a native `<fieldset>`, matching upstream's accessibility
 * note ("renders semantic fieldset; title becomes legend"). Registers with
 * the parent `[uiQuestionnaire]` (the same DI-registration pattern
 * `ui/stepper`'s `StepperItemComponent` uses) so the root can order items,
 * track which one is active, and validate the active one on Next/Submit.
 *
 * Inactive items stay mounted but `hidden` + `inert` (upstream: "Inactive
 * items remain hidden and inert") — so answers on other items survive
 * navigation without re-querying the DOM.
 *
 * `multiple` picks radio vs. checkbox semantics for descendant
 * `[uiQuestionnaireChoice]`s (read directly via DI, no separate context
 * needed). `required` blocks Next/Submit until answered; gate a Skip
 * button's visibility on `!required()` in the template (Skip is a no-op on
 * the root when the active item is required).
 *
 * `tabindex="-1"` (always present, not just while active) makes the
 * fieldset a valid programmatic focus target without joining the Tab order
 * — the root calls `focusElement()` after Previous/Next/Skip moves
 * `activeItem` so a keyboard user's focus follows the step instead of
 * staying stranded on the nav button (WCAG 2.4.3, caught in audit).
 * `aria-describedby` (pointing at `[uiQuestionnaireError]`'s id, wired below)
 * gives the group's invalid state an ARIA signal beyond the one-time alert.
 * Required is signalled natively instead — the fieldset's ARIA role is
 * "group", which does NOT support `aria-required` (axe `aria-allowed-attr`,
 * caught immediately after adding it); each `[uiQuestionnaireChoice]`'s
 * native radio/checkbox input carries the real HTML `required` attribute
 * instead (always valid, no ARIA involved — see that component).
 */
@Component({
  selector: 'fieldset[uiQuestionnaireItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-item',
    '[attr.data-active]': "active() ? '' : null",
    '[hidden]': '!active()',
    '[attr.inert]': "active() ? null : ''",
    '[attr.tabindex]': '-1',
    '[attr.aria-describedby]': "error() ? errorId() : null",
    '[class]': 'classes()',
  },
})
export class QuestionnaireItemComponent implements OnDestroy {
  readonly name = input.required<string>();
  readonly required = input(false, { transform: booleanAttribute });
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(QuestionnaireComponent, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLFieldSetElement>);

  private readonly choices = signal<QuestionnaireChoiceComponent[]>([]);

  readonly active = computed(() => this.root?.activeItemName() === this.name());
  readonly error = computed(() => this.root?.errorFor(this.name()));
  /** Stable id for `[uiQuestionnaireError]` to claim, referenced by `aria-describedby` above. */
  readonly errorId = computed(() => `questionnaire-error-${this.name()}`);

  constructor() {
    this.root?.registerItem(this);
  }

  /** Called by the root after navigation moves `activeItem` to this item. */
  focusElement(): void {
    this.elementRef.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.root?.unregisterItem(this);
  }

  /** Registered by each descendant `[uiQuestionnaireChoice]` (for shortcut ordering). */
  registerChoice(choice: QuestionnaireChoiceComponent): void {
    this.choices.update((choices) => [...choices, choice]);
  }

  unregisterChoice(choice: QuestionnaireChoiceComponent): void {
    this.choices.update((choices) => choices.filter((c) => c !== choice));
  }

  choicesList(): QuestionnaireChoiceComponent[] {
    return this.choices();
  }

  protected readonly classes = computed(() =>
    cn(
      // Upstream: `cn-questionnaire-item min-w-0 border-0 p-0 outline-none`
      // — `cn-questionnaire-item` is an opaque hook private to the upstream
      // registry's own build; the rest is plain Tailwind, kept verbatim.
      'flex min-w-0 flex-col gap-4 border-0 p-0 outline-none',
      this.className(),
    ),
  );
}

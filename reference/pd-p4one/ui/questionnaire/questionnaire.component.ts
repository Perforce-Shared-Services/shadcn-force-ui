import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import type { QuestionnaireChoiceComponent } from './questionnaire-choice.component';
import type { QuestionnaireItemComponent } from './questionnaire-item.component';

/** Keyboard-shortcut mode for selecting a choice in the active item. */
export enum QuestionnaireShortcutMode {
  None = 'none',
  Letters = 'letters',
  Numbers = 'numbers',
}

/** A single question's answer — one value, or several for a `multiple` item. */
export type QuestionnaireAnswer = string | string[];

/**
 * Angular build of shadcn's `Questionnaire` (ui.shadcn.com "Base" registry —
 * NOT `@force-ui`; searched the full `@force-ui` registry, no match) — root.
 *
 * NOT a byte-parity port. The upstream React source
 * (`ui.shadcn.com/docs/components/radix/questionnaire`) is a thin styling
 * layer over a proprietary headless engine, `@shadcn/react/questionnaire`,
 * whose behavior (active-item tracking, per-item validation, keyboard
 * shortcuts, FormData submission) isn't published in the registry JSON and
 * has no Angular/radix-ng equivalent — same situation as `ui/stepper`. Most of
 * the upstream class strings are also opaque `cn-questionnaire-*` hooks
 * private to that registry's own build (unlike `@force-ui`'s registry, which
 * ships fully expanded Tailwind); only the plain-Tailwind fragments (e.g. the
 * Actions grid, `cn-font-heading`) are portable verbatim. So this is a
 * from-scratch state engine + visual composition built from this app's own
 * Force UI tokens and existing `ui/*` parts (`uiInput`, `uiKbd`,
 * `buttonVariants`) — see the per-file JSDoc for what was reused vs.
 * hand-rolled and why.
 *
 * Architecture deviation from upstream: React's `items` prop feeds both
 * validation metadata AND (optionally) fully generated markup; the real
 * examples never use the generated path, they always hand-write
 * `<QuestionnaireItem>` children. Angular has no need for a parallel
 * declarative array — each `[uiQuestionnaireItem]` declares its own
 * `name`/`required`/`multiple` directly and self-registers with the root
 * (the same DI-registration pattern `ui/stepper` uses), eliminating the
 * upstream's items-array/JSX duplication entirely.
 *
 * Usage:
 *   <form uiQuestionnaire [(activeItem)]="step" [(values)]="answers"
 *         shortcuts="letters" (submitted)="onSubmit($event)">
 *     <span uiQuestionnaireProgress></span>
 *     <fieldset uiQuestionnaireItem name="direction" required>
 *       <legend uiQuestionnaireTitle>What should we prototype next?</legend>
 *       <p uiQuestionnaireDescription>Choose one direction.</p>
 *       <div uiQuestionnaireChoices>
 *         <label uiQuestionnaireChoice value="delegation">Sub-agent delegation</label>
 *         …
 *       </div>
 *       <div uiQuestionnaireError></div>
 *     </fieldset>
 *     <div uiQuestionnaireActions>
 *       <button uiQuestionnairePrevious></button>
 *       <button uiQuestionnaireSkip></button>
 *       <button uiQuestionnaireNext></button>
 *       <button uiQuestionnaireSubmit></button>
 *     </div>
 *   </form>
 *
 * `activeItem` / `values` are two-way `model()`s so a caller can resume a
 * saved run (upstream's "Resume" feature) or drive navigation externally
 * (upstream's "Controlled State" feature) — set them from outside like any
 * other Angular two-way binding.
 *
 * Validation: `next()`/`submit()` block on the active item when `required`
 * and unanswered, surfaced via `errorFor()` (read by `[uiQuestionnaireError]`).
 * `skip()` bypasses validation and is a no-op on a `required` item — gate the
 * Skip button's visibility on `!item.required()` in the template.
 */
@Component({
  selector: 'form[uiQuestionnaire]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire',
    novalidate: '',
    '[class]': 'classes()',
    '(submit)': 'handleFormSubmit($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class QuestionnaireComponent {
  /** Active item's `name`. Defaults to the first registered item. */
  readonly activeItem = model<string | undefined>(undefined);
  /** Answers keyed by item `name`. A `multiple` item's value is `string[]`. */
  readonly values = model<Record<string, QuestionnaireAnswer>>({});
  /** Digit (`numbers`) or letter (`letters`) keys select a choice in the active item. */
  readonly shortcuts = input<QuestionnaireShortcutMode>(QuestionnaireShortcutMode.None);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Emitted once, on a valid Submit (last item) — a snapshot of `values()`. */
  readonly submitted = output<Record<string, QuestionnaireAnswer>>();

  private readonly items = signal<QuestionnaireItemComponent[]>([]);
  private readonly errors = signal<Record<string, string>>({});

  /** Registered by each descendant `[uiQuestionnaireItem]` (constructor/`ngOnDestroy`). */
  registerItem(item: QuestionnaireItemComponent): void {
    this.items.update((items) => [...items, item]);
  }

  unregisterItem(item: QuestionnaireItemComponent): void {
    this.items.update((items) => items.filter((i) => i !== item));
  }

  private readonly orderedNames = computed(() => this.items().map((item) => item.name()));

  /** The active item's `name` — falls back to the first registered item. */
  readonly activeItemName = computed(() => this.activeItem() ?? this.orderedNames()[0]);

  private readonly activeIndex = computed(() =>
    Math.max(0, this.orderedNames().indexOf(this.activeItemName())),
  );

  /** Total registered items — drives `[uiQuestionnaireProgress]`. */
  readonly total = computed(() => this.items().length);
  /** 1-indexed position of the active item — drives `[uiQuestionnaireProgress]`. */
  readonly current = computed(() => this.activeIndex() + 1);
  readonly isFirst = computed(() => this.activeIndex() <= 0);
  readonly isLast = computed(() => this.activeIndex() >= this.total() - 1);
  /** Whether the active item is `required` — drives `[uiQuestionnaireSkip]`'s visibility. */
  readonly activeRequired = computed(() => this.currentItemComponent()?.required() ?? false);

  private currentItemComponent(): QuestionnaireItemComponent | undefined {
    return this.items()[this.activeIndex()];
  }

  /** Read by `[uiQuestionnaireError]` for a given item name. */
  errorFor(name: string): string | undefined {
    return this.errors()[name];
  }

  /** Read by `[uiQuestionnaireChoice]` / `[uiQuestionnaireInput]` to render checked/value state. */
  answerFor(name: string): QuestionnaireAnswer | undefined {
    return this.values()[name];
  }

  /** Called by `[uiQuestionnaireChoice]` / `[uiQuestionnaireInput]` on user interaction. */
  setAnswer(name: string, value: QuestionnaireAnswer | undefined): void {
    this.values.update((values) => {
      const next = { ...values };
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        delete next[name];
      } else {
        next[name] = value;
      }
      return next;
    });
    this.clearError(name);
  }

  private clearError(name: string): void {
    if (!(name in this.errors())) return;
    this.errors.update((errors) => {
      const next = { ...errors };
      delete next[name];
      return next;
    });
  }

  private setError(name: string, message: string): void {
    this.errors.update((errors) => ({ ...errors, [name]: message }));
  }

  private validateCurrent(): boolean {
    const item = this.currentItemComponent();
    if (!item || !item.required()) return true;
    const answer = this.answerFor(item.name());
    const answered = Array.isArray(answer) ? answer.length > 0 : !!answer;
    if (!answered) {
      this.setError(item.name(), 'This question is required. Choose an answer to continue.');
      return false;
    }
    return true;
  }

  previous(): void {
    if (this.isFirst()) return;
    this.goTo(this.activeIndex() - 1);
  }

  next(): void {
    if (!this.validateCurrent()) return;
    if (this.isLast()) {
      this.submit();
      return;
    }
    this.goTo(this.activeIndex() + 1);
  }

  /** No-op on a `required` active item — gate the button's visibility instead. */
  skip(): void {
    const item = this.currentItemComponent();
    if (!item || item.required()) return;
    this.clearError(item.name());
    if (this.isLast()) {
      this.submit();
      return;
    }
    this.goTo(this.activeIndex() + 1);
  }

  /**
   * Moves to the item at `index` and moves keyboard focus there too —
   * without this, focus stays on the nav button (now DOM-*before* the
   * freshly-unhidden item), stranding a keyboard user on Tab (WCAG 2.4.3,
   * caught in audit). `setTimeout` defers past the `[hidden]` binding's own
   * change-detection flush — focusing a still-hidden element is a no-op in
   * every browser.
   */
  private goTo(index: number): void {
    const target = this.items()[index];
    this.activeItem.set(this.orderedNames()[index]);
    setTimeout(() => target?.focusElement());
  }

  submit(): void {
    if (!this.validateCurrent()) return;
    this.submitted.emit({ ...this.values() });
  }

  protected handleFormSubmit(event: SubmitEvent): void {
    // Always client-side — this is a multi-step wizard, not a page post.
    event.preventDefault();
    if (this.isLast()) this.submit();
  }

  /**
   * Digit/letter shortcuts select a choice by its position among the active
   * item's registered choices (1-indexed for numbers, a/b/c… for letters).
   *
   * Skips when the event originates from a text-entry control — otherwise
   * every keystroke typed into `[uiQuestionnaireInput]` (the freeform "other"
   * answer, which lives in the same form) that happens to match a choice's
   * shortcut letter/digit gets hijacked and `preventDefault()`'d instead of
   * reaching the field. Reproduced live in the shipped `Playground` story
   * (default `shortcuts="letters"` + a 3-choice item with a freeform input):
   * typing "a"/"b"/"c" into "Type another direction…" was silently swallowed
   * — caught by the ux-auditor pass (WCAG 2.1.1 / H3).
   */
  protected handleKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'text') return;
    if (target.tagName === 'TEXTAREA') return;

    const mode = this.shortcuts();
    if (mode === QuestionnaireShortcutMode.None) return;
    const item = this.currentItemComponent();
    if (!item) return;

    const choices = item.choicesList();
    let index = -1;
    if (mode === QuestionnaireShortcutMode.Numbers && /^[1-9]$/.test(event.key)) {
      index = Number(event.key) - 1;
    } else if (mode === QuestionnaireShortcutMode.Letters && /^[a-zA-Z]$/.test(event.key)) {
      index = event.key.toLowerCase().charCodeAt(0) - 97;
    }
    if (index < 0 || index >= choices.length) return;

    const choice: QuestionnaireChoiceComponent = choices[index];
    if (choice.disabled()) return;
    event.preventDefault();
    choice.select();
  }

  // gap-2 verified against Figma (28979:9969) — the outer stack (Progress,
  // Item, Actions) uses spacing/2 (8px); Item's OWN internal gap (Header
  // block, Choices, Error) is a separate, larger gap-4 — see
  // QuestionnaireItemComponent.
  protected readonly classes = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-2', this.className()),
  );
}

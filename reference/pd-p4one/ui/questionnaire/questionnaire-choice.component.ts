import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { KbdComponent } from '@/app/ui/kbd/kbd.component';

import { QuestionnaireItemComponent } from './questionnaire-item.component';
import { QuestionnaireComponent, QuestionnaireShortcutMode } from './questionnaire.component';
import { QUESTIONNAIRE_CHOICE_CHECK_SVG } from './questionnaire.icons';

/**
 * One selectable answer inside `[uiQuestionnaireChoices]` — a bordered card
 * (`<label>`) wrapping a hidden native radio/checkbox input (real keyboard +
 * screen reader semantics for free) plus a hand-rolled indicator. Card shape
 * verified against Figma (28979:10041, `Questionnaire / Choice` variant set —
 * 2 Type × 2 Active × 5 State): the upstream fetched React source ships this
 * whole card as an opaque `cn-questionnaire-choice` hook with NO visible
 * classes at all, so the actual visual (border, checked wash, hover/focus/
 * invalid) came entirely from Figma, not the registry — a genuine gap the
 * `sync-figma-component` step exists to catch (initial port guessed a
 * borderless list-row from the class-string absence; wrong).
 *
 * Card states (all Figma-verified, `base/*` tokens):
 * - Default: `border-border`.
 * - Checked (`data-checked`): `border-primary` + `bg-control-primary-wash`
 *   (a NEW token — primary at 5%/10% alpha light/dark, see `tailwind.css`;
 *   distinct from `bg-primary-subtle`, which is an opaque flattened tint).
 * - Hover, unchecked only: `bg-muted` (Figma: `base/muted` newly bound vs.
 *   Default). Checked hover looked visually identical to checked Default in
 *   the Figma screenshot, so no separate override.
 * - Focus (`has-[:focus-visible]`, since the real focusable element is the
 *   hidden input, not the label): `border-ring` + `ring-3 ring-ring/50` — Figma's
 *   `custom/focus-ring` (`#5405ff80` = primary @ 50%) matches this app's
 *   existing `ring-ring/50` convention (button/input/checkbox/radio-group)
 *   exactly; no new token needed.
 * - Invalid (`data-invalid`, driven by the parent item's validation error —
 *   see `item.error()`): `border-destructive` + `ring-3 ring-destructive/20`
 *   (`dark:ring-destructive/40`) — Figma's `custom/destructive-ring`
 *   (`#d1132333` = destructive @ 20%) matches the SAME existing convention
 *   already used by `ui/checkbox`/`ui/radio-group`'s `aria-invalid:` classes.
 * - Disabled (`data-disabled`): `opacity-50 cursor-not-allowed
 *   pointer-events-none` (already this app's standard disabled treatment).
 *
 * Label weight is Figma-verified to depend on `type`: Radio's label is
 * regular (400, no override), Checkbox's label is `font-medium` (500) — a
 * real, intentional distinction, not an oversight; applied on the label
 * wrapper (not left to projected content) so callers don't need to know it.
 *
 * radio vs. checkbox is read from the parent `[uiQuestionnaireItem]`'s
 * `multiple` input — no separate context needed. Selecting a checkbox-style
 * choice toggles it in/out of the item's `string[]` answer; a radio-style
 * choice replaces the item's answer outright (and, being real native radios
 * sharing one `name`, is mutually exclusive with any other choice in the same
 * item for free).
 *
 * A radio-type input carries native `required` when the item is (the form
 * has `novalidate`, so this never triggers a native validation popup — it's
 * a pure semantic/AT hint alongside the app's own validation). Native
 * `required` means "one radio in this `name` group must be checked", which
 * is exactly the item-level "answer this question" semantics — but the same
 * attribute means something DIFFERENT on a checkbox ("THIS box must be
 * checked", not "at least one of the group"), so it's intentionally NEVER
 * set on checkbox-type choices (would wrongly demand every box checked).
 * `[uiQuestionnaireItem]`'s own `aria-required` was tried first and reverted
 * — a `<fieldset>`'s implicit ARIA role is "group", which doesn't support
 * `aria-required` at all (axe `aria-allowed-attr`, caught live).
 *
 * Digit/letter shortcuts (`[uiQuestionnaire shortcuts="numbers"|"letters"]`)
 * are resolved by the root from this choice's position among its item's
 * registered choices — see `select()`, called directly by
 * `QuestionnaireComponent.handleKeydown`. Figma models the shortcut badge as
 * a hidden-by-default `showShortcut` field reusing `ui/kbd` — matches this
 * component's own `shortcutLabel()`-gated `<kbd uiKbd>` exactly. `aria-hidden`
 * on the badge — it's a decorative hint at an alternate input method, not
 * part of what distinguishes this answer from the others; without it, the
 * letter/number got read as trailing noise on every choice's accessible name
 * (WCAG 1.3.1/4.1.2, caught in audit).
 *
 * Indicator: hand-rolled (dot for Radio, check icon for Checkbox), matching
 * upstream's own approach (it doesn't reuse `Radio`/`Checkbox` either — see
 * `group-data-[type=radio]/questionnaire-choice:rounded-full`). Figma's
 * checkbox indicator radius is `border-radius/rounded-xs` (2px) — NOT this
 * app's own `ui/checkbox` component's `rounded-[4px]`; a real, Figma-verified
 * difference between the two, not a copy-paste slip.
 */
@Component({
  selector: 'label[uiQuestionnaireChoice]',
  standalone: true,
  imports: [KbdComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-choice',
    '[attr.data-type]': 'type()',
    '[attr.data-checked]': "checked() ? '' : null",
    '[attr.data-disabled]': "disabled() ? '' : null",
    '[attr.data-invalid]': "invalid() ? '' : null",
    '[attr.data-shortcut]': "shortcutLabel() ? '' : null",
    '[class]': 'classes()',
  },
  template: `
    <input
      data-slot="questionnaire-choice-input"
      class="absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      [type]="type()"
      [name]="type() === 'radio' ? item?.name() : null"
      [value]="value()"
      [checked]="checked()"
      [disabled]="disabled()"
      [required]="type() === 'radio' && (item?.required() ?? false)"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      (change)="select()"
    />
    <span
      aria-hidden="true"
      data-slot="questionnaire-choice-indicator"
      class="pointer-events-none relative mt-[3px] flex size-4 shrink-0 items-center justify-center border border-input transition-colors motion-reduce:transition-none group-data-[type=radio]/questionnaire-choice:rounded-full group-data-[type=checkbox]/questionnaire-choice:rounded-[2px] group-data-checked/questionnaire-choice:border-primary group-data-checked/questionnaire-choice:bg-primary"
    >
      <span
        data-slot="questionnaire-choice-indicator-dot"
        class="hidden size-2 rounded-full bg-primary-foreground group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
      ></span>
      <span
        data-slot="questionnaire-choice-indicator-check"
        class="hidden [&>svg]:size-3 [&>svg]:fill-current group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block text-primary-foreground"
        [innerHTML]="checkIcon"
      ></span>
    </span>
    <span
      data-slot="questionnaire-choice-label"
      class="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-snug"
      [class.font-medium]="type() === 'checkbox'"
    >
      <ng-content />
    </span>
    @if (shortcutLabel(); as label) {
      <kbd
        uiKbd
        aria-hidden="true"
        data-slot="questionnaire-choice-shortcut"
        class="pointer-events-none ms-auto shrink-0"
        >{{ label }}</kbd
      >
    }
  `,
})
export class QuestionnaireChoiceComponent implements OnInit, OnDestroy {
  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly item = inject(QuestionnaireItemComponent, { optional: true });
  private readonly root = inject(QuestionnaireComponent, { optional: true });
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly checkIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    QUESTIONNAIRE_CHOICE_CHECK_SVG,
  );

  protected readonly type = computed<'radio' | 'checkbox'>(() =>
    this.item?.multiple() ? 'checkbox' : 'radio',
  );

  protected readonly checked = computed(() => {
    if (!this.item) return false;
    const answer = this.root?.answerFor(this.item.name());
    return Array.isArray(answer) ? answer.includes(this.value()) : answer === this.value();
  });

  /** True while the parent item has a validation error — see `QuestionnaireErrorComponent`. */
  protected readonly invalid = computed(() => !!this.item?.error());

  protected readonly shortcutLabel = computed<string | undefined>(() => {
    const mode = this.root?.shortcuts();
    if (!this.item || !mode || mode === QuestionnaireShortcutMode.None) return undefined;
    const index = this.item.choicesList().indexOf(this);
    if (index < 0) return undefined;
    return mode === QuestionnaireShortcutMode.Numbers
      ? String(index + 1)
      : String.fromCharCode(97 + index).toUpperCase();
  });

  ngOnInit(): void {
    this.item?.registerChoice(this);
  }

  ngOnDestroy(): void {
    this.item?.unregisterChoice(this);
  }

  /** Selects this choice — called on native `(change)` and by keyboard shortcuts. */
  select(): void {
    if (this.disabled() || !this.item || !this.root) return;
    const name = this.item.name();
    if (this.item.multiple()) {
      const current = this.root.answerFor(name);
      const arr = Array.isArray(current) ? current : [];
      const value = this.value();
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      this.root.setAnswer(name, next);
    } else {
      this.root.setAnswer(name, this.value());
    }
  }

  protected readonly classes = computed(() =>
    cn(
      'group/questionnaire-choice relative flex w-full cursor-pointer items-start gap-2.5 rounded-lg border border-border px-3 py-2.5 text-start transition-colors motion-reduce:transition-none outline-none select-none',
      'not-data-disabled:not-data-checked:hover:bg-muted',
      'has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
      'data-checked:border-primary data-checked:bg-control-primary-wash',
      'data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40',
      'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
      this.className(),
    ),
  );
}

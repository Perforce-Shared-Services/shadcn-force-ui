import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  type OnDestroy,
} from "@angular/core"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonSize, type ButtonVariant } from "@/angular-ui/button"
import { inputVariants } from "@/angular-ui/input"

import {
  questionnaireActionBase,
  questionnaireActionsVariants,
  questionnaireChoiceDescriptionVariants,
  questionnaireChoicesVariants,
  questionnaireDescriptionVariants,
  questionnaireErrorVariants,
  questionnaireInputBase,
  questionnaireItemVariants,
  questionnaireTitleVariants,
  questionnaireVariants,
} from "./questionnaire.variants"
import type { QuestionnaireChoiceComponent } from "./questionnaire-choice.component"

/** Keyboard-shortcut mode for selecting a choice in the active item. */
export enum QuestionnaireShortcutMode {
  None = "none",
  Letters = "letters",
  Numbers = "numbers",
}

/** A single question's answer — one value, or several for a `multiple` item. */
export type QuestionnaireAnswer = string | string[]

/**
 * `[uiQuestionnaire]` — a multi-step questionnaire root: single-choice,
 * multiple-choice and freeform questions with per-item validation, progress
 * and Previous/Skip/Next/Submit navigation.
 *
 * Force UI original (no React/radix registry equivalent — same situation as
 * `ui/stepper`): a state engine + composition of existing registry parts
 * (`buttonVariants`, `inputVariants`). Each descendant
 * `[uiQuestionnaireItem]` declares its own `name`/`required`/`multiple` and
 * self-registers here — no parallel `items` array input (an intentional
 * Angular-idiomatic simplification over the upstream React API).
 *
 * `activeItem` / `values` are two-way `model()`s so a caller can resume a
 * saved run or drive navigation externally. Validation: `next()`/`submit()`
 * block on the active item when `required` and unanswered, surfaced via
 * `errorFor()` (read by `[uiQuestionnaireError]`). `skip()` bypasses
 * validation and is a no-op on a `required` item — gate the Skip button's
 * visibility on `!item.required()` in the template.
 */
@Component({
  selector: "form[uiQuestionnaire]",
  standalone: true,
  templateUrl: "./questionnaire.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire",
    novalidate: "",
    "[class]": "classes()",
    "(submit)": "handleFormSubmit($event)",
    "(keydown)": "handleKeydown($event)",
  },
})
export class QuestionnaireComponent {
  /** Active item's `name`. Defaults to the first registered item. */
  readonly activeItem = model<string | undefined>(undefined)
  /** Answers keyed by item `name`. A `multiple` item's value is `string[]`. */
  readonly values = model<Record<string, QuestionnaireAnswer>>({})
  /** Digit (`numbers`) or letter (`letters`) keys select a choice in the active item. */
  readonly shortcuts = input<QuestionnaireShortcutMode>(QuestionnaireShortcutMode.None)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Emitted once, on a valid Submit (last item) — a snapshot of `values()`. */
  readonly submitted = output<Record<string, QuestionnaireAnswer>>()

  private readonly items = signal<QuestionnaireItemComponent[]>([])
  private readonly errors = signal<Record<string, string>>({})

  /** Registered by each descendant `[uiQuestionnaireItem]` (constructor/`ngOnDestroy`). */
  registerItem(item: QuestionnaireItemComponent): void {
    this.items.update((items) => [...items, item])
  }

  unregisterItem(item: QuestionnaireItemComponent): void {
    this.items.update((items) => items.filter((i) => i !== item))
  }

  private readonly orderedNames = computed(() => this.items().map((item) => item.name()))

  /** The active item's `name` — falls back to the first registered item. */
  readonly activeItemName = computed(() => this.activeItem() ?? this.orderedNames()[0])

  private readonly activeIndex = computed(() =>
    Math.max(0, this.orderedNames().indexOf(this.activeItemName())),
  )

  /** Total registered items — drives `[uiQuestionnaireProgress]`. */
  readonly total = computed(() => this.items().length)
  /** 1-indexed position of the active item — drives `[uiQuestionnaireProgress]`. */
  readonly current = computed(() => this.activeIndex() + 1)
  readonly isFirst = computed(() => this.activeIndex() <= 0)
  readonly isLast = computed(() => this.activeIndex() >= this.total() - 1)
  /** Whether the active item is `required` — drives `[uiQuestionnaireSkip]`'s visibility. */
  readonly activeRequired = computed(() => this.currentItemComponent()?.required() ?? false)

  private currentItemComponent(): QuestionnaireItemComponent | undefined {
    return this.items()[this.activeIndex()]
  }

  /** Read by `[uiQuestionnaireError]` for a given item name. */
  errorFor(name: string): string | undefined {
    return this.errors()[name]
  }

  /** Read by `[uiQuestionnaireChoice]` / `[uiQuestionnaireInput]` to render checked/value state. */
  answerFor(name: string): QuestionnaireAnswer | undefined {
    return this.values()[name]
  }

  /** Called by `[uiQuestionnaireChoice]` / `[uiQuestionnaireInput]` on user interaction. */
  setAnswer(name: string, value: QuestionnaireAnswer | undefined): void {
    this.values.update((values) => {
      const next = { ...values }
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        delete next[name]
      } else {
        next[name] = value
      }
      return next
    })
    this.clearError(name)
  }

  private clearError(name: string): void {
    if (!(name in this.errors())) return
    this.errors.update((errors) => {
      const next = { ...errors }
      delete next[name]
      return next
    })
  }

  private setError(name: string, message: string): void {
    this.errors.update((errors) => ({ ...errors, [name]: message }))
  }

  private validateCurrent(): boolean {
    const item = this.currentItemComponent()
    if (!item || !item.required()) return true
    const answer = this.answerFor(item.name())
    const answered = Array.isArray(answer) ? answer.length > 0 : !!answer
    if (!answered) {
      this.setError(item.name(), "This question is required. Choose an answer to continue.")
      return false
    }
    return true
  }

  previous(): void {
    if (this.isFirst()) return
    this.goTo(this.activeIndex() - 1)
  }

  next(): void {
    if (!this.validateCurrent()) return
    if (this.isLast()) {
      this.submit()
      return
    }
    this.goTo(this.activeIndex() + 1)
  }

  /** No-op on a `required` active item — gate the button's visibility instead. */
  skip(): void {
    const item = this.currentItemComponent()
    if (!item || item.required()) return
    this.clearError(item.name())
    if (this.isLast()) {
      this.submit()
      return
    }
    this.goTo(this.activeIndex() + 1)
  }

  /**
   * Moves to the item at `index` and moves keyboard focus there too — without
   * this, focus stays on the nav button (now DOM-before the freshly-unhidden
   * item), stranding a keyboard user on Tab (WCAG 2.4.3). `setTimeout`
   * defers past the `[hidden]` binding's own change-detection flush —
   * focusing a still-hidden element is a no-op in every browser.
   */
  private goTo(index: number): void {
    const target = this.items()[index]
    this.activeItem.set(this.orderedNames()[index])
    setTimeout(() => target?.focusElement())
  }

  submit(): void {
    if (!this.validateCurrent()) return
    this.submitted.emit({ ...this.values() })
  }

  protected handleFormSubmit(event: SubmitEvent): void {
    // Always client-side — this is a multi-step wizard, not a page post.
    event.preventDefault()
    if (this.isLast()) this.submit()
  }

  /**
   * Digit/letter shortcuts select a choice by its position among the active
   * item's registered choices (1-indexed for numbers, a/b/c… for letters).
   * Skips when the event originates from a text-entry control — otherwise
   * keystrokes typed into `[uiQuestionnaireInput]` matching a shortcut
   * letter/digit would be hijacked instead of reaching the field (WCAG 2.1.1).
   */
  protected handleKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement
    if (target.tagName === "INPUT" && (target as HTMLInputElement).type === "text") return
    if (target.tagName === "TEXTAREA") return

    const mode = this.shortcuts()
    if (mode === QuestionnaireShortcutMode.None) return
    const item = this.currentItemComponent()
    if (!item) return

    const choices = item.choicesList()
    let index = -1
    if (mode === QuestionnaireShortcutMode.Numbers && /^[1-9]$/.test(event.key)) {
      index = Number(event.key) - 1
    } else if (mode === QuestionnaireShortcutMode.Letters && /^[a-zA-Z]$/.test(event.key)) {
      index = event.key.toLowerCase().charCodeAt(0) - 97
    }
    if (index < 0 || index >= choices.length) return

    const choice: QuestionnaireChoiceComponent = choices[index]
    if (choice.disabled()) return
    event.preventDefault()
    choice.select()
  }

  protected readonly classes = computed(() =>
    cn(questionnaireVariants(), this.className()),
  )
}

/**
 * One question — a native `<fieldset>` (title becomes its `<legend>`,
 * preserving semantics). Registers with the parent `[uiQuestionnaire]` so the
 * root can order items, track which one is active, and validate the active one
 * on Next/Submit. Inactive items stay mounted but `hidden` + `inert`, so
 * answers on other items survive navigation without re-querying the DOM.
 *
 * `multiple` picks radio vs checkbox semantics for descendant
 * `[uiQuestionnaireChoice]`s. `required` blocks Next/Submit until answered.
 * `tabindex="-1"` makes the fieldset a valid programmatic focus target
 * without joining the Tab order; `aria-describedby` points at
 * `[uiQuestionnaireError]`'s id while invalid. Required is signalled natively
 * on each radio-type choice input (the fieldset's ARIA role "group" does NOT
 * support `aria-required`).
 */
@Component({
  selector: "fieldset[uiQuestionnaireItem]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-item",
    "[attr.data-active]": "active() ? '' : null",
    "[hidden]": "!active()",
    "[attr.inert]": "active() ? null : ''",
    "[attr.tabindex]": "-1",
    "[attr.aria-describedby]": "error() ? errorId() : null",
    "[class]": "classes()",
  },
})
export class QuestionnaireItemComponent implements OnDestroy {
  readonly name = input.required<string>()
  readonly required = input(false, { transform: booleanAttribute })
  readonly multiple = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })
  private readonly elementRef = inject<ElementRef<HTMLFieldSetElement>>(ElementRef)

  private readonly choices = signal<QuestionnaireChoiceComponent[]>([])

  readonly active = computed(() => this.root?.activeItemName() === this.name())
  readonly error = computed(() => this.root?.errorFor(this.name()))
  /** Stable id for `[uiQuestionnaireError]` to claim, referenced by `aria-describedby`. */
  readonly errorId = computed(() => `questionnaire-error-${this.name()}`)

  constructor() {
    this.root?.registerItem(this)
  }

  /** Called by the root after navigation moves `activeItem` to this item. */
  focusElement(): void {
    this.elementRef.nativeElement.focus()
  }

  ngOnDestroy(): void {
    this.root?.unregisterItem(this)
  }

  /** Registered by each descendant `[uiQuestionnaireChoice]` (for shortcut ordering). */
  registerChoice(choice: QuestionnaireChoiceComponent): void {
    this.choices.update((choices) => [...choices, choice])
  }

  unregisterChoice(choice: QuestionnaireChoiceComponent): void {
    this.choices.update((choices) => choices.filter((c) => c !== choice))
  }

  choicesList(): QuestionnaireChoiceComponent[] {
    return this.choices()
  }

  protected readonly classes = computed(() =>
    cn(questionnaireItemVariants(), this.className()),
  )
}

/**
 * The question heading inside `[uiQuestionnaireItem]` — use a native
 * `<legend>`. Shows an "(optional)"-style hint only for required `multiple`
 * items (p4one parity: single-choice required items don't need it because
 * validation already communicates it).
 */
@Component({
  selector: "legend[uiQuestionnaireTitle]",
  standalone: true,
  template: "<ng-content />@if (showRequiredHint()) {\n  <span data-slot=\"questionnaire-title-required\"> (required)</span>\n}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-title",
    "[class]": "classes()",
  },
})
export class QuestionnaireTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  private readonly item = inject(QuestionnaireItemComponent, { optional: true })
  protected readonly showRequiredHint = computed(
    () => (this.item?.required() ?? false) && (this.item?.multiple() ?? false),
  )

  protected readonly classes = computed(() =>
    cn(questionnaireTitleVariants(), this.className()),
  )
}

/** One-line hint under the title. */
@Component({
  selector: "p[uiQuestionnaireDescription]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-description",
    "[class]": "classes()",
  },
})
export class QuestionnaireDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(questionnaireDescriptionVariants(), this.className()),
  )
}

/** Grid wrapper for the item's `[uiQuestionnaireChoice]` cards / freeform input. */
@Component({
  selector: "[uiQuestionnaireChoices]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-choices",
    "[class]": "classes()",
  },
})
export class QuestionnaireChoicesComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(questionnaireChoicesVariants(), this.className()),
  )
}

/** Secondary text inside a `[uiQuestionnaireChoice]` card. */
@Component({
  selector: "span[uiQuestionnaireChoiceDescription]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-choice-description",
    "[class]": "classes()",
  },
})
export class QuestionnaireChoiceDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(questionnaireChoiceDescriptionVariants(), this.className()),
  )
}

/**
 * Freeform "other" answer inside `[uiQuestionnaireChoices]` — a styled text
 * input bound to the item's answer. Clearing it removes the answer so
 * validation treats the item as unanswered again.
 */
@Component({
  selector: "input[uiQuestionnaireInput]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-input",
    type: "text",
    "[attr.name]": "item?.name()",
    "[class]": "classes()",
    "[value]": "value()",
    "(input)": "onInput($event)",
  },
})
export class QuestionnaireInputComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  private readonly item = inject(QuestionnaireItemComponent, { optional: true })
  private readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly value = computed(() => {
    const item = this.item
    const answer = item && this.root?.answerFor(item.name())
    if (typeof answer !== "string") return ""
    const isChoiceValue = item?.choicesList().some((choice) => choice.value() === answer)
    return isChoiceValue ? "" : answer
  })

  protected onInput(event: Event): void {
    if (!this.item || !this.root) return
    const value = (event.target as HTMLInputElement).value
    this.root.setAnswer(this.item.name(), value || undefined)
  }

  protected readonly classes = computed(() =>
    cn(inputVariants(), questionnaireInputBase, this.className()),
  )
}

/**
 * Validation message for the enclosing item (`role="alert"`, WCAG 3.3.1).
 * Hidden until the item has an error; claims the item's stable error id via
 * `[id]`, which the fieldset's `aria-describedby` references.
 */
@Component({
  selector: "[uiQuestionnaireError]",
  standalone: true,
  template: "{{ message() }}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "alert",
    "data-slot": "questionnaire-error",
    "[id]": "item?.errorId()",
    "[hidden]": "!message()",
    "[class]": "classes()",
  },
})
export class QuestionnaireErrorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly item = inject(QuestionnaireItemComponent, { optional: true })
  protected readonly message = computed(() => this.item?.error())

  protected readonly classes = computed(() =>
    cn(questionnaireErrorVariants(), this.className()),
  )
}

/**
 * Navigation row: Previous (start), Skip (middle), Next/Submit (end — only one
 * of the two is ever visible). Buttons overlap the same grid cells via
 * col-start/row-start placement, so visibility toggles never reflow the row.
 */
@Component({
  selector: "[uiQuestionnaireActions]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-actions",
    "[class]": "classes()",
  },
})
export class QuestionnaireActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(questionnaireActionsVariants(), this.className()),
  )
}

/** Back button — hidden on the first step. */
@Component({
  selector: "button[uiQuestionnairePrevious]",
  standalone: true,
  imports: [],
  template: "<ng-content>Previous</ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-previous",
    type: "button",
    "[hidden]": "root?.isFirst() ?? true",
    "[class]": "classes()",
    "(click)": "root?.previous()",
  },
})
export class QuestionnairePreviousComponent {
  readonly variant = input<ButtonVariant>("outline")
  readonly size = input<ButtonSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "col-start-1 row-start-1 justify-self-start",
      questionnaireActionBase,
      this.className(),
    ),
  )
}

/** Skip button — hidden while the active item is `required` (skip is a no-op there). */
@Component({
  selector: "button[uiQuestionnaireSkip]",
  standalone: true,
  template: "<ng-content>Skip</ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-skip",
    type: "button",
    "[hidden]": "root?.activeRequired() ?? false",
    "[class]": "classes()",
    "(click)": "root?.skip()",
  },
})
export class QuestionnaireSkipComponent {
  readonly variant = input<ButtonVariant>("outline")
  readonly size = input<ButtonSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "col-start-2 row-start-1 justify-self-end",
      questionnaireActionBase,
      this.className(),
    ),
  )
}

/** Next button — hidden on the last step (Submit takes its cell). */
@Component({
  selector: "button[uiQuestionnaireNext]",
  standalone: true,
  template: "<ng-content>Next</ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-next",
    type: "button",
    "[hidden]": "root?.isLast() ?? false",
    "[class]": "classes()",
    "(click)": "root?.next()",
  },
})
export class QuestionnaireNextComponent {
  readonly variant = input<ButtonVariant>("default")
  readonly size = input<ButtonSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "col-start-3 row-start-1 justify-self-end",
      questionnaireActionBase,
      this.className(),
    ),
  )
}

/** Submit button — visible only on the last step; emits the root's `submitted` output. */
@Component({
  selector: "button[uiQuestionnaireSubmit]",
  standalone: true,
  template: "<ng-content>Save answers</ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-submit",
    type: "submit",
    "[hidden]": "!(root?.isLast() ?? false)",
    "[class]": "classes()",
  },
})
export class QuestionnaireSubmitComponent {
  readonly variant = input<ButtonVariant>("default")
  readonly size = input<ButtonSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "col-start-3 row-start-1 justify-self-end",
      questionnaireActionBase,
      this.className(),
    ),
  )
}

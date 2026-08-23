import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnDestroy,
  type OnInit,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { Kbd } from "@/angular-ui/kbd"

import { QuestionnaireItemComponent } from "./questionnaire.component"
import {
  QuestionnaireComponent,
  QuestionnaireShortcutMode,
} from "./questionnaire.component"
import { QUESTIONNAIRE_CHOICE_CHECK_SVG } from "./questionnaire.icons"
import { questionnaireChoiceVariants } from "./questionnaire.variants"

/**
 * One selectable answer inside `[uiQuestionnaireChoices]` — a bordered card
 * (`<label>`) wrapping a hidden native radio/checkbox input (real keyboard +
 * screen reader semantics) plus a hand-rolled indicator.
 *
 * radio vs checkbox is read from the parent `[uiQuestionnaireItem]`'s
 * `multiple` input. Selecting a checkbox-style choice toggles it in/out of the
 * item's `string[]` answer; a radio-style choice replaces the item's answer.
 * A radio-type input carries native `required` when the item is (the form has
 * `novalidate`, so it never triggers a native popup — pure semantic hint);
 * it is intentionally NEVER set on checkbox-type choices ("THIS box must be
 * checked" is the wrong semantics — axe-verified).
 *
 * Digit/letter shortcuts (`shortcuts="numbers"|"letters"` on the root) are
 * resolved by the root from this choice's position among its item's registered
 * choices and call `select()` directly. The shortcut badge reuses `ui/kbd`
 * with `aria-hidden` — decorative hint, kept out of the accessible name.
 *
 * Checked wash uses the force-ui pair `bg-primary/5 dark:bg-primary/10`
 * (`questionnaire.variants.ts`) — p4one used an app-private token.
 */
@Component({
  selector: "label[uiQuestionnaireChoice]",
  standalone: true,
  imports: [Kbd],
  templateUrl: "./questionnaire-choice.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-choice",
    "[attr.data-type]": "type()",
    "[attr.data-checked]": "checked() ? '' : null",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-invalid]": "invalid() ? '' : null",
    "[attr.data-shortcut]": "shortcutLabel() ? '' : null",
    "[class]": "classes()",
  },
})
export class QuestionnaireChoiceComponent implements OnInit, OnDestroy {
  readonly value = input.required<string>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly item = inject(QuestionnaireItemComponent, { optional: true })
  private readonly root = inject(QuestionnaireComponent, { optional: true })
  private readonly sanitizer = inject(DomSanitizer)

  protected readonly checkIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    QUESTIONNAIRE_CHOICE_CHECK_SVG,
  )

  protected readonly type = computed<"radio" | "checkbox">(() =>
    this.item?.multiple() ? "checkbox" : "radio",
  )

  protected readonly checked = computed(() => {
    if (!this.item) return false
    const answer = this.root?.answerFor(this.item.name())
    return Array.isArray(answer) ? answer.includes(this.value()) : answer === this.value()
  })

  /** True while the parent item has a validation error — see `QuestionnaireErrorComponent`. */
  protected readonly invalid = computed(() => !!this.item?.error())

  protected readonly shortcutLabel = computed<string | undefined>(() => {
    const mode = this.root?.shortcuts()
    if (!this.item || !mode || mode === QuestionnaireShortcutMode.None) return undefined
    const index = this.item.choicesList().indexOf(this)
    if (index < 0) return undefined
    return mode === QuestionnaireShortcutMode.Numbers
      ? String(index + 1)
      : String.fromCharCode(97 + index).toUpperCase()
  })

  ngOnInit(): void {
    this.item?.registerChoice(this)
  }

  ngOnDestroy(): void {
    this.item?.unregisterChoice(this)
  }

  /** Selects this choice — called on native `(change)` and by keyboard shortcuts. */
  select(): void {
    if (this.disabled() || !this.item || !this.root) return
    const name = this.item.name()
    if (this.item.multiple()) {
      const current = this.root.answerFor(name)
      const arr = Array.isArray(current) ? current : []
      const value = this.value()
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      this.root.setAnswer(name, next)
    } else {
      this.root.setAnswer(name, this.value())
    }
  }

  protected readonly classes = computed(() =>
    cn(questionnaireChoiceVariants(), this.className()),
  )
}

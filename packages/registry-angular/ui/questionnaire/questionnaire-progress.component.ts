import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

import { QuestionnaireComponent } from "./questionnaire.component"
import { questionnaireProgressVariants } from "./questionnaire.variants"

/**
 * "Question X of Y" counter, read from the parent `[uiQuestionnaire]`.
 * `role="progressbar"` + `aria-live="polite"` so step changes are announced
 * even when focus is elsewhere (WCAG 4.1.3); `aria-valuetext` carries the same
 * text shown visually.
 *
 * `[steps]` switches to the alternate "Progress Steps" visual — a row of bars,
 * filled up to the active item. Both modes bind the same `current()`/`total()`.
 */
@Component({
  selector: "[uiQuestionnaireProgress]",
  standalone: true,
  templateUrl: "./questionnaire-progress.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "questionnaire-progress",
    role: "progressbar",
    "aria-live": "polite",
    "[attr.aria-label]": "ariaLabel()",
    "[attr.aria-valuenow]": "root?.current()",
    "[attr.aria-valuemin]": "1",
    "[attr.aria-valuemax]": "root?.total()",
    "[attr.aria-valuetext]": "label()",
    "[attr.data-steps]": "steps() ? '' : null",
    "[class]": "classes()",
  },
})
export class QuestionnaireProgressComponent {
  readonly ariaLabel = input("Questionnaire progress", { alias: "ariaLabel" })
  readonly steps = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(QuestionnaireComponent, { optional: true })

  protected readonly label = computed(
    () => `Question ${this.root?.current() ?? 1} of ${this.root?.total() ?? 1}`,
  )

  protected readonly segments = computed(() => {
    const total = this.root?.total() ?? 0
    const current = this.root?.current() ?? 0
    return Array.from({ length: total }, (_, i) => i < current)
  })

  protected readonly classes = computed(() =>
    cn(questionnaireProgressVariants(), this.className()),
  )
}

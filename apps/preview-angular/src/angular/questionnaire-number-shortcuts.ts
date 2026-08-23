import { Component } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  QuestionnaireShortcutMode,
} from "@/angular-ui/questionnaire"

// Numeric shortcuts (1/2/3…) select a choice without a pointer.
// From p4one's `NumberShortcuts` story.
@Component({
  selector: "preview-questionnaire-number-shortcuts",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireError,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireSkip,
    QuestionnaireNext,
    QuestionnaireSubmit,
  ],
  template: `
    <form
      uiQuestionnaire
      [shortcuts]="QuestionnaireShortcutMode.Numbers"
      class="mx-auto max-w-lg"
      aria-label="Plan questionnaire"
    >
      <fieldset uiQuestionnaireItem name="plan" required>
        <legend uiQuestionnaireTitle>Choose a plan</legend>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="plus">Plus</label>
          <label uiQuestionnaireChoice value="pro">Pro</label>
          <label uiQuestionnaireChoice value="enterprise">Enterprise</label>
        </div>
        <div uiQuestionnaireError></div>
      </fieldset>
      <div uiQuestionnaireActions>
        <button uiQuestionnairePrevious></button>
        <button uiQuestionnaireSkip></button>
        <button uiQuestionnaireNext></button>
        <button uiQuestionnaireSubmit></button>
      </div>
    </form>
  `,
})
export class QuestionnaireNumberShortcutsComponent {
  protected readonly QuestionnaireShortcutMode = QuestionnaireShortcutMode
}

export default QuestionnaireNumberShortcutsComponent

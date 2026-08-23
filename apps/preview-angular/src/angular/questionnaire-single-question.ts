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
} from "@/angular-ui/questionnaire"

// A single required, single-choice question — the simplest shape.
// From p4one's `SingleQuestion` story.
@Component({
  selector: "preview-questionnaire-single-question",
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
    <form uiQuestionnaire class="mx-auto max-w-lg" aria-label="Task questionnaire">
      <fieldset uiQuestionnaireItem name="task" required>
        <legend uiQuestionnaireTitle>What should the agent do next?</legend>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="inspect">Inspect the codebase</label>
          <label uiQuestionnaireChoice value="implement">Implement the change</label>
          <label uiQuestionnaireChoice value="review">Review the result</label>
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
export class QuestionnaireSingleQuestionComponent {}

export default QuestionnaireSingleQuestionComponent

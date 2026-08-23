import { Component } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/angular-ui/questionnaire"

// `multiple` on the item switches every choice from a radio to a checkbox.
// From p4one's `MultipleChoice` story.
@Component({
  selector: "preview-questionnaire-multiple-choice",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireDescription,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireSkip,
    QuestionnaireNext,
    QuestionnaireSubmit,
  ],
  template: `
    <form
      uiQuestionnaire
      class="mx-auto max-w-lg"
      aria-label="Progress signals questionnaire"
    >
      <fieldset uiQuestionnaireItem name="signals" multiple>
        <legend uiQuestionnaireTitle>What should every progress update include?</legend>
        <p uiQuestionnaireDescription>Select all that apply, or skip this question.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="progress">Progress</label>
          <label uiQuestionnaireChoice value="decisions">Decisions</label>
          <label uiQuestionnaireChoice value="risks">Risks</label>
        </div>
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
export class QuestionnaireMultipleChoiceComponent {}

export default QuestionnaireMultipleChoiceComponent

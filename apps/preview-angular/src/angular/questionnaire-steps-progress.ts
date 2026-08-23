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
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/angular-ui/questionnaire"

// `[steps]` switches the progress readout to the alternate bar visual — a row
// of bars, filled up to the active item. Starts on the second step via
// `activeItem`. From p4one's `StepsProgress` story.
@Component({
  selector: "preview-questionnaire-steps-progress",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireProgress,
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
      activeItem="signals"
      class="mx-auto max-w-lg"
      aria-label="Steps progress example"
    >
      <div uiQuestionnaireProgress steps></div>
      <fieldset uiQuestionnaireItem name="direction" required>
        <legend uiQuestionnaireTitle>First step</legend>
        <div uiQuestionnaireChoices><label uiQuestionnaireChoice value="a">Option A</label></div>
      </fieldset>
      <fieldset uiQuestionnaireItem name="signals" required>
        <legend uiQuestionnaireTitle>Second step</legend>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="b">Option B</label>
          <label uiQuestionnaireChoice value="c">Option C</label>
        </div>
      </fieldset>
      <fieldset uiQuestionnaireItem name="timing" required>
        <legend uiQuestionnaireTitle>Third step</legend>
        <div uiQuestionnaireChoices><label uiQuestionnaireChoice value="d">Option D</label></div>
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
export class QuestionnaireStepsProgressComponent {}

export default QuestionnaireStepsProgressComponent

import { Component } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/angular-ui/questionnaire"

// First, middle, and last steps side by side — shows how Previous hides on
// step one and Submit replaces Next on the final step. From p4one's
// `Gallery` story (collapsed to two representative forms).
@Component({
  selector: "preview-questionnaire-gallery",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireProgress,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireSkip,
    QuestionnaireNext,
    QuestionnaireSubmit,
  ],
  template: `
    <div class="flex flex-col gap-8">
      <form uiQuestionnaire activeItem="direction" class="max-w-lg" aria-label="First step">
        <span uiQuestionnaireProgress></span>
        <fieldset uiQuestionnaireItem name="direction" required>
          <legend uiQuestionnaireTitle>First step (Previous hidden)</legend>
          <div uiQuestionnaireChoices>
            <label uiQuestionnaireChoice value="a">Option A</label>
            <label uiQuestionnaireChoice value="b">Option B</label>
          </div>
        </fieldset>
        <fieldset uiQuestionnaireItem name="signals">
          <legend uiQuestionnaireTitle>Second step</legend>
          <div uiQuestionnaireChoices><label uiQuestionnaireChoice value="c">Option C</label></div>
        </fieldset>
        <div uiQuestionnaireActions>
          <button uiQuestionnairePrevious></button>
          <button uiQuestionnaireSkip></button>
          <button uiQuestionnaireNext></button>
          <button uiQuestionnaireSubmit></button>
        </div>
      </form>
      <form uiQuestionnaire activeItem="signals" class="max-w-lg" aria-label="Last step">
        <span uiQuestionnaireProgress></span>
        <fieldset uiQuestionnaireItem name="direction" required>
          <legend uiQuestionnaireTitle>First step</legend>
          <div uiQuestionnaireChoices><label uiQuestionnaireChoice value="a">Option A</label></div>
        </fieldset>
        <fieldset uiQuestionnaireItem name="signals">
          <legend uiQuestionnaireTitle>Last step (Submit shown)</legend>
          <div uiQuestionnaireChoices>
            <label uiQuestionnaireChoice value="c">Option C</label>
            <label uiQuestionnaireChoice value="d">Option D</label>
          </div>
        </fieldset>
        <div uiQuestionnaireActions>
          <button uiQuestionnairePrevious></button>
          <button uiQuestionnaireSkip></button>
          <button uiQuestionnaireNext></button>
          <button uiQuestionnaireSubmit></button>
        </div>
      </form>
    </div>
  `,
})
export class QuestionnaireGalleryComponent {}

export default QuestionnaireGalleryComponent

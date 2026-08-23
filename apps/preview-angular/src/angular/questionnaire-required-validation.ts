import { Component } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/angular-ui/questionnaire"

// Advancing past a `required`, unanswered item surfaces
// `[uiQuestionnaireError]` (`role="alert"`, WCAG 3.3.1). Click Next to see it.
// From p4one's `RequiredValidation` story.
@Component({
  selector: "preview-questionnaire-required-validation",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireDescription,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireChoiceDescription,
    QuestionnaireError,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireSkip,
    QuestionnaireNext,
    QuestionnaireSubmit,
  ],
  template: `
    <form uiQuestionnaire class="mx-auto max-w-lg" aria-label="Required question">
      <fieldset uiQuestionnaireItem name="plan" required>
        <legend uiQuestionnaireTitle>Choose a plan</legend>
        <p uiQuestionnaireDescription>Enterprise is not available on your account.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="plus">
            Plus
            <span uiQuestionnaireChoiceDescription>For individuals and small teams</span>
          </label>
          <label uiQuestionnaireChoice value="pro">
            Pro
            <span uiQuestionnaireChoiceDescription>For growing businesses</span>
          </label>
          <label uiQuestionnaireChoice value="enterprise" disabled>
            Enterprise
            <span uiQuestionnaireChoiceDescription>For large teams and enterprises</span>
          </label>
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
export class QuestionnaireRequiredValidationComponent {}

export default QuestionnaireRequiredValidationComponent

import { Component, signal } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireShortcutMode,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  type QuestionnaireAnswer,
} from "@/angular-ui/questionnaire"

// Hero preview — the full three-step wizard with a freeform "other" answer.
// Derived from p4one's `Playground` story (no React base example exists).
@Component({
  selector: "preview-questionnaire-demo",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireProgress,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireDescription,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireChoiceDescription,
    QuestionnaireInput,
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
      [shortcuts]="QuestionnaireShortcutMode.Letters"
      class="mx-auto max-w-lg"
      aria-label="Prototype planning questionnaire"
      (submitted)="submitted.set($event)"
    >
      <span uiQuestionnaireProgress></span>
      <fieldset uiQuestionnaireItem name="direction" required>
        <legend uiQuestionnaireTitle>What should we prototype next?</legend>
        <p uiQuestionnaireDescription>Choose one direction or write your own answer.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="delegation">
            Sub-agent delegation
            <span uiQuestionnaireChoiceDescription
              >Show when work is delegated and what comes back.</span
            >
          </label>
          <label uiQuestionnaireChoice value="questions">
            Question prompts
            <span uiQuestionnaireChoiceDescription
              >Show choices while the agent waits for input.</span
            >
          </label>
          <label uiQuestionnaireChoice value="both">
            Both together
            <span uiQuestionnaireChoiceDescription
              >Explore one unified interaction pattern.</span
            >
          </label>
          <input uiQuestionnaireInput aria-label="Another direction" placeholder="Type another direction" />
        </div>
        <div uiQuestionnaireError></div>
      </fieldset>
      <fieldset uiQuestionnaireItem name="signals" multiple>
        <legend uiQuestionnaireTitle>What should every progress update include?</legend>
        <p uiQuestionnaireDescription>Select all that apply, or skip this question.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="progress">Progress</label>
          <label uiQuestionnaireChoice value="decisions">Decisions</label>
          <label uiQuestionnaireChoice value="risks">Risks</label>
        </div>
        <div uiQuestionnaireError></div>
      </fieldset>
      <fieldset uiQuestionnaireItem name="timing" required>
        <legend uiQuestionnaireTitle>When should this be revisited?</legend>
        <p uiQuestionnaireDescription>Choose when this should be revisited.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="week">This week</label>
          <label uiQuestionnaireChoice value="cycle">Next cycle</label>
          <label uiQuestionnaireChoice value="later" disabled
            >Revisit later (not available yet)</label
          >
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
    @if (submitted(); as answers) {
      <p class="mt-4 text-center text-sm text-muted-foreground">
        Submitted: {{ answers | json }}
      </p>
    }
  `,
})
export class QuestionnaireDemoComponent {
  protected readonly QuestionnaireShortcutMode = QuestionnaireShortcutMode
  protected readonly submitted = signal<Record<string, QuestionnaireAnswer> | undefined>(
    undefined,
  )
}

export default QuestionnaireDemoComponent

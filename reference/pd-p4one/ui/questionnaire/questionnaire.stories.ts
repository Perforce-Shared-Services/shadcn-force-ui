import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

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
} from './';

interface QuestionnaireStoryArgs {
  shortcuts: QuestionnaireShortcutMode;
}

const IMPORTS = [
  CommonModule,
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
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
];

/**
 * `[uiQuestionnaire]` — a multi-step questionnaire: single-choice,
 * multiple-choice, and freeform questions, with per-item validation,
 * progress, and Previous/Skip/Next/Submit navigation.
 *
 * NOT a Force UI registry port — sourced from shadcn's own
 * `ui.shadcn.com/docs/components/radix/questionnaire` (searched the full
 * `@force-ui` registry first; no match). Built as an in-house state engine +
 * composition of this app's own `ui/*` parts (`uiInput`, `uiKbd`,
 * `buttonVariants`) — see `questionnaire.component.ts` for the full parity
 * writeup, the same "no radix-ng equivalent" situation as `ui/stepper`.
 *
 * Each `[uiQuestionnaireItem]` declares its own `name`/`required`/`multiple`
 * and self-registers with the root — there is no separate `items` array input
 * (an intentional Angular-idiomatic simplification over the upstream React
 * API, documented on the root component).
 */
const meta: Meta<QuestionnaireStoryArgs> = {
  title: 'UI/Questionnaire',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: IMPORTS })],
  argTypes: {
    shortcuts: {
      control: 'inline-radio',
      options: Object.values(QuestionnaireShortcutMode),
      description: 'Digit or letter keys select a choice in the active item.',
      table: { defaultValue: { summary: QuestionnaireShortcutMode.None } },
    },
  },
  args: {
    shortcuts: QuestionnaireShortcutMode.Letters,
  },
  render: (args) => ({
    props: { ...args, onSubmitted: (value: unknown) => console.log('submitted', value) },
    template: `
      <form uiQuestionnaire [shortcuts]="shortcuts" (submitted)="onSubmitted($event)" class="mx-auto max-w-lg" aria-label="Prototype planning questionnaire">
        <span uiQuestionnaireProgress></span>
        <fieldset uiQuestionnaireItem name="direction" required>
          <legend uiQuestionnaireTitle>What should we prototype next?</legend>
          <p uiQuestionnaireDescription>Choose one direction or write your own answer.</p>
          <div uiQuestionnaireChoices>
            <label uiQuestionnaireChoice value="delegation">
              Sub-agent delegation
              <span uiQuestionnaireChoiceDescription>Show when work is delegated and what comes back.</span>
            </label>
            <label uiQuestionnaireChoice value="questions">
              Question prompts
              <span uiQuestionnaireChoiceDescription>Show choices while the agent waits for input.</span>
            </label>
            <label uiQuestionnaireChoice value="both">
              Both together
              <span uiQuestionnaireChoiceDescription>Explore one unified interaction pattern.</span>
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
            <label uiQuestionnaireChoice value="later" disabled>Revisit later (not available yet)</label>
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
  }),
};

export default meta;
type Story = StoryObj<QuestionnaireStoryArgs>;

export const Playground: Story = {};

/** A single required, single-choice question — the simplest shape. */
export const SingleQuestion: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
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
  }),
};

/** `multiple` on the item switches every choice from a radio to a checkbox. */
export const MultipleChoice: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <form uiQuestionnaire class="mx-auto max-w-lg" aria-label="Progress signals questionnaire">
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
  }),
};

/**
 * Trying to advance past a `required`, unanswered item surfaces
 * `[uiQuestionnaireError]` (`role="alert"`, WCAG 3.3.1). Click Next to see it.
 */
export const RequiredValidation: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
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
  }),
};

/** Numeric shortcuts (1/2/3…) select a choice without a pointer. */
export const NumberShortcuts: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <form uiQuestionnaire shortcuts="numbers" class="mx-auto max-w-lg" aria-label="Plan questionnaire">
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
  }),
};

/**
 * `[steps]` switches the progress readout to Figma's alternate "Progress
 * Steps" visual (28979:9970, hidden by default there too) — a row of bars,
 * filled up to the active item.
 */
export const StepsProgress: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <form uiQuestionnaire activeItem="signals" class="mx-auto max-w-lg" aria-label="Steps progress example">
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
  }),
};

/** First, middle (multi-select), and last (Submit-showing) steps, side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
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
            <legend uiQuestionnaireTitle>Last step (Submit shown, Skip visible — not required)</legend>
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
  }),
};

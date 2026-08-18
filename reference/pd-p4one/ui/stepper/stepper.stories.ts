import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from './';

interface StepperStoryArgs {
  value: number;
  orientation: 'horizontal' | 'vertical';
  linear: boolean;
  showDescription: boolean;
}

/**
 * `[uiStepper]` is a from-scratch Force UI-style build, not a registry port —
 * `@force-ui/stepper` only ships a Vue/`reka-ui` source, with no
 * React/`radix-force-ui` build to pull byte-parity classes from (see the
 * component's header comment for the full gap writeup). Anatomy and base
 * classes come from the real shadcn-vue `stepper` source; completed/active
 * colour is reconciled against the Force spec's `wizard` composition
 * (`patterns/compositions/wizard.md`), which is the only place "stepper"
 * appears in the design spec.
 *
 * Composes `[uiStepperItem]` (one per step, exposes `state` via DI) with
 * either a `[uiStepperTrigger]` button (clickable navigation) or plain
 * `[uiStepperIndicator]`/`[uiStepperTitle]` content (non-interactive, for
 * contexts like Force's wizard sidebar where steps must not be
 * click-navigable) and `[uiStepperSeparator]` connector lines between items.
 * `[uiStepperTrigger]`/`[uiStepperItem]` always lay out as a row (indicator +
 * label side by side) — only the root stacks rows into a column in vertical
 * mode.
 */
const meta: Meta<StepperStoryArgs> = {
  title: 'UI/Stepper',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Stepper,
        StepperItem,
        StepperTrigger,
        StepperIndicator,
        StepperTitle,
        StepperDescription,
        StepperSeparator,
      ],
    }),
  ],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: 'Current step (1-indexed). Two-way via `[(value)]="currentStep"` in product.',
      table: { defaultValue: { summary: '1' } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout axis for the step row/column.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    linear: {
      control: 'boolean',
      description: 'When on, a trigger click cannot skip ahead of the next pending step.',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the `[uiStepperDescription]` sub-label under each title.',
    },
  },
  args: {
    value: 2,
    orientation: 'horizontal',
    linear: true,
    showDescription: false,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div uiStepper [(value)]="value" [orientation]="orientation" [linear]="linear" aria-label="Setup steps" class="w-[480px]">
        <div uiStepperItem [step]="1">
          <button uiStepperTrigger>
            <span uiStepperIndicator>1</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Details</span>
              <span uiStepperDescription *ngIf="showDescription">Name the workspace</span>
            </span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="2">
          <button uiStepperTrigger>
            <span uiStepperIndicator>2</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Workspace</span>
              <span uiStepperDescription *ngIf="showDescription">Choose a local folder</span>
            </span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="3">
          <button uiStepperTrigger>
            <span uiStepperIndicator>3</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Review</span>
              <span uiStepperDescription *ngIf="showDescription">Confirm and create</span>
            </span>
          </button>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<StepperStoryArgs>;

/** Args-driven playground — click a trigger to move `value`, or drive it from Controls. */
export const Playground: Story = {};

/** Vertical layout — steps stack top to bottom, separators run along the left edge. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: { ...args },
    template: `
      <div uiStepper [(value)]="value" [orientation]="orientation" [linear]="linear" aria-label="Setup steps" class="w-64">
        <div uiStepperItem [step]="1">
          <button uiStepperTrigger>
            <span uiStepperIndicator>1</span>
            <span uiStepperTitle>Details</span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="2">
          <button uiStepperTrigger>
            <span uiStepperIndicator>2</span>
            <span uiStepperTitle>Workspace</span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="3">
          <button uiStepperTrigger>
            <span uiStepperIndicator>3</span>
            <span uiStepperTitle>Review</span>
          </button>
        </div>
      </div>
    `,
  }),
};

/**
 * With sub-labels under each title — `[uiStepperDescription]`, matching
 * `wizard.md`'s sidebar sub-label slot.
 */
export const WithDescriptions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiStepper [value]="2" orientation="vertical" aria-label="Workspace setup steps" class="w-72">
        <div uiStepperItem [step]="1">
          <button uiStepperTrigger>
            <span uiStepperIndicator>1</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Workspace details</span>
              <span uiStepperDescription>Name the workspace</span>
            </span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="2">
          <button uiStepperTrigger>
            <span uiStepperIndicator>2</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Workspace mapping</span>
              <span uiStepperDescription>Choose a local folder</span>
            </span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="3">
          <button uiStepperTrigger>
            <span uiStepperIndicator>3</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>Review</span>
              <span uiStepperDescription>Confirm and create</span>
            </span>
          </button>
        </div>
      </div>
    `,
  }),
};

/**
 * Non-interactive rendering — no `[uiStepperTrigger]`, just static
 * `[uiStepperIndicator]`/`[uiStepperTitle]` content. Matches `wizard.md`'s
 * sidebar rule: "Step items are not interactive — the user cannot click a
 * step in the sidebar to jump to it." Navigation there is Back/Next-button
 * only, driven externally by setting `value` on `[uiStepper]`.
 * `aria-current="step"` still lands on the active `[uiStepperItem]` even
 * without a trigger, so screen readers get the current step regardless.
 */
export const NonInteractive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiStepper [value]="2" orientation="vertical" aria-label="Setup steps" class="w-64">
        <div uiStepperItem [step]="1" class="p-1">
          <span uiStepperIndicator>1</span>
          <span uiStepperTitle>Details</span>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="2" class="p-1">
          <span uiStepperIndicator>2</span>
          <span uiStepperTitle>Workspace</span>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="3" class="p-1">
          <span uiStepperIndicator>3</span>
          <span uiStepperTitle>Review</span>
        </div>
      </div>
    `,
  }),
};

/** A disabled step is freely skippable by `linear` navigation and dims via `data-disabled`. */
export const DisabledStep: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiStepper [value]="1" orientation="horizontal" aria-label="Setup steps" class="w-[480px]">
        <div uiStepperItem [step]="1">
          <button uiStepperTrigger>
            <span uiStepperIndicator>1</span>
            <span uiStepperTitle>Details</span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="2" disabled>
          <button uiStepperTrigger>
            <span uiStepperIndicator>2</span>
            <span uiStepperTitle>Not applicable</span>
          </button>
        </div>
        <div uiStepperSeparator></div>
        <div uiStepperItem [step]="3">
          <button uiStepperTrigger>
            <span uiStepperIndicator>3</span>
            <span uiStepperTitle>Review</span>
          </button>
        </div>
      </div>
    `,
  }),
};

/** Pending, active, and completed states side by side, plus the vertical + non-interactive forms. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div uiStepper [value]="2" orientation="horizontal" aria-label="Setup steps" class="w-[480px]">
          <div uiStepperItem [step]="1">
            <button uiStepperTrigger>
              <span uiStepperIndicator>1</span>
              <span uiStepperTitle>Details</span>
            </button>
          </div>
          <div uiStepperSeparator></div>
          <div uiStepperItem [step]="2">
            <button uiStepperTrigger>
              <span uiStepperIndicator>2</span>
              <span uiStepperTitle>Workspace</span>
            </button>
          </div>
          <div uiStepperSeparator></div>
          <div uiStepperItem [step]="3">
            <button uiStepperTrigger>
              <span uiStepperIndicator>3</span>
              <span uiStepperTitle>Review</span>
            </button>
          </div>
        </div>
        <div uiStepper [value]="2" orientation="vertical" aria-label="Setup steps" class="w-64">
          <div uiStepperItem [step]="1">
            <button uiStepperTrigger>
              <span uiStepperIndicator>1</span>
              <span uiStepperTitle>Details</span>
            </button>
          </div>
          <div uiStepperSeparator></div>
          <div uiStepperItem [step]="2">
            <button uiStepperTrigger>
              <span uiStepperIndicator>2</span>
              <span uiStepperTitle>Workspace</span>
            </button>
          </div>
          <div uiStepperSeparator></div>
          <div uiStepperItem [step]="3">
            <button uiStepperTrigger>
              <span uiStepperIndicator>3</span>
              <span uiStepperTitle>Review</span>
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

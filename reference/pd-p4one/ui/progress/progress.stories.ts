import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Progress } from './';

interface ProgressStoryArgs {
  value: number | null;
  max: number;
  ariaLabel: string;
  showLabel: boolean;
}

/**
 * `[uiProgress]` is the Angular port of the Force UI (radix-force-ui) progress bar.
 * It's an attribute selector, so stories render a real `<div uiProgress>`.
 *
 * Anatomy:
 * - **Track** (`data-slot="progress"`): full-width muted pill, `h-1` (4px).
 * - **Indicator** (`data-slot="progress-indicator"`): primary-coloured fill that
 *   slides from left to right via `translateX(...)` as `value` increases.
 *
 * Accessibility:
 * - The host gets `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax`,
 *   and `aria-valuenow` automatically from the underlying radix-ng primitive.
 * - Always provide `aria-label` or `aria-labelledby` on the host.
 * - Pair with a visible percentage label adjacent to the bar when the exact
 *   value is meaningful (file upload, version sync, asset export).
 * - Set `value` to `null` for indeterminate operations where duration is unknown.
 *
 * Copy rules (Force writing guide §8 — Progress):
 * - Label describes the action in progress: "Uploading asset", not "Progress".
 * - Percentage in parentheses: "Syncing workspace (45% done)".
 * - Use ellipsis on the label while running: "Uploading…".
 * - On completion switch to a finished label, not a running verb:
 *   "Export complete", not "Exporting asset".
 */
const meta: Meta<ProgressStoryArgs> = {
  title: 'UI/Progress',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Progress] })],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'Current progress value (0–`max`). Set to `null` for indeterminate state — ' +
        'the bar fills to the start and `aria-valuenow` is omitted (correct per APG).',
      table: { type: { summary: 'number | null' }, defaultValue: { summary: '0' } },
    },
    max: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Maximum value (denominator). Defaults to 100.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name on the host element (maps to `aria-label`). Required — ' +
        'the component cannot derive a name from its context.',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show a visible percentage label next to the bar (demo-only toggle).',
    },
  },
  args: {
    value: 60,
    max: 100,
    ariaLabel: 'Uploading asset',
    showLabel: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-full max-w-sm space-y-1">
        @if (showLabel && value !== null) {
          <p class="text-sm text-muted-foreground">{{ ariaLabel }} ({{ value }}%)</p>
        } @else if (showLabel) {
          <p class="text-sm text-muted-foreground">{{ ariaLabel }}…</p>
        }
        <div uiProgress [value]="value" [max]="max" [attr.aria-label]="ariaLabel"></div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ProgressStoryArgs>;

/** Full-control story — drag the value slider and toggle the label. */
export const Playground: Story = {};

/** `value=null` → `data-state="indeterminate"`. The indicator stays at 0%; pair with a Spinner for a visible in-progress signal. */
export const Indeterminate: Story = {
  args: { value: null, ariaLabel: 'Loading workspace…', showLabel: true },
};

/** 0% — operation just started. */
export const Empty: Story = {
  args: { value: 0, ariaLabel: 'Preparing export', showLabel: true },
};

/** 100% — operation complete. The label switches to a finished phrase. */
export const Complete: Story = {
  args: { value: 100, ariaLabel: 'Export complete', showLabel: true },
};

/**
 * Custom `max` — useful when tracking discrete steps (e.g. 3 of 5 files synced).
 * The indicator renders the correct proportional fill regardless of max.
 */
export const CustomMax: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-full max-w-sm space-y-4">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Syncing files (3 of 5)</p>
          <div uiProgress [value]="3" [max]="5" aria-label="Syncing files (3 of 5)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Processing versions (12 of 20)</p>
          <div uiProgress [value]="12" [max]="20" aria-label="Processing versions (12 of 20)"></div>
        </div>
      </div>
    `,
  }),
};

/**
 * Width override — the bar spans its container by default (`w-full`).
 * Override via the `class` input to constrain it.
 */
export const CustomWidth: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Full width</p>
          <div uiProgress [value]="60" aria-label="Full width bar (60%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Constrained (256px)</p>
          <div uiProgress [value]="60" class="w-64" aria-label="Constrained bar (60%)"></div>
        </div>
      </div>
    `,
  }),
};

/** Gallery of representative states. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-full max-w-sm space-y-5">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Empty (0%)</p>
          <div uiProgress [value]="0" aria-label="Empty (0%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Quarter (25%)</p>
          <div uiProgress [value]="25" aria-label="Quarter (25%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Half (50%)</p>
          <div uiProgress [value]="50" aria-label="Half (50%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Three quarters (75%)</p>
          <div uiProgress [value]="75" aria-label="Three quarters (75%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Complete (100%)</p>
          <div uiProgress [value]="100" aria-label="Complete (100%)"></div>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Indeterminate</p>
          <div uiProgress [value]="null" aria-label="Syncing workspace…"></div>
        </div>
      </div>
    `,
  }),
};

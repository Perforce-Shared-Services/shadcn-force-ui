import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Slider } from './';

interface SliderStoryArgs {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  vertical: boolean;
  label: string;
}

/**
 * `[uiSlider]` is the Angular port of the Force UI (radix-force-ui) slider —
 * a draggable track + thumb for picking a numeric value or range.
 *
 * `value` is a `number[]` model — one entry per thumb. Pass a single-element
 * array for a plain value slider (the common case) or two values for a
 * min/max range slider; radix-ng sorts and clamps automatically.
 *
 * Unlike `uiButton`/`uiSwitch`, this component wraps radix-ng's own
 * `<rdx-slider>` element as a child rather than decorating the caller's host
 * tag — radix-ng ships the slider root as a component, not a directive, so it
 * can't be attached via `hostDirectives`. See the component's JSDoc.
 *
 * Accessibility: give every slider an `aria-label` (or `aria-labelledby`) — it
 * has no visible text of its own to derive an accessible name from (WCAG 4.1.2).
 */
const meta: Meta<SliderStoryArgs> = {
  title: 'UI/Slider',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Slider] })],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current value. Two-way via `[(value)]="[x]"` in product (array of one).',
      table: { defaultValue: { summary: '0' } },
    },
    min: {
      control: 'number',
      description: 'Minimum value.',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
      table: { defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'Stepping interval.',
      table: { defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Inactive. Drops the thumb from the tab order and dims the track to 50%.',
    },
    vertical: {
      control: 'boolean',
      description: 'Vertical orientation (drag up/down instead of left/right).',
    },
    label: {
      control: 'text',
      description: 'Accessible label (`aria-label`). The slider renders no visible text.',
    },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    vertical: false,
    label: 'Preview quality',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div [class]="vertical ? 'h-40' : 'w-64'">
        <div
          uiSlider
          [min]="min"
          [max]="max"
          [step]="step"
          [disabled]="disabled"
          [vertical]="vertical"
          [value]="[value]"
          (valueChange)="value = $event[0]"
          [aria-label]="label"
        ></div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SliderStoryArgs>;

export const Playground: Story = {};

/** Resting mid-range value on the default horizontal track. */
export const Default: Story = {
  args: { value: 50, label: 'Preview quality' },
};

/** `step` snaps the thumb to whole increments — here, 10 at a time. */
export const Stepped: Story = {
  args: { value: 30, step: 10, label: 'Zoom level' },
};

/** Vertical orientation — drag up/down. Needs an explicit height on the host. */
export const Vertical: Story = {
  args: { value: 40, vertical: true, label: 'Brightness' },
};

/** Disabled dims the track and thumb and removes it from the tab order. */
export const Disabled: Story = {
  args: { value: 50, disabled: true, label: 'Preview quality (locked)' },
};

/**
 * Two values render two thumbs — a min/max range slider. radix-ng keeps the
 * pair sorted and clamped as either thumb is dragged.
 */
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-64">
        <div uiSlider [value]="[20, 80]" [aria-label]="'Frame range'"></div>
      </div>
    `,
  }),
};

/**
 * Every state side by side — for VISUAL REVIEW only. Real usage always pairs
 * the slider with a visible label or an `aria-label` (see Playground).
 */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-1.5 w-64">
          <span class="text-xs font-medium text-muted-foreground">Default</span>
          <div uiSlider [value]="[50]" [aria-label]="'Default'"></div>
        </div>
        <div class="flex flex-col gap-1.5 w-64">
          <span class="text-xs font-medium text-muted-foreground">Range</span>
          <div uiSlider [value]="[20, 80]" [aria-label]="'Range'"></div>
        </div>
        <div class="flex flex-col gap-1.5 w-64">
          <span class="text-xs font-medium text-muted-foreground">Disabled</span>
          <div uiSlider [value]="[50]" disabled [aria-label]="'Disabled'"></div>
        </div>
        <div class="flex flex-col gap-1.5 h-40">
          <span class="text-xs font-medium text-muted-foreground">Vertical</span>
          <div uiSlider [value]="[40]" vertical [aria-label]="'Vertical'"></div>
        </div>
      </div>
    `,
  }),
};

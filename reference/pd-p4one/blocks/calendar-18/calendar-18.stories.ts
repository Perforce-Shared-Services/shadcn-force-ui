import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar18Component } from './calendar-18.component';

/**
 * `calendar-18` — a single-select calendar with a larger, responsive
 * `--cell-size`. Pure composition of the already-ported `ui/calendar`
 * primitive; no new tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar18Component> = {
  title: 'Blocks/calendar/calendar-18',
  component: Calendar18Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar18Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-18 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar18Component>;

/** The full calendar-18 composition: a single-select calendar with a variable cell size. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

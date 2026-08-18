import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar14Component } from './calendar-14.component';

/**
 * `calendar-14` — with booked/unavailable days. Pure composition of the
 * already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar14Component> = {
  title: 'Blocks/calendar/calendar-14',
  component: Calendar14Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar14Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-14 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar14Component>;

/** The full calendar-14 composition: a single-select calendar with a fixed range of booked/disabled days. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

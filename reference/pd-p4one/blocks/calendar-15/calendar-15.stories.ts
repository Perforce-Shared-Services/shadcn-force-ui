import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar15Component } from './calendar-15.component';

/**
 * `calendar-15` — with week numbers. Pure composition of the already-ported
 * `ui/calendar` primitive; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar15Component> = {
  title: 'Blocks/calendar/calendar-15',
  component: Calendar15Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar15Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-15 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar15Component>;

/** The full calendar-15 composition: a range-select calendar with a leading week-number column. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

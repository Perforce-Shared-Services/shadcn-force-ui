import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar06Component } from './calendar-06.component';

/**
 * `calendar-06` — range selection with minimum days. Pure composition of the
 * already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar06Component> = {
  title: 'Blocks/calendar/calendar-06',
  component: Calendar06Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar06Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-06 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar06Component>;

/** The full calendar-06 composition: a single-month range calendar with a minimum-days caption. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

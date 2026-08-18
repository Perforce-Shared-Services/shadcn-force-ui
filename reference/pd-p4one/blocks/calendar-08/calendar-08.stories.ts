import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar08Component } from './calendar-08.component';

/**
 * `calendar-08` — calendar with disabled days. Pure composition of the
 * already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar08Component> = {
  title: 'Blocks/calendar/calendar-08',
  component: Calendar08Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar08Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-08 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar08Component>;

/** The full calendar-08 composition: a single-select calendar with days before the selection disabled. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

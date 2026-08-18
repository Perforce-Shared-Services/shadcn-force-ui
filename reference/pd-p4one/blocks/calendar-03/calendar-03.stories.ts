import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar03Component } from './calendar-03.component';

/**
 * `calendar-03` — multiple months with multiple selection. Pure composition
 * of the already-ported `ui/calendar` primitive; no new tokens or variants
 * are introduced by this block.
 */
const meta: Meta<Calendar03Component> = {
  title: 'Blocks/calendar/calendar-03',
  component: Calendar03Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar03Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-03 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar03Component>;

/** The full calendar-03 composition: two side-by-side months, multiple day selection. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

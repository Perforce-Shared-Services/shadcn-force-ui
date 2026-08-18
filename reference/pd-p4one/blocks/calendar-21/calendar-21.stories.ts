import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar21Component } from './calendar-21.component';

/**
 * `calendar-21` — a range calendar with a month/year dropdown caption. Pure
 * composition of the already-ported `ui/calendar` primitive; no new tokens
 * or variants are introduced by this block.
 *
 * The registry's per-day weekday/weekend price annotations (via a custom
 * `DayButton` renderer) and its full-month-name dropdown formatter have no
 * equivalent hook on the ported `ui/calendar` primitive — see the component's
 * doc comment for detail. This story renders the plain range + dropdown
 * composition the primitive actually supports.
 */
const meta: Meta<Calendar21Component> = {
  title: 'Blocks/calendar/calendar-21',
  component: Calendar21Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar21Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-21 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar21Component>;

/** The full calendar-21 composition: a range calendar with a dropdown caption. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

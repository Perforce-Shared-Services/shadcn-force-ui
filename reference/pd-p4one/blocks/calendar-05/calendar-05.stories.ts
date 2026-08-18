import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar05Component } from './calendar-05.component';

/**
 * `calendar-05` — multiple months with range selection. Pure composition of
 * the already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar05Component> = {
  title: 'Blocks/calendar/calendar-05',
  component: Calendar05Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar05Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-05 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar05Component>;

/** The full calendar-05 composition: two side-by-side months, range selection. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

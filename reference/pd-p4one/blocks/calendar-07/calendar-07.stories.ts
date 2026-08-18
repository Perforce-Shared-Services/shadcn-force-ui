import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar07Component } from './calendar-07.component';

/**
 * `calendar-07` — range selection with minimum and maximum days. Pure
 * composition of the already-ported `ui/calendar` primitive; no new tokens
 * or variants are introduced by this block.
 */
const meta: Meta<Calendar07Component> = {
  title: 'Blocks/calendar/calendar-07',
  component: Calendar07Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar07Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-07 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar07Component>;

/** The full calendar-07 composition: a two-month range calendar with a min/max-nights caption. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

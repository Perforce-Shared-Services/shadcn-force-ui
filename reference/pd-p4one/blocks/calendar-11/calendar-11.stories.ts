import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar11Component } from './calendar-11.component';

/**
 * `calendar-11` — a two-month range calendar bounded to June-July 2025, with
 * a caption explaining the open window. Pure composition of the
 * already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar11Component> = {
  title: 'Blocks/calendar/calendar-11',
  component: Calendar11Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar11Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-11 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar11Component>;

/** The full calendar-11 composition: a bounded two-month range calendar. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

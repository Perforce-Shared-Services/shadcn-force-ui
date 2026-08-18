import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar09Component } from './calendar-09.component';

/**
 * `calendar-09` — calendar with disabled weekends. Pure composition of the
 * already-ported `ui/calendar` primitive; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar09Component> = {
  title: 'Blocks/calendar/calendar-09',
  component: Calendar09Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar09Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-09 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar09Component>;

/** The full calendar-09 composition: a two-month range calendar with weekend days disabled. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';

import { Calendar01Component } from './calendar-01.component';

/**
 * `calendar-01` — a simple calendar. Pure composition of the already-ported
 * `ui/calendar` primitive; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar01Component> = {
  title: 'Blocks/calendar/calendar-01',
  component: Calendar01Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar01Component, Calendar],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-01 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar01Component>;

/** The full calendar-01 composition: a single-select calendar in a bordered card shell. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

import { Calendar19Component } from './calendar-19.component';

/**
 * `calendar-19` — a compact card calendar with quick "jump to date" presets
 * in the footer. Pure composition of the already-ported `ui/calendar`,
 * `ui/card`, and `ui/button` primitives; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar19Component> = {
  title: 'Blocks/calendar/calendar-19',
  component: Calendar19Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar19Component, Button, Calendar, Card, CardContent, CardFooter],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-19 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar19Component>;

/** The full calendar-19 composition: a card calendar with date presets in the footer. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

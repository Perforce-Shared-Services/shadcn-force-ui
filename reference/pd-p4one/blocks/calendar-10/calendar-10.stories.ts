import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';

import { Calendar10Component } from './calendar-10.component';

/**
 * `calendar-10` — a card-wrapped calendar with a "Today" button that resets
 * both the displayed month and the current selection. Pure composition of
 * the already-ported `ui/calendar`, `ui/card`, and `ui/button` primitives; no
 * new tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar10Component> = {
  title: 'Blocks/calendar/calendar-10',
  component: Calendar10Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar10Component,
        Button,
        Calendar,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardAction,
        CardContent,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-10 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar10Component>;

/** The full calendar-10 composition: an appointment card with a Today reset button. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

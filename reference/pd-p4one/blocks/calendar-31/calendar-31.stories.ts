import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

import { Calendar31Component } from './calendar-31.component';

/**
 * `calendar-31` — a calendar card with event slots for the selected day.
 * Pure composition of the already-ported `ui/calendar`, `ui/card`, and
 * `ui/button` primitives; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar31Component> = {
  title: 'Blocks/calendar/calendar-31',
  component: Calendar31Component,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar31Component, Button, Calendar, Card, CardContent, CardFooter],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-31 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar31Component>;

/** The full calendar-31 composition: a single-select calendar card with a per-day event list. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

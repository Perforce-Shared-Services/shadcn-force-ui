import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar30Component } from './calendar-30.component';

/**
 * `calendar-30` — a date range picker with a "little-date"-style formatted
 * label. Pure composition of the already-ported `ui/calendar`, `ui/popover`,
 * `ui/button`, and `ui/label` primitives; no new tokens or variants are
 * introduced by this block. The registry's `little-date` npm dependency is
 * replaced with a small native `formatDateRange` helper (see the
 * component's header comment) rather than adding a new bundle dependency.
 */
const meta: Meta<Calendar30Component> = {
  title: 'Blocks/calendar/calendar-30',
  component: Calendar30Component,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar30Component, Button, Calendar, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-30 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar30Component>;

/** The full calendar-30 composition: a popover-anchored range calendar with a formatted trigger label. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

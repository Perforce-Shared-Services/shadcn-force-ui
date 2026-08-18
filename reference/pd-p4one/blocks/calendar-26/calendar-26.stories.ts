import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar26Component } from './calendar-26.component';

/**
 * `calendar-26` — a date range picker with time. Pure composition of the
 * already-ported `ui/calendar`, `ui/popover`, `ui/button`, `ui/input`, and
 * `ui/label` primitives; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar26Component> = {
  title: 'Blocks/calendar/calendar-26',
  component: Calendar26Component,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar26Component,
        Button,
        Calendar,
        Input,
        Label,
        Popover,
        PopoverTrigger,
        PopoverContent,
        ...PopoverContentBox,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-26 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar26Component>;

/** The full calendar-26 composition: check-in / check-out popovers, each paired with a time field. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

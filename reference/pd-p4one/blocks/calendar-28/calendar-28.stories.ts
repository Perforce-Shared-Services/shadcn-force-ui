import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar28Component } from './calendar-28.component';

/**
 * `calendar-28` — an input with a date picker. Pure composition of the
 * already-ported `ui/calendar`, `ui/popover`, `ui/button`, `ui/input`, and
 * `ui/label` primitives; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar28Component> = {
  title: 'Blocks/calendar/calendar-28',
  component: Calendar28Component,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar28Component,
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
        <app-block-calendar-28 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar28Component>;

/** The full calendar-28 composition: a free-typed date input paired with a popover calendar. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

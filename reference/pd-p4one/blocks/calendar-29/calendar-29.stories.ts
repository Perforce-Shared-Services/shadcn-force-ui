import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar29Component } from './calendar-29.component';

/**
 * `calendar-29` — a natural language date picker. Pure composition of the
 * already-ported `ui/calendar`, `ui/popover`, `ui/button`, `ui/input`, and
 * `ui/label` primitives; no new tokens or variants are introduced by this
 * block. The registry's `chrono-node` npm dependency is replaced with a
 * small native heuristic parser (see the component's header comment) rather
 * than adding a new bundle dependency.
 */
const meta: Meta<Calendar29Component> = {
  title: 'Blocks/calendar/calendar-29',
  component: Calendar29Component,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar29Component,
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
        <app-block-calendar-29 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar29Component>;

/** The full calendar-29 composition: a natural-language date input paired with a popover calendar. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

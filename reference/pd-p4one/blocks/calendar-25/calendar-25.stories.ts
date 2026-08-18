import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar25Component } from './calendar-25.component';

/**
 * `calendar-25` — a date and time range picker: a full-width
 * Popover-anchored date-picker row (identical composition to `calendar-22`)
 * stacked above a "From"/"To" pair of native time `<input>`s. Pure
 * composition of already-ported primitives; no new tokens or variants are
 * introduced by this block.
 */
const meta: Meta<Calendar25Component> = {
  title: 'Blocks/calendar/calendar-25',
  component: Calendar25Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar25Component,
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
        <app-block-calendar-25 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar25Component>;

/** The full calendar-25 composition: a date picker above a from/to time pair. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

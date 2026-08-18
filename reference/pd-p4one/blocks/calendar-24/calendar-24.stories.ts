import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar24Component } from './calendar-24.component';

/**
 * `calendar-24` — a date and time picker: a Popover-anchored date-picker
 * column (identical composition to `calendar-22`) next to a plain native
 * time `<input>` column. Pure composition of already-ported primitives; no
 * new tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar24Component> = {
  title: 'Blocks/calendar/calendar-24',
  component: Calendar24Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar24Component,
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
        <app-block-calendar-24 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar24Component>;

/** The full calendar-24 composition: a date picker beside a time field. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

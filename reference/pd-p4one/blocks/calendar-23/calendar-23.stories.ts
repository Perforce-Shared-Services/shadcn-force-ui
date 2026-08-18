import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { Calendar23Component } from './calendar-23.component';

/**
 * `calendar-23` — a date range picker: a Label above a Popover-anchored
 * trigger button that opens a range-select `ui/calendar` (dropdown
 * month/year caption). Pure composition of already-ported primitives; no new
 * tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar23Component> = {
  title: 'Blocks/calendar/calendar-23',
  component: Calendar23Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar23Component,
        Button,
        Calendar,
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
        <app-block-calendar-23 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar23Component>;

/** The full calendar-23 composition: a labelled "select your stay" range picker. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

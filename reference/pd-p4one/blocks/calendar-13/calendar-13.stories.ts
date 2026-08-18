import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';

import { Calendar13Component } from './calendar-13.component';

/**
 * `calendar-13` — a single calendar in dropdown caption mode, paired with a
 * labelled select for choosing the dropdown axis. Pure composition of the
 * already-ported `ui/calendar`, `ui/label`, and `ui/select` primitives; no
 * new tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar13Component> = {
  title: 'Blocks/calendar/calendar-13',
  component: Calendar13Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar13Component,
        Calendar,
        Label,
        Select,
        SelectRootDirective,
        SelectTrigger,
        SelectValue,
        SelectValueDirective,
        SelectContent,
        SelectItem,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-13 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar13Component>;

/** The full calendar-13 composition: a dropdown-caption calendar with its axis select. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

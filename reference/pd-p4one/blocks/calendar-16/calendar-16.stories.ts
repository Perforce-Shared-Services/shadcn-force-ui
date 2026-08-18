import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

import { Calendar16Component } from './calendar-16.component';

/**
 * `calendar-16` — with time picker. Composition of the already-ported
 * `ui/calendar`, `ui/card`, `ui/input`, and `ui/label` primitives; no new
 * tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar16Component> = {
  title: 'Blocks/calendar/calendar-16',
  component: Calendar16Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar16Component, Calendar, Card, CardContent, CardFooter, Input, Label],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-16 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar16Component>;

/** The full calendar-16 composition: a card wrapping a calendar plus Start/End time fields. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

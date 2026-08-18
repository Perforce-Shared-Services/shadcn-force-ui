import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

import { Calendar20Component } from './calendar-20.component';

/**
 * `calendar-20` — a booking card: calendar + scrollable time-slot list +
 * a summary footer with a "Continue" CTA. Pure composition of the
 * already-ported `ui/calendar`, `ui/card`, and `ui/button` primitives; no
 * new tokens or variants are introduced by this block.
 */
const meta: Meta<Calendar20Component> = {
  title: 'Blocks/calendar/calendar-20',
  component: Calendar20Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Calendar20Component, Button, Calendar, Card, CardContent, CardFooter],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-calendar-20 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar20Component>;

/** The full calendar-20 composition: a booking calendar with time-slot presets. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

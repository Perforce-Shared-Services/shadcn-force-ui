import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from '@/app/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';

import { Calendar12Component } from './calendar-12.component';

/**
 * `calendar-12` — a card-wrapped range calendar whose title/description swap
 * between English and Spanish copy via a select in the header. Pure
 * composition of the already-ported `ui/calendar`, `ui/card`, and
 * `ui/select` primitives; no new tokens or variants are introduced by this
 * block.
 */
const meta: Meta<Calendar12Component> = {
  title: 'Blocks/calendar/calendar-12',
  component: Calendar12Component,
  tags: ['autodocs'],
  // See login-01.stories.ts: block-level `w-full`/`w-fit` sizing needs a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // provides none, so `padded` is used instead.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Calendar12Component,
        Calendar,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardAction,
        CardContent,
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
        <app-block-calendar-12 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Calendar12Component>;

/** The full calendar-12 composition: a localized appointment card, defaulting to Spanish copy. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

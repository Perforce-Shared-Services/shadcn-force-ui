import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Card, CardContent } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/app/ui/input-otp';

import { Otp04Component } from './otp-04.component';

/**
 * `otp-04` — an OTP verification page with a split card (form + image).
 * Pure composition of already-ported `ui/*` primitives (card, field,
 * input-otp, label, button); no new tokens or variants are introduced by
 * this block.
 */
const meta: Meta<Otp04Component> = {
  title: 'Blocks/otp/otp-04',
  component: Otp04Component,
  tags: ['autodocs'],
  // Block-level compositions rely on `w-full`/`max-w-*` resolving against a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // wraps stories in a flex-centered body with no definite width, so every
  // nested `w-full` collapses to its content's min-content. `padded` renders
  // in normal block flow instead, giving the tree a real width to resolve
  // percentages against.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        Otp04Component,
        Button,
        Card,
        CardContent,
        Field,
        FieldGroup,
        FieldLabel,
        FieldDescription,
        InputOTP,
        InputOTPGroup,
        InputOTPSeparator,
        InputOTPSlot,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-otp-04 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Otp04Component>;

/** The full otp-04 composition: split card, 6-digit code entry, verify, resend, image panel. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

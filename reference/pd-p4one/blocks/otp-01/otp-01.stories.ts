import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/ui/input-otp';

import { OtpForm01 } from './otp-01.component';

/**
 * `otp-01` — a simple OTP verification form. Pure composition of
 * already-ported `ui/*` primitives (card, field, input-otp, button); no new
 * tokens or variants are introduced by this block.
 */
const meta: Meta<OtpForm01> = {
  title: 'Blocks/otp/otp-01',
  component: OtpForm01,
  tags: ['autodocs'],
  // Block-level compositions rely on `w-full`/`max-w-*` resolving against a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // wraps stories in a flex-centered body with no definite width, so every
  // nested `w-full` collapses to its content's min-content (confirmed
  // regression source from the login/signup blocks). `padded` renders in
  // normal block flow instead, giving the tree a real width to resolve
  // percentages against.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        OtpForm01,
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        Field,
        FieldGroup,
        FieldLabel,
        FieldDescription,
        InputOTP,
        InputOTPGroup,
        InputOTPSlot,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-otp-01 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<OtpForm01>;

/** The full otp-01 composition: card, 6-digit code field, submit, resend link. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

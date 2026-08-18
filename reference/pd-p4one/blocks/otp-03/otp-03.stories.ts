import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/ui/input-otp';

import { OtpBlock03Component } from './otp-03.component';

/**
 * `otp-03` — an OTP verification page with a muted background color. Pure
 * composition of already-ported `ui/*` primitives (card, field, input-otp,
 * label, button); no new tokens or variants are introduced by this block.
 */
const meta: Meta<OtpBlock03Component> = {
  title: 'Blocks/otp/otp-03',
  component: OtpBlock03Component,
  tags: ['autodocs'],
  // Block-level compositions rely on `w-full`/`max-w-*` resolving against a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // wraps stories in a flex-centered body with no definite width, so every
  // nested `w-full` collapses to its content's min-content — confirmed
  // regression from the login/signup block ports. `padded` renders in normal
  // block flow instead, giving the tree a real width to resolve against.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        OtpBlock03Component,
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
      <div style="min-height: 700px;">
        <app-block-otp-03 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<OtpBlock03Component>;

/** The full otp-03 composition: brand mark, muted page background, card with a 6-digit code field, verify button, and resend link. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

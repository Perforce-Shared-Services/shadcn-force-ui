import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/app/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/app/ui/input-otp';

import { OtpForm02 } from './otp-02.component';

/**
 * `otp-02` — a two column OTP page with a cover panel. Pure composition of
 * already-ported `ui/*` primitives (field, input-otp, button); no new tokens
 * or variants are introduced by this block. The cover column collapses below
 * the `lg` breakpoint, same as the upstream reference and `login-02`.
 */
const meta: Meta<OtpForm02> = {
  title: 'Blocks/otp/otp-02',
  component: OtpForm02,
  tags: ['autodocs'],
  // Block-level compositions rely on `w-full`/`max-w-*` resolving against a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // wraps stories in a flex-centered body with no definite width, so every
  // nested `w-full` collapses to its content's min-content (confirmed
  // regression source from the login/signup blocks — see otp-01/login-01 for
  // the same note). `padded` renders in normal block flow instead, giving the
  // tree a real width to resolve percentages against.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        OtpForm02,
        Button,
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
      <div class="min-h-[40rem] w-full bg-background">
        <app-block-otp-02 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<OtpForm02>;

/** The full otp-02 composition: form column with the 6-digit code field, and cover panel (hidden below `lg`). */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

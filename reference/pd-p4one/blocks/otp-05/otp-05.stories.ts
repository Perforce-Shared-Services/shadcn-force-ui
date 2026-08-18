import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/app/ui/input-otp';

import { OtpForm05 } from './otp-05.component';

/**
 * `otp-05` — a simple OTP verification form, no card. Pure composition of
 * already-ported `ui/*` primitives (button, input-otp, label, field); no new
 * tokens or variants are introduced by this block. See the component's JSDoc
 * for the upstream description/registry-content mismatch (no social-provider
 * buttons exist in the actual `@shadcn/otp-05` payload despite the registry
 * description).
 */
const meta: Meta<OtpForm05> = {
  title: 'Blocks/otp/otp-05',
  component: OtpForm05,
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
        OtpForm05,
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
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-otp-05 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<OtpForm05>;

/** The full otp-05 composition: centered brand mark, 6-digit code field, submit, resend link. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};

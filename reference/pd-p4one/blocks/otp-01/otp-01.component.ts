import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot, REGEXP_ONLY_DIGITS } from '@/app/ui/input-otp';

/**
 * Angular port of the shadcn/Force UI Block `otp-01` — "A simple OTP
 * verification form."
 *
 * Pure composition of already-ported `ui/*` primitives (card, field,
 * input-otp, button) — no new cva, no new tokens, no component-level SCSS.
 * Structural reference: the upstream registry's `OTPForm` (single-column
 * card, one 6-digit verification-code field, primary submit, resend
 * footnote).
 *
 * This is reference/demo code: `onSubmit()` is a stand-in for real
 * verification wiring and intentionally does nothing beyond a log line — a
 * consuming app owns its own submit handler.
 */
@Component({
  selector: 'app-block-otp-01',
  standalone: true,
  imports: [
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="w-full max-w-xs">
      <div uiCard>
        <div uiCardHeader>
          <h3 uiCardTitle>Enter verification code</h3>
          <div uiCardDescription>We sent a 6-digit code to your email.</div>
        </div>
        <div uiCardContent>
          <form (submit)="onSubmit($event)">
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="otp-01-code">Verification code</label>
                <div
                  uiInputOtp
                  id="otp-01-code"
                  [maxLength]="6"
                  [pattern]="REGEXP_ONLY_DIGITS"
                  [(value)]="code"
                  aria-describedby="otp-01-hint"
                  class="justify-center"
                  required>
                  <div uiInputOtpGroup class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <div uiInputOtpSlot [index]="0"></div>
                    <div uiInputOtpSlot [index]="1"></div>
                    <div uiInputOtpSlot [index]="2"></div>
                    <div uiInputOtpSlot [index]="3"></div>
                    <div uiInputOtpSlot [index]="4"></div>
                    <div uiInputOtpSlot [index]="5"></div>
                  </div>
                </div>
                <p uiFieldDescription id="otp-01-hint">Enter the 6-digit code sent to your email.</p>
              </div>
              <div uiFieldGroup>
                <button uiButton type="submit">Verify</button>
                <p uiFieldDescription class="text-center">
                  Did not receive the code?
                  <button uiButton variant="link" type="button" (click)="onResend($event)">Resend</button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class OtpForm01 {
  protected readonly REGEXP_ONLY_DIGITS = REGEXP_ONLY_DIGITS;
  protected code = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own verification flow here.
    console.log('otp-01: submit', this.code);
  }

  onResend(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own resend handler here.
    console.log('otp-01: resend requested');
  }
}

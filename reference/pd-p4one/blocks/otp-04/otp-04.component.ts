import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Card, CardContent } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from '@/app/ui/input-otp';

/**
 * Angular port of the shadcn/Force UI Block `otp-04` — "An OTP page with
 * form and image."
 *
 * Pure composition of already-ported `ui/*` primitives (card, field,
 * input-otp, label, button) — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `OTPForm` (split card —
 * verification form on the left, a full-bleed image panel on the right,
 * hidden below `md`; a muted "by continuing you agree" disclaimer below the
 * card). Same split-card/placeholder-image pattern as `block/login-04`
 * (`https://placehold.co/...` stand-in — no new asset, no new dependency).
 *
 * This is reference/demo code: `onSubmit`/`onResend` are stand-ins for real
 * verification wiring and intentionally do nothing beyond a log line — a
 * consuming app owns its own submit/resend handlers.
 */
@Component({
  selector: 'app-block-otp-04',
  standalone: true,
  imports: [
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6 md:max-w-3xl md:min-h-[450px]">
      <div uiCard class="flex-1 overflow-hidden p-0">
        <div uiCardContent class="grid flex-1 p-0 md:grid-cols-2">
          <form class="flex flex-col items-center justify-center p-6 md:p-8" (submit)="onSubmit($event)">
            <div uiFieldGroup>
              <div uiField class="items-center text-center">
                <h1 class="text-2xl font-bold">Enter verification code</h1>
                <p class="text-balance text-sm text-muted-foreground">We sent a 6-digit code to your email.</p>
              </div>

              <div uiField>
                <label uiFieldLabel for="otp-04-code" class="sr-only">Verification code</label>
                <div
                  uiInputOtp
                  id="otp-04-code"
                  [maxLength]="6"
                  [pattern]="REGEXP_ONLY_DIGITS"
                  [(value)]="code"
                  aria-describedby="otp-04-hint"
                  required
                  class="justify-center gap-4">
                  <div uiInputOtpGroup>
                    <div uiInputOtpSlot [index]="0"></div>
                    <div uiInputOtpSlot [index]="1"></div>
                    <div uiInputOtpSlot [index]="2"></div>
                  </div>
                  <div uiInputOtpSeparator></div>
                  <div uiInputOtpGroup>
                    <div uiInputOtpSlot [index]="3"></div>
                    <div uiInputOtpSlot [index]="4"></div>
                    <div uiInputOtpSlot [index]="5"></div>
                  </div>
                </div>
                <p uiFieldDescription id="otp-04-hint" class="text-center">Enter the 6-digit code sent to your email.</p>
              </div>

              <div uiField>
                <button uiButton type="submit">Verify</button>
                <p uiFieldDescription class="text-center">
                  Did not receive the code?
                  <button uiButton variant="link" type="button" (click)="onResend($event)">Resend</button>
                </p>
              </div>
            </div>
          </form>

          <div class="relative hidden bg-muted md:block">
            <img
              src="https://placehold.co/600x800/e5e5e5/a3a3a3?text=%20"
              alt=""
              class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </div>
      </div>

      <p uiFieldDescription class="px-6 text-center">
        By clicking Verify, you agree to our
        <a href="#" (click)="$event.preventDefault()">Terms of Service</a> and
        <a href="#" (click)="$event.preventDefault()">Privacy Policy</a>.
      </p>
    </div>
  `,
})
export class Otp04Component {
  protected readonly REGEXP_ONLY_DIGITS = REGEXP_ONLY_DIGITS;

  protected code = '';

  protected onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo composition only — a consuming product wires its own
    // verification handler here.
    console.log('[block/otp-04] submit', this.code);
  }

  protected onResend(event: Event): void {
    event.preventDefault();
    console.log('[block/otp-04] resend requested');
  }
}

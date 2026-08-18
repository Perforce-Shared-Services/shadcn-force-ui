import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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
  REGEXP_ONLY_DIGITS,
} from '@/app/ui/input-otp';

/**
 * Angular port of the shadcn/Force UI Block `otp-02` — "A two column OTP page
 * with a cover image."
 *
 * Pure composition of already-ported `ui/*` primitives (field, input-otp,
 * button) — no new cva, no new tokens, no component-level SCSS. Structural
 * reference: the upstream registry's `page.tsx` + `OTPForm` (centered form
 * column on the left, decorative cover panel hidden below the `lg`
 * breakpoint on the right). Unlike `otp-01`/`otp-03`/`otp-04`, this variant
 * is NOT card-wrapped — the form sits directly in the column, same shape as
 * `login-02`.
 *
 * The upstream reference renders a real `<img src="/placeholder.svg">` in the
 * cover column. This port has no image asset to ship, so the cover column is
 * a decorative token-only panel (`bg-muted` + a centered glyph) instead of an
 * `<img>` pointed at a placeholder file — same deviation `login-02` documents.
 *
 * This is reference/demo code: `onSubmit()`/`onResend()` are stand-ins for
 * real verification wiring and intentionally do nothing beyond a log line —
 * a consuming app owns its own submit/resend handlers.
 */
@Component({
  selector: 'app-block-otp-02',
  standalone: true,
  imports: [Button, Field, FieldGroup, FieldLabel, FieldDescription, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="grid min-h-svh lg:grid-cols-2">
      <div class="flex flex-1 items-center justify-center p-6 lg:p-10">
        <div class="w-full max-w-xs">
          <form (submit)="onSubmit($event)">
            <div uiFieldGroup>
              <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">Enter verification code</h1>
                <p class="text-sm text-balance text-muted-foreground">
                  We sent a 6-digit code to your email.
                </p>
              </div>
              <div uiField>
                <label uiFieldLabel for="otp-02-otp" class="sr-only">Verification code</label>
                <div
                  uiInputOtp
                  id="otp-02-otp"
                  [maxLength]="6"
                  [pattern]="REGEXP_ONLY_DIGITS"
                  required
                  aria-describedby="otp-02-description"
                  class="justify-center"
                  [(value)]="code">
                  <div uiInputOtpGroup>
                    <div uiInputOtpSlot [index]="0"></div>
                    <div uiInputOtpSlot [index]="1"></div>
                  </div>
                  <div uiInputOtpSeparator></div>
                  <div uiInputOtpGroup>
                    <div uiInputOtpSlot [index]="2"></div>
                    <div uiInputOtpSlot [index]="3"></div>
                  </div>
                  <div uiInputOtpSeparator></div>
                  <div uiInputOtpGroup>
                    <div uiInputOtpSlot [index]="4"></div>
                    <div uiInputOtpSlot [index]="5"></div>
                  </div>
                </div>
                <p uiFieldDescription id="otp-02-description" class="text-center">
                  Enter the 6-digit code sent to your email.
                </p>
              </div>
              <button uiButton type="submit">Verify</button>
              <p uiFieldDescription class="text-center">
                Did not receive the code?
                <button uiButton variant="link" type="button" (click)="onResend($event)">Resend</button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div class="relative hidden items-center justify-center bg-muted lg:flex">
        <svg
          class="size-16 text-muted-foreground/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </div>
    </div>
  `,
})
export class OtpForm02 {
  protected readonly REGEXP_ONLY_DIGITS = REGEXP_ONLY_DIGITS;

  readonly code = signal('');

  onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own verification flow here.
    console.log('otp-02: submit', this.code());
  }

  onResend(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own resend handler here.
    console.log('otp-02: resend requested');
  }
}

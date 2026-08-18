import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from '@/app/ui/input-otp';

import { OTP_05_LOGO_SVG } from './otp-05.icons';

/**
 * Angular port of the shadcn/Force UI Block `otp-05`.
 *
 * Registry description says "A simple OTP form with social providers", but
 * `npx shadcn view @shadcn/otp-05` returns no social-provider markup at all —
 * the two-file payload (`page.tsx` + `otp-form.tsx`) is a plain single-field
 * verification form with no Apple/Google buttons, unlike `login-05` /
 * `signup-05` (whose registry payloads DO contain those buttons and match
 * their own descriptions). Treated as an upstream metadata bug — likely the
 * description was copy-pasted from the login/signup-05 template and never
 * updated, since "continue with Google" doesn't make sense on a screen whose
 * whole premise is that a provider was already chosen. This port follows the
 * actual registry content (no fabricated social buttons) rather than the
 * description string.
 *
 * Pure composition of already-ported `ui/*` primitives (button, input-otp,
 * label, field) — no new cva, no new tokens, no component-level SCSS.
 * Structural reference: the upstream registry's `OTPForm` (no card — centered
 * brand mark + heading, one 6-digit verification-code field, primary submit,
 * resend footnote, terms footer). Same no-card/centered-heading layout family
 * as `login-05` / `signup-05`.
 *
 * The registry's icon is `GalleryVerticalEnd` (a generic `lucide-react`
 * placeholder) with sr-only text "Acme Inc." — as with `login-05` /
 * `signup-05`, this port renders the real Perforce ribbon mark via the
 * `otp-05.icons.ts` swap-point instead, with sr-only text "Perforce".
 *
 * This is reference/demo code: `onSubmit()` is a stand-in for real
 * verification wiring and intentionally does nothing beyond a log line — a
 * consuming app owns its own submit handler.
 */
@Component({
  selector: 'app-block-otp-05',
  standalone: true,
  imports: [
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div class="flex w-full max-w-sm flex-col gap-6">
        <form (submit)="onSubmit($event)">
          <div uiFieldGroup>
            <div class="flex flex-col items-center gap-2 text-center">
              <a href="#" (click)="$event.preventDefault()" class="flex flex-col items-center gap-2 font-medium">
                <div
                  class="flex size-8 items-center justify-center rounded-md [&_svg]:h-6 [&_svg]:w-auto [&_svg]:fill-current"
                  aria-hidden="true"
                  [innerHTML]="logoIcon"
                ></div>
                <span class="sr-only">Perforce</span>
              </a>
              <h1 class="text-xl font-bold">Enter verification code</h1>
              <p uiFieldDescription id="otp-05-hint">We sent a 6-digit code to your email address.</p>
            </div>

            <div uiField>
              <label uiFieldLabel for="otp-05-code" class="sr-only">Verification code</label>
              <div
                uiInputOtp
                id="otp-05-code"
                [maxLength]="6"
                [pattern]="REGEXP_ONLY_DIGITS"
                [(value)]="code"
                aria-describedby="otp-05-hint"
                required
                class="justify-center gap-4"
              >
                <div
                  uiInputOtpGroup
                  class="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
                >
                  <div uiInputOtpSlot [index]="0"></div>
                  <div uiInputOtpSlot [index]="1"></div>
                  <div uiInputOtpSlot [index]="2"></div>
                </div>
                <div uiInputOtpSeparator></div>
                <div
                  uiInputOtpGroup
                  class="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
                >
                  <div uiInputOtpSlot [index]="3"></div>
                  <div uiInputOtpSlot [index]="4"></div>
                  <div uiInputOtpSlot [index]="5"></div>
                </div>
              </div>
              <p uiFieldDescription class="text-center">
                Did not receive the code?
                <button uiButton variant="link" type="button" (click)="onResend($event)">Resend</button>
              </p>
            </div>

            <div uiField>
              <button uiButton type="submit">Verify</button>
            </div>
          </div>
        </form>
        <p uiFieldDescription class="px-6 text-center">
          By clicking Verify, you agree to our
          <a href="#" (click)="$event.preventDefault()">Terms of Service</a> and
          <a href="#" (click)="$event.preventDefault()">Privacy Policy</a>.
        </p>
      </div>
    </div>
  `,
})
export class OtpForm05 {
  protected readonly REGEXP_ONLY_DIGITS = REGEXP_ONLY_DIGITS;
  protected code = '';

  /**
   * Sanitizer-trusted inline SVG — the static Perforce brand-mark markup
   * defined in `otp-05.icons.ts`, same swap-point pattern as every other
   * ported icon in this app.
   */
  protected readonly logoIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    OTP_05_LOGO_SVG,
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own verification flow here.
    console.log('otp-05: submit', this.code);
  }

  protected onResend(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own resend flow here.
    console.log('otp-05: resend requested');
  }
}

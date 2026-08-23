import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/angular-ui/input-otp"

// Material Symbols glyph matching the React example's RefreshCwIcon
// (apps/v4/examples/material-symbols-map.ts).
const REFRESH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg>`

@Component({
  selector: "preview-input-otp-form",
  standalone: true,
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  ],
  template: `
    <div uiCard class="mx-auto max-w-md">
      <div uiCardHeader>
        <div uiCardTitle>Verify your login</div>
        <div uiCardDescription>
          Enter the verification code we sent to your email address:
          <span class="font-medium">m&#64;example.com</span>.
        </div>
      </div>
      <div uiCardContent>
        <div uiField>
          <div class="flex items-center justify-between">
            <label uiFieldLabel for="otp-verification">Verification code</label>
            <button uiButton variant="outline" size="xs">
              <svg [innerHTML]="refresh" aria-hidden="true"></svg>
              Resend Code
            </button>
          </div>
          <div uiInputOtp id="otp-verification" [maxLength]="6" required>
            <div
              uiInputOtpGroup
              class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
            >
              <div uiInputOtpSlot [index]="0"></div>
              <div uiInputOtpSlot [index]="1"></div>
              <div uiInputOtpSlot [index]="2"></div>
            </div>
            <div uiInputOtpSeparator class="mx-2"></div>
            <div
              uiInputOtpGroup
              class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
            >
              <div uiInputOtpSlot [index]="3"></div>
              <div uiInputOtpSlot [index]="4"></div>
              <div uiInputOtpSlot [index]="5"></div>
            </div>
          </div>
          <p uiFieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </p>
        </div>
      </div>
      <div uiCardFooter>
        <div uiField>
          <button uiButton type="submit" class="w-full">Verify</button>
          <div class="text-sm text-muted-foreground">
            Having trouble signing in?
            <a
              href="#"
              class="underline underline-offset-4 transition-colors hover:text-primary"
              >Contact support</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputOtpFormComponent {
  protected readonly refresh = REFRESH_SVG
}

export default InputOtpFormComponent

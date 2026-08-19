import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/ui/input-otp"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-otp-invalid",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator],
  template: `<div class="flex flex-col gap-1.5">
    <div
      uiInputOtp
      aria-label="One-time password"
      aria-invalid="true"
      aria-describedby="input-otp-invalid-error"
      [maxLength]="6"
      [value]="'000000'"
    >
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="0" aria-invalid="true"></div>
        <div uiInputOtpSlot [index]="1" aria-invalid="true"></div>
        <div uiInputOtpSlot [index]="2" aria-invalid="true"></div>
      </div>
      <div uiInputOtpSeparator></div>
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="3" aria-invalid="true"></div>
        <div uiInputOtpSlot [index]="4" aria-invalid="true"></div>
        <div uiInputOtpSlot [index]="5" aria-invalid="true"></div>
      </div>
    </div>
    <p id="input-otp-invalid-error" class="text-sm text-destructive">
      Invalid code. Try again.
    </p>
  </div>`,
})
export class InputOtpInvalidComponent {}

export default InputOtpInvalidComponent

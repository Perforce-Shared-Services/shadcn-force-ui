import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@/ui/input-otp"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-otp-four-digits",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot],
  template: `<div
    uiInputOtp
    aria-label="4-digit PIN"
    [maxLength]="4"
    [pattern]="digitsOnly"
  >
    <div uiInputOtpGroup>
      <div uiInputOtpSlot [index]="0"></div>
      <div uiInputOtpSlot [index]="1"></div>
      <div uiInputOtpSlot [index]="2"></div>
      <div uiInputOtpSlot [index]="3"></div>
    </div>
  </div>`,
})
export class InputOtpFourDigitsComponent {
  protected readonly digitsOnly = REGEXP_ONLY_DIGITS
}

export default InputOtpFourDigitsComponent

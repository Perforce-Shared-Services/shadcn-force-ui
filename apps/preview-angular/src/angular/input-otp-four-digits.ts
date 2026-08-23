import { Component } from "@angular/core"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/angular-ui/input-otp"

const REGEXP_ONLY_DIGITS = "^\\d+$"

@Component({
  selector: "preview-input-otp-four-digits",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot],
  template: `
    <div uiInputOtp [maxLength]="4" [pattern]="digitsOnly">
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="0"></div>
        <div uiInputOtpSlot [index]="1"></div>
        <div uiInputOtpSlot [index]="2"></div>
        <div uiInputOtpSlot [index]="3"></div>
      </div>
    </div>
  `,
})
export class InputOtpFourDigitsComponent {
  protected readonly digitsOnly = REGEXP_ONLY_DIGITS
}

export default InputOtpFourDigitsComponent

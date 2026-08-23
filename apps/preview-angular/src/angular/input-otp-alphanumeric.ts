import { Component } from "@angular/core"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/angular-ui/input-otp"

const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$"

@Component({
  selector: "preview-input-otp-alphanumeric",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot],
  template: `
    <div uiInputOtp [maxLength]="6" [pattern]="digitsAndChars">
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
  `,
})
export class InputOtpAlphanumericComponent {
  protected readonly digitsAndChars = REGEXP_ONLY_DIGITS_AND_CHARS
}

export default InputOtpAlphanumericComponent

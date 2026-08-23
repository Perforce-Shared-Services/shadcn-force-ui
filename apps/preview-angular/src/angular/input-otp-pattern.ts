import { Component } from "@angular/core"

import { Field, FieldLabel } from "@/angular-ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/angular-ui/input-otp"

const REGEXP_ONLY_DIGITS = "^\\d+$"

@Component({
  selector: "preview-input-otp-pattern",
  standalone: true,
  imports: [Field, FieldLabel, InputOTP, InputOTPGroup, InputOTPSlot],
  template: `
    <div uiField class="w-fit">
      <label uiFieldLabel for="digits-only">Digits Only</label>
      <div uiInputOtp id="digits-only" [maxLength]="6" [pattern]="digitsOnly">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
          <div uiInputOtpSlot [index]="3"></div>
          <div uiInputOtpSlot [index]="4"></div>
          <div uiInputOtpSlot [index]="5"></div>
        </div>
      </div>
    </div>
  `,
})
export class InputOtpPatternComponent {
  protected readonly digitsOnly = REGEXP_ONLY_DIGITS
}

export default InputOtpPatternComponent

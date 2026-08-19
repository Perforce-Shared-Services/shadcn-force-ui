import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@/ui/input-otp"
import { Label } from "@/ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-otp-pattern",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, Label],
  template: `<div class="flex flex-col gap-1.5">
    <label uiLabel for="digits-only">Digits only</label>
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
  </div>`,
})
export class InputOtpPatternComponent {
  protected readonly digitsOnly = REGEXP_ONLY_DIGITS
}

export default InputOtpPatternComponent

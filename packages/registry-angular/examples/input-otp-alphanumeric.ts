import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/ui/input-otp"
import { Label } from "@/ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-otp-alphanumeric",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, Label],
  template: `<div class="flex flex-col gap-1.5">
    <label uiLabel for="alphanumeric">Letters and digits</label>
    <div uiInputOtp id="alphanumeric" [maxLength]="6" [pattern]="alphanumeric">
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
export class InputOtpAlphanumericComponent {
  protected readonly alphanumeric = REGEXP_ONLY_DIGITS_AND_CHARS
}

export default InputOtpAlphanumericComponent

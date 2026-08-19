import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/angular-ui/input-otp"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-otp-demo",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot],
  template: `<div
    uiInputOtp
    aria-label="One-time password"
    [maxLength]="6"
    [value]="'123456'"
  >
    <div uiInputOtpGroup>
      <div uiInputOtpSlot [index]="0"></div>
      <div uiInputOtpSlot [index]="1"></div>
      <div uiInputOtpSlot [index]="2"></div>
      <div uiInputOtpSlot [index]="3"></div>
      <div uiInputOtpSlot [index]="4"></div>
      <div uiInputOtpSlot [index]="5"></div>
    </div>
  </div>`,
})
export class InputOtpDemoComponent {}

export default InputOtpDemoComponent

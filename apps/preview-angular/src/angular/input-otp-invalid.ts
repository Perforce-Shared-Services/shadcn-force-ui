import { Component } from "@angular/core"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/angular-ui/input-otp"

@Component({
  selector: "preview-input-otp-invalid",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot],
  template: `
    <div uiInputOtp [maxLength]="6" value="000000">
      <div uiInputOtpGroup>
        <div uiInputOtpSlot aria-invalid [index]="0"></div>
        <div uiInputOtpSlot aria-invalid [index]="1"></div>
      </div>
      <div uiInputOtpSeparator></div>
      <div uiInputOtpGroup>
        <div uiInputOtpSlot aria-invalid [index]="2"></div>
        <div uiInputOtpSlot aria-invalid [index]="3"></div>
      </div>
      <div uiInputOtpSeparator></div>
      <div uiInputOtpGroup>
        <div uiInputOtpSlot aria-invalid [index]="4"></div>
        <div uiInputOtpSlot aria-invalid [index]="5"></div>
      </div>
    </div>
  `,
})
export class InputOtpInvalidComponent {}

export default InputOtpInvalidComponent

import { Component } from "@angular/core"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/angular-ui/input-otp"

@Component({
  selector: "preview-input-otp-separator",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot],
  template: `
    <div uiInputOtp [maxLength]="6">
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="0"></div>
        <div uiInputOtpSlot [index]="1"></div>
      </div>
      <div uiInputOtpSeparator></div>
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="2"></div>
        <div uiInputOtpSlot [index]="3"></div>
      </div>
      <div uiInputOtpSeparator></div>
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="4"></div>
        <div uiInputOtpSlot [index]="5"></div>
      </div>
    </div>
  `,
})
export class InputOtpSeparatorComponent {}

export default InputOtpSeparatorComponent

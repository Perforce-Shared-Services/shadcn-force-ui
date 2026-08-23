import { Component, signal } from "@angular/core"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/angular-ui/input-otp"

@Component({
  selector: "preview-input-otp-controlled",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot],
  template: `
    <div class="space-y-2">
      <div uiInputOtp [maxLength]="6" [(value)]="value">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
          <div uiInputOtpSlot [index]="3"></div>
          <div uiInputOtpSlot [index]="4"></div>
          <div uiInputOtpSlot [index]="5"></div>
        </div>
      </div>
      <div class="text-center text-sm">
        @if (value() === "") {
          Enter your one-time password.
        } @else {
          You entered: {{ value() }}
        }
      </div>
    </div>
  `,
})
export class InputOtpControlledComponent {
  readonly value = signal("")
}

export default InputOtpControlledComponent

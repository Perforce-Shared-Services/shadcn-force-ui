import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp"
import { Component, signal } from "@angular/core"

@Component({
  selector: "preview-input-otp-controlled",
  standalone: true,
  imports: [InputOTP, InputOTPGroup, InputOTPSlot],
  template: `<div class="flex flex-col items-center gap-2">
    <div
      uiInputOtp
      aria-label="One-time password"
      [maxLength]="6"
      [(value)]="code"
    >
      <div uiInputOtpGroup>
        <div uiInputOtpSlot [index]="0"></div>
        <div uiInputOtpSlot [index]="1"></div>
        <div uiInputOtpSlot [index]="2"></div>
        <div uiInputOtpSlot [index]="3"></div>
        <div uiInputOtpSlot [index]="4"></div>
        <div uiInputOtpSlot [index]="5"></div>
      </div>
    </div>
    <p class="text-sm">
      @if (code() === "") {
        Enter your one-time password.
      } @else {
        You entered: {{ code() }}
      }
    </p>
  </div>`,
})
export class InputOtpControlledComponent {
  protected readonly code = signal("")
}

export default InputOtpControlledComponent

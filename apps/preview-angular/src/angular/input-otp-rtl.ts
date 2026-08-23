import { Component } from "@angular/core"

import { Field, FieldLabel } from "@/angular-ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/angular-ui/input-otp"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-input-otp-rtl",
  standalone: true,
  imports: [Field, FieldLabel, InputOTP, InputOTPGroup, InputOTPSlot],
  template: `
    <div uiField class="mx-auto max-w-xs">
      <label uiFieldLabel for="input-otp-rtl">رمز التحقق</label>
      <div uiInputOtp dir="rtl" id="input-otp-rtl" [maxLength]="6" value="123456">
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
export class InputOtpRtlComponent {}

export default InputOtpRtlComponent

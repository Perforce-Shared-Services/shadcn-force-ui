// [FORCE-UI] Angular port convention: static Arabic labels + dir="rtl"
// (the React example uses a client-side translation hook).
import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-rtl",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Input],
  template: `
    <div uiField dir="rtl">
      <label uiFieldLabel for="input-rtl-api-key">مفتاح API</label>
      <input
        uiInput
        id="input-rtl-api-key"
        type="password"
        placeholder="sk-..."
        dir="rtl"
      />
      <p uiFieldDescription dir="rtl">
        مفتاح API الخاص بك مشفر ومخزن بأمان.
      </p>
    </div>
  `,
})
export class InputRtlComponent {}

export default InputRtlComponent

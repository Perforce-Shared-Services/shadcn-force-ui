import { Checkbox } from "@/angular-ui/checkbox"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic label + dir="rtl" render the same visual state.
// apps/v4/examples/base/label-rtl.tsx
@Component({
  selector: "preview-label-rtl",
  standalone: true,
  imports: [Checkbox, Label],
  template: `<div class="flex gap-2" dir="rtl">
    <button uiCheckbox id="terms-label-rtl" dir="rtl"></button>
    <label uiLabel for="terms-label-rtl" dir="rtl">قبول الشروط والأحكام</label>
  </div>`,
})
export class LabelRtlComponent {}

export default LabelRtlComponent

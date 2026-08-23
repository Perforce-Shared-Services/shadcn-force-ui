import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/angular-ui/field"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

/**
 * RTL parity demo. React's version switches one 4-field group between
 * ar/he/en via an interactive language picker; Angular previews are static,
 * so all three languages render side by side, each in its own correctly
 * directed FieldGroup (ar/he = rtl, en = ltr).
 */
@Component({
  selector: "preview-checkbox-rtl",
  standalone: true,
  imports: [Checkbox, Label, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle],
  template: ` <div class="flex flex-col gap-6">
    <div dir="rtl" lang="ar">
      <div uiFieldGroup class="max-w-sm">
        <div uiField orientation="horizontal">
          <button uiCheckbox id="terms-checkbox-rtl-ar" name="terms-checkbox"></button>
          <label uiLabel for="terms-checkbox-rtl-ar">قبول الشروط والأحكام</label>
        </div>
        <div uiField orientation="horizontal">
          <button uiCheckbox id="terms-checkbox-2-rtl-ar" name="terms-checkbox-2" [checked]="true"></button>
          <div uiFieldContent>
            <label uiFieldLabel for="terms-checkbox-2-rtl-ar">قبول الشروط والأحكام</label>
            <p uiFieldDescription>بالنقر على هذا المربع، فإنك توافق على الشروط.</p>
          </div>
        </div>
        <div uiField orientation="horizontal" data-disabled>
          <button uiCheckbox id="notifications-rtl-ar" disabled></button>
          <label uiFieldLabel for="notifications-rtl-ar">تفعيل الإشعارات</label>
        </div>
      </div>
    </div>

    <div dir="rtl" lang="he">
      <div uiFieldGroup class="max-w-sm">
        <div uiField orientation="horizontal">
          <button uiCheckbox id="terms-checkbox-rtl-he" name="terms-checkbox-he"></button>
          <label uiLabel for="terms-checkbox-rtl-he">קבל תנאים והגבלות</label>
        </div>
        <div uiField orientation="horizontal">
          <button uiCheckbox id="terms-checkbox-2-rtl-he" name="terms-checkbox-2-he" [checked]="true"></button>
          <div uiFieldContent>
            <label uiFieldLabel for="terms-checkbox-2-rtl-he">קבל תנאים והגבלות</label>
            <p uiFieldDescription>על ידי לחיצה על תיבת הסימון הזו, אתה מסכים לתנאים.</p>
          </div>
        </div>
      </div>
    </div>

    <div lang="en">
      <div uiFieldGroup class="max-w-sm">
        <div uiField orientation="horizontal">
          <button uiCheckbox id="terms-checkbox-rtl-en" name="terms-checkbox-en"></button>
          <label uiLabel for="terms-checkbox-rtl-en">Accept terms and conditions</label>
        </div>
        <div uiField orientation="horizontal">
          <button uiCheckbox id="toggle-checkbox-rtl-en" name="toggle-checkbox-en"></button>
          <div uiFieldContent>
            <span uiFieldTitle>Enable notifications</span>
            <p uiFieldDescription>
              You can enable or disable notifications at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class CheckboxRtlComponent {}

export default CheckboxRtlComponent

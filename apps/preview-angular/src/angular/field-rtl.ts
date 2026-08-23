import { Button } from "@/angular-ui/button"
import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

// TODO(port): swap the native <select> fallbacks for uiSelect once the select
// component is ported (Wave 2) — this demo mirrors field-rtl.tsx.
interface SelectItem {
  label: string
  value: string | null
}

const months: SelectItem[] = [
  { label: "ش.ش", value: null },
  { label: "٠١", value: "01" },
  { label: "٠٢", value: "02" },
  { label: "٠٣", value: "03" },
  { label: "٠٤", value: "04" },
  { label: "٠٥", value: "05" },
  { label: "٠٦", value: "06" },
  { label: "٠٧", value: "07" },
  { label: "٠٨", value: "08" },
  { label: "٠٩", value: "09" },
  { label: "١٠", value: "10" },
  { label: "١١", value: "11" },
  { label: "١٢", value: "12" },
]

const years: SelectItem[] = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

// Arabic strings mirror the `ar` translation set in field-rtl.tsx, which is
// the language that example renders by default.
@Component({
  selector: "preview-field-rtl",
  standalone: true,
  imports: [
    Button,
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    Input,
    Textarea,
  ],
  template: `
    <div class="w-full max-w-md py-6" dir="rtl">
      <form>
        <div uiFieldGroup>
          <fieldset uiFieldSet>
            <legend uiFieldLegend>طريقة الدفع</legend>
            <p uiFieldDescription>جميع المعاملات آمنة ومشفرة</p>
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-card-name-43j-rtl">
                  الاسم على البطاقة
                </label>
                <input
                  uiInput
                  id="checkout-7j9-card-name-43j-rtl"
                  placeholder="Evil Rabbit"
                  required
                />
              </div>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-card-number-uw1-rtl">
                  رقم البطاقة
                </label>
                <input
                  uiInput
                  id="checkout-7j9-card-number-uw1-rtl"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <p uiFieldDescription>أدخل رقم البطاقة المكون من 16 رقمًا</p>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div uiField>
                  <label uiFieldLabel for="checkout-exp-month-ts6-rtl">
                    الشهر
                  </label>
                  <select id="checkout-exp-month-ts6-rtl" class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
                    @for (item of months; track item.label) {
                      <option [value]="item.value ?? ''">{{ item.label }}</option>
                    }
                  </select>
                </div>
                <div uiField>
                  <label uiFieldLabel for="checkout-7j9-exp-year-f59-rtl">
                    السنة
                  </label>
                  <select id="checkout-7j9-exp-year-f59-rtl" class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
                    @for (item of years; track item.label) {
                      <option [value]="item.value ?? ''">{{ item.label }}</option>
                    }
                  </select>
                </div>
                <div uiField>
                  <label uiFieldLabel for="checkout-7j9-cvv-rtl">CVV</label>
                  <input uiInput id="checkout-7j9-cvv-rtl" placeholder="123" required />
                </div>
              </div>
            </div>
          </fieldset>
          <div uiFieldSeparator></div>
          <fieldset uiFieldSet>
            <legend uiFieldLegend>عنوان الفوترة</legend>
            <p uiFieldDescription>عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك</p>
            <div uiFieldGroup>
              <div uiField orientation="horizontal">
                <button
                  uiCheckbox
                  id="checkout-7j9-same-as-shipping-wgm-rtl"
                  [checked]="true"
                ></button>
                <label
                  uiFieldLabel
                  for="checkout-7j9-same-as-shipping-wgm-rtl"
                  class="font-normal"
                >
                  نفس عنوان الشحن
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset uiFieldSet>
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-optional-comments-rtl">
                  تعليقات
                </label>
                <textarea
                  uiTextarea
                  id="checkout-7j9-optional-comments-rtl"
                  placeholder="أضف أي تعليقات إضافية"
                  class="resize-none"
                ></textarea>
              </div>
            </div>
          </fieldset>
          <div uiField orientation="horizontal">
            <button uiButton type="submit">إرسال</button>
            <button uiButton variant="outline" type="button">إلغاء</button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class FieldRtlComponent {}

export default FieldRtlComponent

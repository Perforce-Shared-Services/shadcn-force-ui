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

interface SelectItem {
  label: string
  value: string | null
}

// TODO(port): swap the native <select> fallbacks for uiSelect once the select
// component is ported (Wave 2) — this demo mirrors field-demo.tsx, which uses
// Select/SelectTrigger/SelectContent.
const months: SelectItem[] = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
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

@Component({
  selector: "preview-field-demo",
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
    <div class="w-full max-w-md">
      <form>
        <div uiFieldGroup>
          <fieldset uiFieldSet>
            <legend uiFieldLegend>Payment Method</legend>
            <p uiFieldDescription>
              All transactions are secure and encrypted
            </p>
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-card-name-43j">
                  Name on Card
                </label>
                <input
                  uiInput
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </div>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-card-number-uw1">
                  Card Number
                </label>
                <input
                  uiInput
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <p uiFieldDescription>
                  Enter your 16-digit card number
                </p>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div uiField>
                  <label uiFieldLabel for="checkout-exp-month-ts6">
                    Month
                  </label>
                  <select id="checkout-exp-month-ts6" class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
                    @for (item of months; track item.label) {
                      <option [value]="item.value ?? ''">{{ item.label }}</option>
                    }
                  </select>
                </div>
                <div uiField>
                  <label uiFieldLabel for="checkout-7j9-exp-year-f59">
                    Year
                  </label>
                  <select id="checkout-7j9-exp-year-f59" class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
                    @for (item of years; track item.label) {
                      <option [value]="item.value ?? ''">{{ item.label }}</option>
                    }
                  </select>
                </div>
                <div uiField>
                  <label uiFieldLabel for="checkout-7j9-cvv">CVV</label>
                  <input uiInput id="checkout-7j9-cvv" placeholder="123" required />
                </div>
              </div>
            </div>
          </fieldset>
          <div uiFieldSeparator></div>
          <fieldset uiFieldSet>
            <legend uiFieldLegend>Billing Address</legend>
            <p uiFieldDescription>
              The billing address associated with your payment method
            </p>
            <div uiFieldGroup>
              <div uiField orientation="horizontal">
                <button
                  uiCheckbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  [checked]="true"
                ></button>
                <label
                  uiFieldLabel
                  for="checkout-7j9-same-as-shipping-wgm"
                  class="font-normal"
                >
                  Same as shipping address
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset uiFieldSet>
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="checkout-7j9-optional-comments">
                  Comments
                </label>
                <textarea
                  uiTextarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  class="resize-none"
                ></textarea>
              </div>
            </div>
          </fieldset>
          <div uiField orientation="horizontal">
            <button uiButton type="submit">Submit</button>
            <button uiButton variant="outline" type="button">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class FieldDemoComponent {}

export default FieldDemoComponent

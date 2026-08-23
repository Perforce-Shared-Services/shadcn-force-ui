import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/angular-ui/field"
import { Component } from "@angular/core"

interface SelectItem {
  label: string
  value: string | null
}

// TODO(port): swap the native <select> fallback for uiSelect once the select
// component is ported (Wave 2) — this demo mirrors field-select.tsx.
const items: SelectItem[] = [
  { label: "Choose department", value: null },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "support" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
]

@Component({
  selector: "preview-field-select",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel],
  template: `
    <div uiField class="w-full max-w-xs">
      <label uiFieldLabel>Department</label>
      <select class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
        @for (item of items; track item.label) {
          <option [value]="item.value ?? ''">{{ item.label }}</option>
        }
      </select>
      <p uiFieldDescription>
        Select your department or area of work.
      </p>
    </div>
  `,
})
export class FieldSelectComponent {}

export default FieldSelectComponent

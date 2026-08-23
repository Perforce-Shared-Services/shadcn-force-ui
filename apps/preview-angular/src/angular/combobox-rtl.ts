import { Component, signal } from "@angular/core"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"
import { Field, FieldLabel } from "@/angular-ui/field"

// apps/v4/examples/base/combobox-rtl.tsx — multi-select chips combobox under
// `dir="rtl"` with Arabic labels (static Arabic per the Angular RTL convention).
const categories = ["technology", "design", "business", "marketing", "education", "health"]

const categoryLabels: Record<string, string> = {
  technology: "التكنولوجيا",
  design: "التصميم",
  business: "الأعمال",
  marketing: "التسويق",
  education: "التعليم",
  health: "الصحة",
}

@Component({
  selector: "preview-combobox-rtl",
  standalone: true,
  imports: [Field, FieldLabel, Combobox, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem],
  template: `
    <div uiField dir="rtl" class="mx-auto w-full max-w-xs">
      <label uiFieldLabel>الفئات</label>
      <div uiCombobox [(value)]="value" [multiple]="true" [autoHighlight]="true">
        <div uiComboboxChips>
          @for (v of value(); track v) {
            <span uiComboboxChip [value]="v">{{ categoryLabels[v] || v }}</span>
          }
          <input uiComboboxChipsInput placeholder="أضف فئات" />
        </div>
        <ng-template uiComboboxContent>
          <div uiComboboxEmpty>لم يتم العثور على فئات.</div>
          <div uiComboboxList>
            @for (category of categories; track category) {
              <div uiComboboxItem [value]="category">{{ categoryLabels[category] || category }}</div>
            }
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class ComboboxRtlComponent {
  readonly categories = categories
  readonly categoryLabels = categoryLabels
  readonly value = signal<unknown[]>(["technology"])
}

export default ComboboxRtlComponent

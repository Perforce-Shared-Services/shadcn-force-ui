import { Component } from "@angular/core"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/angular-ui/item"

interface Country {
  code: string
  value: string
  label: string
  continent: string
}

// apps/v4/examples/base/combobox-custom.tsx — rich item rows composed with the
// `item` primitives inside each option.
const countries: Country[] = [
  { code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  { code: "co", value: "colombia", label: "Colombia", continent: "South America" },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  { code: "nz", value: "new-zealand", label: "New Zealand", continent: "Oceania" },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  { code: "za", value: "south-africa", label: "South Africa", continent: "Africa" },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  { code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
  { code: "us", value: "united-states", label: "United States", continent: "North America" },
]

@Component({
  selector: "preview-combobox-custom",
  standalone: true,
  imports: [Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem, Item, ItemContent, ItemTitle, ItemDescription],
  template: `
    <div uiCombobox class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Search countries..." />
      <ng-template uiComboboxContent>
        <div uiComboboxEmpty>No countries found.</div>
        <div uiComboboxList>
          @for (country of countries; track country.code) {
            <div uiComboboxItem [value]="country" [label]="country.label">
              <div uiItem size="xs" class="p-0">
                <div uiItemContent>
                  <div uiItemTitle class="whitespace-nowrap">{{ country.label }}</div>
                  <div uiItemDescription>{{ country.continent }} ({{ country.code }})</div>
                </div>
              </div>
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class ComboboxCustomComponent {
  readonly countries = countries
}

export default ComboboxCustomComponent

import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/angular-ui/combobox"

interface Country {
  code: string
  value: string
  label: string
  continent: string
}

// apps/v4/examples/base/combobox-popup.tsx — button-style trigger; the search
// input lives INSIDE the popup.
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
  selector: "preview-combobox-popup",
  standalone: true,
  imports: [
    Button,
    Combobox,
    ComboboxTrigger,
    ComboboxValue,
    ComboboxContent,
    ComboboxInput,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
  ],
  template: `
    <div uiCombobox [(value)]="value">
      <button uiButton variant="outline" uiComboboxTrigger class="w-64 justify-between font-normal">
        <span uiComboboxValue placeholder="Select country" />
      </button>
      <ng-template uiComboboxContent>
        <div uiComboboxInput showTrigger="false" placeholder="Search" />
        <div uiComboboxEmpty>No items found.</div>
        <div uiComboboxList>
          @for (country of countries; track country.code) {
            <div uiComboboxItem [value]="country" [label]="country.label">{{ country.label }}</div>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class ComboboxPopupComponent {
  readonly countries = countries
  readonly value = signal<Country | null>(countries[0])
}

export default ComboboxPopupComponent

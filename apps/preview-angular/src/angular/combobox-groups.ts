import { Component } from "@angular/core"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/angular-ui/combobox"

interface TimezoneGroup {
  value: string
  items: string[]
}

// apps/v4/examples/base/combobox-groups.tsx — labelled groups separated by
// hairlines; groups hide entirely when the filter empties them.
const timezones: TimezoneGroup[] = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
]

@Component({
  selector: "preview-combobox-groups",
  standalone: true,
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxCollection,
    ComboboxSeparator,
    ComboboxItem,
  ],
  template: `
    <div uiCombobox class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Select a timezone" />
      <ng-template uiComboboxContent>
        <div uiComboboxEmpty>No timezones found.</div>
        <div uiComboboxList>
          @for (group of timezones; track group.value; let index = $index) {
            <div uiComboboxGroup>
              <div uiComboboxLabel>{{ group.value }}</div>
              <div uiComboboxCollection>
                @for (item of group.items; track item) {
                  <div uiComboboxItem [value]="item">{{ item }}</div>
                }
              </div>
              @if (index < timezones.length - 1) {
                <div uiComboboxSeparator />
              }
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class ComboboxGroupsComponent {
  readonly timezones = timezones
}

export default ComboboxGroupsComponent

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
} from "@/angular-ui/combobox"
import { InputGroupAddon } from "@/angular-ui/input-group"

interface TimezoneGroup {
  value: string
  items: string[]
}

// apps/v4/examples/base/combobox-input-group.tsx — a leading addon (globe icon)
// inside the combobox field; the popup aligns with an offset to clear the addon.
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
  selector: "preview-combobox-input-group",
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
    ComboboxItem,
    InputGroupAddon,
  ],
  template: `
    <div uiCombobox class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Select a timezone">
        <div uiInputGroupAddon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-4 fill-current"
            aria-hidden="true"
          >
            <path
              d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-83v-77q-33 0-56.5-24T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 129 88.5 227.5T440-163Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-58q0-98-52.5-179.5T608-781q4 17 6 34.5t2 36.5q0 45-32 77t-77 32h-80v79q0 20-13.5 33.5T380-475h-80v81h240v40q0 25-14.5 46T489-277l-29 12v102q74-8 132.5-51.5T716-265ZM204-629h239q20 0 33.5-14.5T490-678q0-20-13.5-33.5T443-725h-63q15-21 32.5-39.5T450-800q-64 4-118 38.5T245-674l-41 45Zm276 189Z"
            />
          </svg>
        </div>
      </div>
      <ng-template uiComboboxContent>
        <div uiComboboxEmpty>No timezones found.</div>
        <div uiComboboxList>
          @for (group of timezones; track group.value) {
            <div uiComboboxGroup>
              <div uiComboboxLabel>{{ group.value }}</div>
              <div uiComboboxCollection>
                @for (item of group.items; track item) {
                  <div uiComboboxItem [value]="item">{{ item }}</div>
                }
              </div>
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class ComboboxInputGroupComponent {
  readonly timezones = timezones
}

export default ComboboxInputGroupComponent

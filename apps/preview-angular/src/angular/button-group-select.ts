import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Input } from "@/angular-ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

interface Currency {
  label: string
  value: string
}

const CURRENCIES: Currency[] = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

// apps/v4/examples/base/button-group-select.tsx
// Placement inputs (alignItemWithTrigger / align) are owned by the radix-ng
// v1.x positioner — documented parity shift vs React's per-use props.
@Component({
  selector: "preview-button-group-select",
  standalone: true,
  imports: [
    Button,
    ButtonGroup,
    Input,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  ],
  template: `<div uiButtonGroup>
    <div uiButtonGroup>
      <div uiSelect [uiValue]="currency()" (uiValueChange)="currency.set($event)">
        <button uiSelectTrigger class="w-fit font-mono">
          <span uiSelectValue></span>
        </button>
        <ng-template uiSelectPortal>
          <div uiSelectPositioner>
            <div uiSelectContent>
              <div uiSelectGroup>
                @for (item of currencies; track item.value) {
                  <div uiSelectItem [value]="item.value">
                    {{ item.value }}
                    <span class="text-muted-foreground">{{ item.label }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
      </div>
      <input uiInput placeholder="10.00" pattern="[0-9]*" />
    </div>
    <div uiButtonGroup>
      <button uiButton aria-label="Send" size="icon" variant="outline">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M400-280v-400l200 200-200 200Z"/>
        </svg>
      </button>
    </div>
  </div>`,
})
export class ButtonGroupSelectComponent {
  readonly currencies = CURRENCIES
  readonly currency = signal("$")
}

export default ButtonGroupSelectComponent

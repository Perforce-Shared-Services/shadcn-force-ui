import { Component } from "@angular/core"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

import {
  Field,
} from "@/angular-ui/field"

// Parity shift: radix-ng v1.x positions the popup item-aligned whenever it
// opens (non-touch), so React's `alignItemWithTrigger` toggle has no Angular
// equivalent — documented with a <Callout> in select.mdx.
@Component({
  selector: "preview-select-align-item",
  standalone: true,
  imports: [Field, Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectPortal, SelectPositioner],
  template: `
    <div uiField class="w-full max-w-48">
      <div uiSelect defaultValue="banana">
        <button uiSelectTrigger class="w-full">
          <span uiSelectValue></span>
        </button>
        <ng-template uiSelectPortal>
          <div uiSelectPositioner>
            <div uiSelectContent>
              <div uiSelectGroup>
                <div uiSelectItem value="apple">Apple</div>
                <div uiSelectItem value="banana">Banana</div>
                <div uiSelectItem value="blueberry">Blueberry</div>
                <div uiSelectItem value="grapes">Grapes</div>
                <div uiSelectItem value="pineapple">Pineapple</div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class SelectAlignItemComponent {}

export default SelectAlignItemComponent

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

@Component({
  selector: "preview-select-disabled",
  standalone: true,
  imports: [Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectPortal, SelectPositioner],
  template: `
    <div uiSelect disabled>
      <button uiSelectTrigger class="w-full max-w-48">
        <span uiSelectValue placeholder="Select a fruit"></span>
      </button>
      <ng-template uiSelectPortal>
        <div uiSelectPositioner>
          <div uiSelectContent>
            <div uiSelectGroup>
              <div uiSelectItem value="apple">Apple</div>
              <div uiSelectItem value="banana">Banana</div>
              <div uiSelectItem value="blueberry">Blueberry</div>
              <div uiSelectItem value="grapes" disabled>Grapes</div>
              <div uiSelectItem value="pineapple">Pineapple</div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SelectDisabledComponent {}

export default SelectDisabledComponent

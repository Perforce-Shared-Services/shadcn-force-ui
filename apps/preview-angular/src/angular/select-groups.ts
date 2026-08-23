import { Component } from "@angular/core"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectPositioner,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

@Component({
  selector: "preview-select-groups",
  standalone: true,
  imports: [
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
    SelectItem,
    SelectPortal,
    SelectPositioner,
  ],
  template: `
    <div uiSelect>
      <button uiSelectTrigger class="w-full max-w-48">
        <span uiSelectValue placeholder="Select a fruit"></span>
      </button>
      <ng-template uiSelectPortal>
        <div uiSelectPositioner>
          <div uiSelectContent>
            <div uiSelectGroup>
              <div uiSelectLabel>Fruits</div>
              <div uiSelectItem value="apple">Apple</div>
              <div uiSelectItem value="banana">Banana</div>
              <div uiSelectItem value="blueberry">Blueberry</div>
            </div>
            <div uiSelectSeparator></div>
            <div uiSelectGroup>
              <div uiSelectLabel>Vegetables</div>
              <div uiSelectItem value="carrot">Carrot</div>
              <div uiSelectItem value="broccoli">Broccoli</div>
              <div uiSelectItem value="spinach">Spinach</div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SelectGroupsComponent {}

export default SelectGroupsComponent

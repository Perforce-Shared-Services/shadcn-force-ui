import { Component } from "@angular/core"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

@Component({
  selector: "preview-select-demo",
  standalone: true,
  imports: [Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectPortal, SelectPositioner],
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
              <div uiSelectItem value="grapes">Grapes</div>
              <div uiSelectItem value="pineapple">Pineapple</div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SelectDemoComponent {}

export default SelectDemoComponent

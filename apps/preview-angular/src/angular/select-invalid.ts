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
  FieldError,
  FieldLabel,
} from "@/angular-ui/field"

@Component({
  selector: "preview-select-invalid",
  standalone: true,
  imports: [Field, FieldLabel, FieldError, Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectPortal, SelectPositioner],
  template: `
    <div uiField data-invalid class="w-full max-w-48">
      <label uiFieldLabel>Fruit</label>
      <div uiSelect>
        <button uiSelectTrigger aria-invalid="true" class="w-full">
          <span uiSelectValue placeholder="Select a fruit"></span>
        </button>
        <ng-template uiSelectPortal>
          <div uiSelectPositioner>
            <div uiSelectContent>
              <div uiSelectGroup>
                <div uiSelectItem value="apple">Apple</div>
                <div uiSelectItem value="banana">Banana</div>
                <div uiSelectItem value="blueberry">Blueberry</div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
      <div uiFieldError>Please select a fruit.</div>
    </div>
  `,
})
export class SelectInvalidComponent {}

export default SelectInvalidComponent

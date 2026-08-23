import { Component, signal } from "@angular/core"

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

// RTL demo — static Arabic labels + dir="rtl" per the established port
// convention (no runtime language switcher in preview demos).
@Component({
  selector: "preview-select-rtl",
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
    <div uiSelect dir="rtl" [uiValue]="selectedFruit()" (uiValueChange)="selectedFruit.set($event)">
      <button uiSelectTrigger dir="rtl" class="w-32">
        <span uiSelectValue placeholder="اختر فاكهة"></span>
      </button>
      <ng-template uiSelectPortal>
        <div uiSelectPositioner>
          <div uiSelectContent dir="rtl">
            <div uiSelectGroup>
              <div uiSelectLabel>الفواكه</div>
              <div uiSelectItem value="apple">تفاح</div>
              <div uiSelectItem value="banana">موز</div>
              <div uiSelectItem value="blueberry">توت أزرق</div>
              <div uiSelectItem value="grapes">عنب</div>
              <div uiSelectItem value="pineapple">أناناس</div>
            </div>
            <div uiSelectSeparator></div>
            <div uiSelectGroup>
              <div uiSelectLabel>الخضروات</div>
              <div uiSelectItem value="carrot">جزر</div>
              <div uiSelectItem value="broccoli">بروكلي</div>
              <div uiSelectItem value="spinach">سبانخ</div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SelectRtlComponent {
  protected readonly selectedFruit = signal<string | undefined>(undefined)
}

export default SelectRtlComponent

import { Component } from "@angular/core"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectWrapper,
} from "@/angular-ui/native-select"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-native-select-rtl",
  standalone: true,
  imports: [NativeSelectWrapper, NativeSelect, NativeSelectOption],
  template: `
    <div uiNativeSelectWrapper dir="rtl">
      <select uiNativeSelect dir="rtl">
        <option uiNativeSelectOption value="">اختر الحالة</option>
        <option uiNativeSelectOption value="todo">مهام</option>
        <option uiNativeSelectOption value="in-progress">قيد التنفيذ</option>
        <option uiNativeSelectOption value="done">منجز</option>
        <option uiNativeSelectOption value="cancelled">ملغي</option>
      </select>
    </div>
  `,
})
export class NativeSelectRtlComponent {}

export default NativeSelectRtlComponent

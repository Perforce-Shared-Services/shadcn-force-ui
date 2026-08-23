import { Component } from "@angular/core"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectWrapper,
} from "@/angular-ui/native-select"

@Component({
  selector: "preview-native-select-demo",
  standalone: true,
  imports: [NativeSelectWrapper, NativeSelect, NativeSelectOption],
  template: `
    <div uiNativeSelectWrapper>
      <select uiNativeSelect>
        <option uiNativeSelectOption value="">Select status</option>
        <option uiNativeSelectOption value="todo">Todo</option>
        <option uiNativeSelectOption value="in-progress">In Progress</option>
        <option uiNativeSelectOption value="done">Done</option>
        <option uiNativeSelectOption value="cancelled">Cancelled</option>
      </select>
    </div>
  `,
})
export class NativeSelectDemoComponent {}

export default NativeSelectDemoComponent

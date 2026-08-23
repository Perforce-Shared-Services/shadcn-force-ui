import { Component } from "@angular/core"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectWrapper,
} from "@/angular-ui/native-select"

@Component({
  selector: "preview-native-select-disabled",
  standalone: true,
  imports: [NativeSelectWrapper, NativeSelect, NativeSelectOption],
  template: `
    <div uiNativeSelectWrapper>
      <select uiNativeSelect disabled>
        <option uiNativeSelectOption value="">Disabled</option>
        <option uiNativeSelectOption value="apple">Apple</option>
        <option uiNativeSelectOption value="banana">Banana</option>
        <option uiNativeSelectOption value="blueberry">Blueberry</option>
      </select>
    </div>
  `,
})
export class NativeSelectDisabledComponent {}

export default NativeSelectDisabledComponent

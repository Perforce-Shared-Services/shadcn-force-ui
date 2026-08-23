import { Component } from "@angular/core"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectWrapper,
} from "@/angular-ui/native-select"

// aria-invalid on the real <select> host drives the token's destructive
// border/ring styles — no prop forwarding needed.
@Component({
  selector: "preview-native-select-invalid",
  standalone: true,
  imports: [NativeSelectWrapper, NativeSelect, NativeSelectOption],
  template: `
    <div uiNativeSelectWrapper>
      <select uiNativeSelect aria-invalid="true">
        <option uiNativeSelectOption value="">Error state</option>
        <option uiNativeSelectOption value="apple">Apple</option>
        <option uiNativeSelectOption value="banana">Banana</option>
        <option uiNativeSelectOption value="blueberry">Blueberry</option>
      </select>
    </div>
  `,
})
export class NativeSelectInvalidComponent {}

export default NativeSelectInvalidComponent

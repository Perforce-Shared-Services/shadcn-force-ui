import { Component } from "@angular/core"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  NativeSelectWrapper,
} from "@/angular-ui/native-select"

@Component({
  selector: "preview-native-select-groups",
  standalone: true,
  imports: [NativeSelectWrapper, NativeSelect, NativeSelectOptGroup, NativeSelectOption],
  template: `
    <div uiNativeSelectWrapper>
      <select uiNativeSelect>
        <option uiNativeSelectOption value="">Select department</option>
        <optgroup uiNativeSelectOptGroup label="Engineering">
          <option uiNativeSelectOption value="frontend">Frontend</option>
          <option uiNativeSelectOption value="backend">Backend</option>
          <option uiNativeSelectOption value="devops">DevOps</option>
        </optgroup>
        <optgroup uiNativeSelectOptGroup label="Sales">
          <option uiNativeSelectOption value="sales-rep">Sales Rep</option>
          <option uiNativeSelectOption value="account-manager">Account Manager</option>
          <option uiNativeSelectOption value="sales-director">Sales Director</option>
        </optgroup>
        <optgroup uiNativeSelectOptGroup label="Operations">
          <option uiNativeSelectOption value="support">Customer Support</option>
          <option uiNativeSelectOption value="product-manager">Product Manager</option>
          <option uiNativeSelectOption value="ops-manager">Operations Manager</option>
        </optgroup>
      </select>
    </div>
  `,
})
export class NativeSelectGroupsComponent {}

export default NativeSelectGroupsComponent

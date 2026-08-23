import { Component } from "@angular/core"

import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupInput } from "@/angular-ui/input-group"

// React example uses Field/FieldGroup/FieldLabel; Field is not yet ported to
// Angular, so its layout classes are inlined (flex column stack + gap-2).
@Component({
  selector: "preview-input-group-basic",
  standalone: true,
  imports: [Input, Label, InputGroup, InputGroupInput],
  template: `
    <div data-slot="field-group" class="flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-default-01">Default (No Input Group)</label>
        <input uiInput placeholder="Placeholder" id="input-default-01" />
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-group-02">Input Group</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-group-02" placeholder="Placeholder" />
        </div>
      </div>
      <div data-slot="field" role="group" data-disabled="true" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-disabled-03">Disabled</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-disabled-03" placeholder="This field is disabled" disabled />
        </div>
      </div>
      <div
        data-slot="field"
        role="group"
        data-invalid="true"
        class="flex w-full flex-col gap-2 data-[invalid=true]:text-destructive"
      >
        <label uiLabel for="input-invalid-04">Invalid</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-invalid-04" placeholder="This field is invalid" aria-invalid="true" />
        </div>
      </div>
    </div>
  `,
})
export class InputGroupBasicComponent {}

export default InputGroupBasicComponent

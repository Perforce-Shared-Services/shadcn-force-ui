import { Component } from "@angular/core"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/angular-ui/input-group"

@Component({
  selector: "preview-input-group-variants",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupInput],
  template: `
    <div class="flex w-full flex-col gap-4">
      <div uiInputGroup variant="outline">
        <input uiInputGroupInput placeholder="Outline" />
      </div>
      <div uiInputGroup variant="filled">
        <input uiInputGroupInput placeholder="Filled" />
      </div>
      <div uiInputGroup variant="underline">
        <input uiInputGroupInput placeholder="Underline" />
      </div>
      <div uiInputGroup variant="ghost">
        <input uiInputGroupInput placeholder="Ghost" />
      </div>
    </div>
  `,
})
export class InputGroupVariantsComponent {}

export default InputGroupVariantsComponent

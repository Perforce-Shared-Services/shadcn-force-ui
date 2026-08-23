import { Component } from "@angular/core"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/angular-ui/input-group"

// React example uses react-textarea-autosize; the Angular port relies on the
// CSS `field-sizing-content` property (supported by all current browsers) for
// the same auto-resize behaviour.
@Component({
  selector: "preview-input-group-custom",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupButton],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div uiInputGroup>
        <textarea
          data-slot="input-group-control"
          class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
        ></textarea>
        <div uiInputGroupAddon align="block-end">
          <button uiInputGroupButton class="ml-auto" size="sm" variant="default">Submit</button>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupCustomComponent {}

export default InputGroupCustomComponent

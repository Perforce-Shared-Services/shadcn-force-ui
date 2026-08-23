import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-block-end",
  standalone: true,
  imports: [Label, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea],
  template: `
    <div data-slot="field-group" class="max-w-sm flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="block-end-input">Input</label>
        <div uiInputGroup class="h-auto">
          <input uiInputGroupInput id="block-end-input" placeholder="Enter amount" />
          <div uiInputGroupAddon align="block-end">
            <span uiInputGroupText>USD</span>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          Footer positioned below the input.
        </p>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="block-end-textarea">Textarea</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="block-end-textarea" placeholder="Write a comment..."></textarea>
          <div uiInputGroupAddon align="block-end">
            <span uiInputGroupText>0/280</span>
            <button uiInputGroupButton variant="default" size="sm" class="ml-auto">Post</button>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          Footer positioned below the textarea.
        </p>
      </div>
    </div>
  `,
})
export class InputGroupBlockEndComponent {}

export default InputGroupBlockEndComponent

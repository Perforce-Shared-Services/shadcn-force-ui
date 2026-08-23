import { Component } from "@angular/core"

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

@Component({
  selector: "preview-input-group-text",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div uiInputGroup>
        <div uiInputGroupAddon>
          <span uiInputGroupText>$</span>
        </div>
        <input uiInputGroupInput placeholder="0.00" />
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText>USD</span>
        </div>
      </div>
      <div uiInputGroup>
        <div uiInputGroupAddon>
          <span uiInputGroupText>https://</span>
        </div>
        <input uiInputGroupInput placeholder="example.com" class="pl-0.5!" />
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText>.com</span>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Enter your username" />
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText>&#64;company.com</span>
        </div>
      </div>
      <div uiInputGroup>
        <textarea uiInputGroupTextarea placeholder="Enter your message"></textarea>
        <div uiInputGroupAddon align="block-end">
          <span uiInputGroupText class="text-xs text-muted-foreground">120 characters left</span>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupTextExampleComponent {}

export default InputGroupTextExampleComponent

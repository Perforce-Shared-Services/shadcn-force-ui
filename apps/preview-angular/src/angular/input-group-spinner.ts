import { Component } from "@angular/core"

import { Spinner } from "@/angular-ui/spinner"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/angular-ui/input-group"

@Component({
  selector: "preview-input-group-spinner",
  standalone: true,
  imports: [Spinner, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Searching..." />
        <div uiInputGroupAddon align="inline-end">
          <span uiSpinner></span>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Processing..." />
        <div uiInputGroupAddon>
          <span uiSpinner></span>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Saving changes..." />
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText>Saving...</span>
          <span uiSpinner></span>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Refreshing data..." />
        <div uiInputGroupAddon>
          <svg aria-hidden="true" class="animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M323-111q-73-31-127-85t-85-127q-31-73-31-157t31-157q31-73 85-127t127-85q73-31 157-31 12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80q-84 0-157-31Z" />
          </svg>
        </div>
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText class="text-muted-foreground">Please wait...</span>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupSpinnerComponent {}

export default InputGroupSpinnerComponent

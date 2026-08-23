import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/angular-ui/input-group"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-with-buttons",
  standalone: true,
  imports: [Label, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput],
  template: `
    <div data-slot="field-group" class="flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-button-13">Button</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-13" />
          <div uiInputGroupAddon>
            <button uiInputGroupButton>Default</button>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-14" />
          <div uiInputGroupAddon>
            <button uiInputGroupButton variant="outline">Outline</button>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-15" />
          <div uiInputGroupAddon>
            <button uiInputGroupButton variant="secondary">Secondary</button>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-16" />
          <div uiInputGroupAddon align="inline-end">
            <button uiInputGroupButton variant="secondary">Button</button>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-17" />
          <div uiInputGroupAddon align="inline-end">
            <button uiInputGroupButton size="icon-xs" aria-label="Copy">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z" />
              </svg>
            </button>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-button-18" />
          <div uiInputGroupAddon align="inline-end">
            <button uiInputGroupButton variant="secondary" size="icon-xs" aria-label="Delete">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-11q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h158q0-13 8.63-21.5 8.62-8.5 21.37-8.5h204q12.75 0 21.38 8.62Q612-822.75 612-810h158q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-11v570q0 24.75-17.62 42.37Q723.75-120 699-120H261Zm438-630H261v570h438v-570ZM418.5-274.63q8.5-8.62 8.5-21.37v-339q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v339q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm166 0q8.5-8.62 8.5-21.37v-339q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v339q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63ZM261-750v570-570Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupWithButtonsComponent {}

export default InputGroupWithButtonsComponent

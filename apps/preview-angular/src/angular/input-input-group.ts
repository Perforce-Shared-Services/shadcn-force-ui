import { Component } from "@angular/core"
import { Field, FieldLabel } from "@/angular-ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/angular-ui/input-group"

@Component({
  selector: "preview-input-input-group",
  standalone: true,
  imports: [Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText],
  template: `
    <div uiField>
      <label uiFieldLabel for="input-group-url">Website URL</label>
      <div uiInputGroup>
        <input
          uiInputGroupInput
          id="input-group-url"
          placeholder="example.com"
        />
        <div uiInputGroupAddon>
          <span uiInputGroupText>https://</span>
        </div>
        <div uiInputGroupAddon align="inline-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
            class="size-4 opacity-50"
            aria-hidden="true"
          >
            <path
              d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
            />
          </svg>
        </div>
      </div>
    </div>
  `,
})
export class InputInputGroupComponent {}

export default InputInputGroupComponent

import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-block-start",
  standalone: true,
  imports: [Label, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea],
  template: `
    <div data-slot="field-group" class="max-w-sm flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="block-start-input">Input</label>
        <div uiInputGroup class="h-auto">
          <input uiInputGroupInput id="block-start-input" placeholder="Enter your name" />
          <div uiInputGroupAddon align="block-start">
            <span uiInputGroupText>Full Name</span>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          Header positioned above the input.
        </p>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="block-start-textarea">Textarea</label>
        <div uiInputGroup>
          <textarea
            uiInputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
            class="font-mono text-sm"
          ></textarea>
          <div uiInputGroupAddon align="block-start">
            <svg aria-hidden="true" class="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path
                d="m166-482 176 176q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L101-461q-5-5-7-10t-2-11q0-6 2-11t7-10l200-200q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L166-482Zm628 0L618-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l197 197q5 5 7 10t2 11q0 6-2 11t-7 10L659-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l177-177Z"
              />
            </svg>
            <span uiInputGroupText class="font-mono">script.js</span>
            <button uiInputGroupButton size="icon-xs" class="ml-auto" aria-label="Copy">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path
                  d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z"
                />
              </svg>
              <span class="sr-only">Copy</span>
            </button>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          Header positioned above the textarea.
        </p>
      </div>
    </div>
  `,
})
export class InputGroupBlockStartComponent {}

export default InputGroupBlockStartComponent

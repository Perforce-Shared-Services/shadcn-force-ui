import { Component } from "@angular/core"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

@Component({
  selector: "preview-input-group-textarea",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea],
  template: `
    <div class="grid w-full max-w-md gap-4">
      <div uiInputGroup>
        <textarea
          uiInputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          class="min-h-[200px]"
        ></textarea>
        <div uiInputGroupAddon align="block-end" class="border-t">
          <span uiInputGroupText>Line 1, Column 1</span>
          <button uiInputGroupButton size="sm" class="ml-auto" variant="default">
            Run
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="m236-449 145 145q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L141-458q-5-5-7-10t-2-11q0-6 2-11t7-10l197-197q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L235-508h545v-142q0-13 8.5-21.5T810-680q13 0 21.5 8.5T840-650v141q0 25-17.5 42.5T780-449H236Z" />
            </svg>
          </button>
        </div>
        <div uiInputGroupAddon align="block-start" class="border-b">
          <span uiInputGroupText class="font-mono font-medium">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-170h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z" />
            </svg>
            script.js
          </span>
          <button uiInputGroupButton class="ml-auto" size="icon-xs" aria-label="Refresh">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z" />
            </svg>
          </button>
          <button uiInputGroupButton variant="ghost" size="icon-xs" aria-label="Copy">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupTextareaExampleComponent {}

export default InputGroupTextareaExampleComponent

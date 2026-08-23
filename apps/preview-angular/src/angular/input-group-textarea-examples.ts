import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"
import { Textarea } from "@/angular-ui/textarea"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-textarea-examples",
  standalone: true,
  imports: [Label, Textarea, InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea],
  template: `
    <div data-slot="field-group" class="flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-header-footer-12">Default Textarea (No Input Group)</label>
        <textarea uiTextarea id="textarea-header-footer-12" placeholder="Enter your text here..."></textarea>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-header-footer-13">Input Group</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-header-footer-13" placeholder="Enter your text here..."></textarea>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
      <div
        data-slot="field"
        role="group"
        data-invalid="true"
        class="flex w-full flex-col gap-2 data-[invalid=true]:text-destructive"
      >
        <label uiLabel for="textarea-header-footer-14">Invalid</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-header-footer-14" placeholder="Enter your text here..." aria-invalid="true"></textarea>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
      <div data-slot="field" role="group" data-disabled="true" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-header-footer-15">Disabled</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-header-footer-15" placeholder="Enter your text here..." disabled></textarea>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="prompt-31">Addon (block-start)</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="prompt-31"></textarea>
          <div uiInputGroupAddon align="block-start">
            <span uiInputGroupText>Ask, Search or Chat...</span>
            <svg aria-hidden="true" class="ml-auto text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-header-footer-30">Addon (block-end)</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-header-footer-30" placeholder="Enter your text here..."></textarea>
          <div uiInputGroupAddon align="block-end">
            <span uiInputGroupText>0/280 characters</span>
            <button uiInputGroupButton variant="default" size="icon-xs" class="ml-auto rounded-full" aria-label="Send">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M450-686 223-459q-9 9-21 9t-21-9q-9-9-9-21t9-21l278-278q5-5 10-7t11-2q6 0 11 2t10 7l278 278q9 9 9 21t-9 21q-9 9-21 9t-21-9L510-686v496q0 13-8.5 21.5T480-160q-13 0-21.5-8.5T450-190v-496Z" />
              </svg>
              <span class="sr-only">Send</span>
            </button>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-comment-31">Addon (Buttons)</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-comment-31" placeholder="Share your thoughts..." class="min-h-[120px]"></textarea>
          <div uiInputGroupAddon align="block-end">
            <button uiInputGroupButton variant="ghost" class="ml-auto" size="sm">Cancel</button>
            <button uiInputGroupButton variant="default" size="sm">Post Comment</button>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="textarea-code-32">Code Editor</label>
        <div uiInputGroup>
          <textarea uiInputGroupTextarea id="textarea-code-32" placeholder="console.log('Hello, world!');" class="min-h-[300px] py-3"></textarea>
          <div uiInputGroupAddon align="block-start" class="border-b">
            <span uiInputGroupText class="font-mono font-medium">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m166-482 176 176q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L101-461q-5-5-7-10t-2-11q0-6 2-11t7-10l200-200q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L166-482Zm628 0L618-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l197 197q5 5 7 10t2 11q0 6-2 11t-7 10L659-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l177-177Z" />
              </svg>
              script.js
            </span>
            <button uiInputGroupButton size="icon-xs" class="ml-auto" aria-label="Refresh">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z" />
              </svg>
            </button>
            <button uiInputGroupButton size="icon-xs" variant="ghost" aria-label="Copy">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z" />
              </svg>
            </button>
          </div>
          <div uiInputGroupAddon align="block-end" class="border-t">
            <span uiInputGroupText>Line 1, Column 1</span>
            <span uiInputGroupText class="ml-auto">JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupTextareaExamplesComponent {}

export default InputGroupTextareaExamplesComponent

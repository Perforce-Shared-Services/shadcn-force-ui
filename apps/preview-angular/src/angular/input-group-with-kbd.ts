import { Component } from "@angular/core"

import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import { Label } from "@/angular-ui/label"
import { Spinner } from "@/angular-ui/spinner"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/angular-ui/input-group"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-with-kbd",
  standalone: true,
  imports: [Kbd, KbdGroup, Label, Spinner, InputGroup, InputGroupAddon, InputGroupInput],
  template: `
    <div data-slot="field-group" class="flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-kbd-22">Input Group with Kbd</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-kbd-22" />
          <div uiInputGroupAddon>
            <kbd uiKbd>⌘K</kbd>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-kbd-23" />
          <div uiInputGroupAddon align="inline-end">
            <kbd uiKbd>⌘K</kbd>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-search-apps-24" placeholder="Search for Apps..." />
          <div uiInputGroupAddon align="inline-end">Ask AI</div>
          <div uiInputGroupAddon align="inline-end">
            <kbd uiKbd>Tab</kbd>
          </div>
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-search-type-25" placeholder="Type to search..." />
          <div uiInputGroupAddon align="inline-start">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M788.5-362q12.5 0 21.5 9l63 64q9 9 9 21t-9 21q-9 9-21 9t-21-9l-64-63q-9-9-9-21.5t9-21.5q9-9 21.5-9ZM802-811.5q0 12.5-9 21.5l-63 63q-9 9-21.5 9t-21.5-9q-9-9-9-21.5t9-21.5l64-63q9-9 21-9t21 9q9 9 9 21.5ZM188.5-842q12.5 0 21.5 9l63 64q9 9 9 21t-9 21q-9 9-21 9t-21-9l-64-63q-9-9-9-21.5t9-21.5q9-9 21.5-9ZM202-331.5q0 12.5-9 21.5l-63 63q-9 9-21.5 9T87-247q-9-9-9-21t9-21l64-64q9-9 21-9t21 9q9 9 9 21.5ZM323-245l157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm157-240Zm0 216L294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Z" />
            </svg>
          </div>
          <div uiInputGroupAddon align="inline-end">
            <span uiKbdGroup>
              <kbd uiKbd>Ctrl</kbd>
              <kbd uiKbd>C</kbd>
            </span>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-username-26">Username</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-username-26" value="shadcn" />
          <div uiInputGroupAddon align="inline-end">
            <div class="flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800">
              <svg aria-hidden="true" class="size-3 text-white [&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z" />
              </svg>
            </div>
          </div>
        </div>
        <p class="text-sm leading-normal font-normal text-green-700">
          This username is available.
        </p>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput id="input-search-docs-27" placeholder="Search documentation..." />
        <div uiInputGroupAddon>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z" />
          </svg>
        </div>
        <div uiInputGroupAddon align="inline-end">12 results</div>
      </div>
      <div uiInputGroup data-disabled="true">
        <input uiInputGroupInput id="input-search-disabled-28" placeholder="Search documentation..." disabled />
        <div uiInputGroupAddon>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z" />
          </svg>
        </div>
        <div uiInputGroupAddon align="inline-end">Disabled</div>
      </div>
      <div data-slot="field-group" class="grid grid-cols-2 gap-4">
        <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
          <label uiLabel for="input-group-11">First Name</label>
          <div uiInputGroup>
            <input uiInputGroupInput id="input-group-11" placeholder="First Name" />
            <div uiInputGroupAddon align="inline-end">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
              </svg>
            </div>
          </div>
        </div>
        <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
          <label uiLabel for="input-group-12">Last Name</label>
          <div uiInputGroup>
            <input uiInputGroupInput id="input-group-12" placeholder="Last Name" />
            <div uiInputGroupAddon align="inline-end">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" data-disabled="true" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-group-29">Loading ("data-disabled="true")</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-group-29" disabled value="shadcn" />
          <div uiInputGroupAddon align="inline-end">
            <span uiSpinner></span>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
    </div>
  `,
})
export class InputGroupWithKbdComponent {}

export default InputGroupWithKbdComponent

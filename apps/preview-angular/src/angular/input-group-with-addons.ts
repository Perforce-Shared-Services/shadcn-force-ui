import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/angular-ui/input-group"

// Deviations from the React example (documented in the MDX):
// - Field wrappers are inlined (Field not yet ported)
// - the "Copied to clipboard" toast needs sonner (not ported); the copy
//   button uses the clipboard API without the toast.
@Component({
  selector: "preview-input-group-with-addons",
  standalone: true,
  imports: [Label, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText],
  template: `
    <div data-slot="field-group" class="flex w-full flex-col gap-5">
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-icon-left-05">Addon (inline-start)</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-icon-left-05" />
          <div uiInputGroupAddon>
            <svg aria-hidden="true" class="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-icon-right-07">Addon (inline-end)</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-icon-right-07" />
          <div uiInputGroupAddon align="inline-end">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M600-620q29 29 42.5 71.5T647-464q0 13-8.5 21.5T617-434q-13 0-21.5-8.5T587-464q11-34 2.5-64.5T559-580q-21-22-52-30t-64 3q-13 0-21.5-8.5T413-637q0-13 8.5-21.5T443-667q42-9 85 4.5t72 42.5ZM490-740q-32 0-64 3t-63 13q-12 4-24-1t-17-16q-5-11 0-22.5t16-15.5q35-11 72-16t75-5q137 0 249.5 75.5T907-526q3 6 5 12.5t2 13.5q0 7-1.5 13.5T908-474q-23 49-55 90.5T779-307q-9 8-20 5.5T741-313q-7-9-5.5-20t10.5-19q36-30 65-66.5t46-81.5q-49-109-148-174.5T490-740Zm-10 540q-136 0-247.5-76T55-472q-4-7-5.5-13.5T48-500q0-8 2-14.5t5-13.5q24-48 55.5-90.5T182-696L77-801q-9-9-8.5-21t8.5-21q9-9 21.5-9t21.5 9l716 716q8 8 8 19.5T836-87q-8 10-20.5 10T794-86L648-229q-41 15-83 22t-85 7ZM223-654q-41 29-72 68t-49 86q52 112 156.5 176T488-260q29 0 58-1.5t55-14.5l-64-64q-14 6-28.5 8t-28.5 2q-71 0-120.5-49.5T310-500q0-14 2.5-28.5T320-557l-97-97Zm305 142Zm-116 58Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-icon-both-09">Addon (inline-start and inline-end)</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-icon-both-09" />
          <div uiInputGroupAddon>
            <svg aria-hidden="true" class="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M408-453.92q-29-30.91-29-75.08v-251q0-41.67 29.44-70.83Q437.88-880 479.94-880t71.56 29.17Q581-821.67 581-780v251q0 44.17-29 75.08Q523-423 480-423t-72-30.92ZM480-651Zm-30 501v-106q-96-11-166.5-77.5T202-498q-2-12.85 6.59-21.93 8.6-9.07 21.5-9.07 12.91 0 21.41 9t10.5 22q12 81 74.71 132.5Q399.42-314 479.65-314q81.35 0 143.85-51.5T698-498q2-13 10.68-22 8.67-9 21.5-9 12.82 0 21.32 9.07 8.5 9.08 6.5 21.93-11 97-81 164t-167 78v106q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm59.5-346.5Q521-510 521-529v-251q0-17-11.79-28.5T480-820q-17.42 0-29.21 11.5T439-780v251q0 19 11.5 32.5T480-483q18 0 29.5-13.5Z" />
            </svg>
          </div>
          <div uiInputGroupAddon align="inline-end">
            <svg aria-hidden="true" class="animate-pulse text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M140-80q-24 0-42-18t-18-42v-511q0-22 15-38.5t35-24.5l471-190q10.59-5 20.79-.5Q632-900 636-889t-.18 21.12Q631.64-857.75 621-854L286-720h534q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-310H140v310Zm248-91.18q28-28.19 28-69Q416-341 387.82-369q-28.19-28-69-28Q278-397 250-368.82q-28 28.19-28 69Q222-259 250.18-231q28.19 28 69 28Q360-203 388-231.18ZM140-510h520v-30.18q0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v30h100v-150H140v150Zm0 370v-310 310Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-addon-20">Addon (block-start)</label>
        <div uiInputGroup class="h-auto">
          <input uiInputGroupInput id="input-addon-20" />
          <div uiInputGroupAddon align="block-start">
            <span uiInputGroupText>First Name</span>
            <svg aria-hidden="true" class="ml-auto text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-addon-21">Addon (block-end)</label>
        <div uiInputGroup class="h-auto">
          <input uiInputGroupInput id="input-addon-21" />
          <div uiInputGroupAddon align="block-end">
            <span uiInputGroupText>20/240 characters</span>
            <svg aria-hidden="true" class="ml-auto text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-icon-both-10">Multiple Icons</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-icon-both-10" />
          <div uiInputGroupAddon align="inline-end">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm157-24L294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Zm0-206Z" />
            </svg>
            <button uiInputGroupButton size="icon-xs" aria-label="Copy" title="Copied to clipboard" (click)="copy()">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z" />
              </svg>
            </button>
          </div>
          <div uiInputGroupAddon>
            <svg aria-hidden="true" class="animate-pulse text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M140-80q-24 0-42-18t-18-42v-511q0-22 15-38.5t35-24.5l471-190q10.59-5 20.79-.5Q632-900 636-889t-.18 21.12Q631.64-857.75 621-854L286-720h534q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-310H140v310Zm248-91.18q28-28.19 28-69Q416-341 387.82-369q-28.19-28-69-28Q278-397 250-368.82q-28 28.19-28 69Q222-259 250.18-231q28.19 28 69 28Q360-203 388-231.18ZM140-510h520v-30.18q0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v30h100v-150H140v150Zm0 370v-310 310Z" />
            </svg>
          </div>
        </div>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-description-10">Description</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-description-10" />
          <div uiInputGroupAddon align="inline-end">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>
          </div>
        </div>
        <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
          This is a description of the input group.
        </p>
      </div>
      <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
        <label uiLabel for="input-label-10">Label</label>
        <div uiInputGroup>
          <div uiInputGroupAddon>
            <label uiLabel for="input-label-10">Label</label>
          </div>
          <input uiInputGroupInput id="input-label-10" />
        </div>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-optional-12" aria-label="Optional" />
          <div uiInputGroupAddon align="inline-end">
            <span uiInputGroupText>(optional)</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupWithAddonsComponent {
  protected copy(): void {
    navigator.clipboard?.writeText("Copied to clipboard")
  }
}

export default InputGroupWithAddonsComponent

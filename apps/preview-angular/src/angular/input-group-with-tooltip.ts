import { Component, signal } from "@angular/core"

import {
  ButtonGroup,
  ButtonGroupText,
} from "@/angular-ui/button-group"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import { FieldDescription, FieldGroup, FieldLabel } from "@/angular-ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/angular-ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/angular-ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/angular-ui/tooltip"

// apps/v4/examples/base/input-group-with-tooltip.tsx
@Component({
  selector: "preview-input-group-with-tooltip",
  standalone: true,
  imports: [
    ButtonGroup,
    ButtonGroupText,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Popover,
    PopoverTrigger,
    PopoverPortal,
    PopoverPositioner,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
    Tooltip,
    TooltipTrigger,
    TooltipPortal,
    TooltipPositioner,
    TooltipContent,
  ],
  template: `
    <div uiFieldGroup class="w-full max-w-md gap-6">
      <!-- Tooltip -->
      <div uiField>
        <label uiFieldLabel for="input-tooltip-20">Tooltip</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-tooltip-20" />
          <div uiInputGroupAddon align="inline-end">
            <div uiTooltip>
              <button uiInputGroupButton class="rounded-full" size="icon-xs" uiTooltipTrigger type="button">
                <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                </svg>
              </button>
              <ng-template uiTooltipPortal>
                <div uiTooltipPositioner side="top">
                  <div uiTooltipContent>This is content in a tooltip.</div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        <p uiFieldDescription>This is a description of the input group.</p>
      </div>

      <!-- Dropdown -->
      <div uiField>
        <label uiFieldLabel for="input-dropdown-21">Dropdown</label>
        <div uiInputGroup>
          <input uiInputGroupInput id="input-dropdown-21" />
          <div uiInputGroupAddon>
            <div uiDropdownMenuRoot>
              <button uiInputGroupButton class="text-muted-foreground tabular-nums" uiDropdownMenuTrigger type="button">
                {{ country() }}
                <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M480-373q-8 0-15-2.5t-13-8.5L268-568q-10-10-10-23t10-23q10-10 23-10t23 10l166 166 166-166q10-10 23-10t23 10q10 10 10 23t-10 23L508-384q-6 6-13 8.5t-15 2.5Z"/>
                </svg>
              </button>
              <div uiDropdownMenuContent align="start" class="min-w-16" [sideOffset]="10" [alignOffset]="-8">
                <button uiDropdownMenuItem (click)="country.set('+1')">+1</button>
                <button uiDropdownMenuItem (click)="country.set('+44')">+44</button>
                <button uiDropdownMenuItem (click)="country.set('+46')">+46</button>
              </div>
            </div>
          </div>
        </div>
        <p uiFieldDescription>This is a description of the input group.</p>
      </div>

      <!-- Popover -->
      <div uiField>
        <label uiFieldLabel for="input-secure-19">Popover</label>
        <div uiInputGroup>
          <div uiPopover>
            <div uiPopoverTrigger>
              <button uiInputGroupButton variant="secondary" size="icon-xs" type="button">
                <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30.5T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T491-513q-45 40-47 59t-2 60Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-157T197-764q54-53 127-84.5T480-880q84 0 157 31.5T764-764q53 54 84.5 127T880-480q0 83-31.5 156T764-197q-54 54-127 85.5T480-80Z"/>
                </svg>
              </button>
            </div>
            <ng-template uiPopoverPortal>
              <div uiPopoverPositioner align="start">
                <div uiPopoverContent>
                  <div uiPopoverHeader>
                    <div uiPopoverTitle>Your connection is not secure.</div>
                    <div uiPopoverDescription>You should not enter any sensitive information on this site.</div>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
          <div uiInputGroupAddon class="pl-1 text-muted-foreground">https://</div>
          <input uiInputGroupInput id="input-secure-19" />
          <div uiInputGroupAddon align="inline-end">
            <button uiInputGroupButton size="icon-xs" type="button" (click)="favorite()">
              <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM237-80l65-281L80-550l288-25 112-265 112 265 288 25-222 189 65 281-243-147L237-80Z"/>
              </svg>
            </button>
          </div>
        </div>
        <p uiFieldDescription>This is a description of the input group.</p>
      </div>

      <!-- Button Group -->
      <div uiField>
        <label uiFieldLabel for="url">Button Group</label>
        <div uiButtonGroup>
          <div uiButtonGroupText>https://</div>
          <div uiInputGroup>
            <input uiInputGroupInput id="url" />
            <div uiInputGroupAddon align="inline-end">
              <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30.5T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T491-513q-45 40-47 59t-2 60Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-157T197-764q54-53 127-84.5T480-880q84 0 157 31.5T764-764q53 54 84.5 127T880-480q0 83-31.5 156T764-197q-54 54-127 85.5T480-80Z"/>
              </svg>
            </div>
          </div>
          <div uiButtonGroupText>.com</div>
        </div>
        <p uiFieldDescription>This is a description of the input group.</p>
      </div>
    </div>
  `,
})
export class InputGroupWithTooltipComponent {
  protected readonly country = signal("+1")

  protected favorite(): void {
    // React calls toast("Added to favorites"); sonner is not wired into this demo.
  }
}

export default InputGroupWithTooltipComponent

import { Component } from "@angular/core"

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/angular-ui/input-group"

// apps/v4/examples/base/input-group-dropdown.tsx
@Component({
  selector: "preview-input-group-dropdown",
  standalone: true,
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Enter file name" />
        <div uiInputGroupAddon align="inline-end">
          <div uiDropdownMenuRoot>
            <button uiInputGroupButton variant="ghost" aria-label="More" size="icon-xs" uiDropdownMenuTrigger type="button">
              <svg aria-hidden="true" class="[&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
              </svg>
            </button>
            <div uiDropdownMenuContent align="end" [sideOffset]="8" [alignOffset]="-4">
              <div uiDropdownMenuGroup>
                <button uiDropdownMenuItem>Settings</button>
                <button uiDropdownMenuItem>Copy path</button>
                <button uiDropdownMenuItem>Open location</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Enter search query" />
        <div uiInputGroupAddon align="inline-end">
          <div uiDropdownMenuRoot>
            <button uiInputGroupButton variant="ghost" class="pr-1.5! text-xs" uiDropdownMenuTrigger type="button">
              Search In...
              <svg aria-hidden="true" class="size-3 [&>svg]:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M480-373q-8 0-15-2.5t-13-8.5L268-568q-10-10-10-23t10-23q10-10 23-10t23 10l166 166 166-166q10-10 23-10t23 10q10 10 10 23t-10 23L508-384q-6 6-13 8.5t-15 2.5Z"/>
              </svg>
            </button>
            <div uiDropdownMenuContent align="end" [sideOffset]="8" [alignOffset]="-4">
              <div uiDropdownMenuGroup>
                <button uiDropdownMenuItem>Documentation</button>
                <button uiDropdownMenuItem>Blog Posts</button>
                <button uiDropdownMenuItem>Changelog</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupDropdownComponent {}

export default InputGroupDropdownComponent

import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/button-group-dropdown.tsx
// Material Symbols (rounded) inline SVGs — single swap point per glyph.
const ICONS: Record<string, string> = {
  volumeOff:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M681-188q-17 12-35.5 22T607-148q-12 5-24.5 0T565-165q-5-11 .5-22t17.5-16q15-5 28.5-12t26.5-17L473-397v165q0 20-18.5 27.5T422-211L273-360H143q-13 0-21.5-8.5T113-390v-180q0-13 8.5-21.5T143-600h130l149-149q14-14 31.5-6.5T471-729v498q0 20-17.5 27.5T422-211"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q11 0 20.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14.5 14.5T850-120H109Zm69-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Z"/></svg>',
  personRemove:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M678-602h172q13 0 21.5 8.5T880-572q0 13-8.5 21.5T850-542H678q-13 0-21.5-8.5T648-572q0-13 8.5-21.5T678-602Zm-426 79q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM40-160v-76q0-29 15.5-54T99-329q62-31 126-47t127-16q63 0 127 16t126 47q28 14 43.5 39t15.5 54v76q0 17-11.5 28.5T624-120H80q-17 0-28.5-11.5T40-160Z"/></svg>',
  share:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M727-80q-44 0-74.5-30.5T622-185q0-7 1-14.5t3-13.5L282-425q-15 16-37 24.5T199-392q-44 0-74.5-30.5T94-497q0-44 30.5-74.5T199-602q25 0 46 8.5t37 24.5l344-187q-3-6-4.5-13t-1.5-14q0-44 30.5-74.5T726-888q44 0 74.5 30.5T831-783q0 44-30.5 74.5T726-678q-25 0-46-8.5T643-711L299-524q3 6 4.5 13t1.5 14q0 7-1.5 14t-4.5 13l341 184q16-14 36-22.5t45-8.5q44 0 74.5 30.5T826-112q0 32-21 53t-53 21Z"/></svg>',
  contentCopy:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h360q24 0 42 18t18 42v480q0 24-18 42t-42 18H360ZM200-80q-24 0-42-18t-18-42v-450q0-13 8.5-21.5T170-620q13 0 21.5 8.5T200-590v450h450q13 0 21.5 8.5T680-110q0 13-8.5 21.5T650-80H200Z"/></svg>',
  delete:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-560h-40q-17 0-28.5-11.5T120-800q0-17 11.5-28.5T160-840h160q0-17 11.5-28.5T360-880h240q17 0 28.5 11.5T640-840h160q17 0 28.5 11.5T840-800q0 17-11.5 28.5T800-760h-40v560q0 33-23.5 56.5T680-120H280Z"/></svg>',
}

@Component({
  selector: "preview-button-group-dropdown",
  standalone: true,
  imports: [
    Button,
    ButtonGroup,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
  ],
  template: `<div uiButtonGroup>
    <button uiButton variant="outline">Follow</button>
    <div uiDropdownMenuRoot>
      <button uiButton variant="outline" class="pl-2!" aria-label="Conversation options" uiDropdownMenuTrigger type="button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z"/>
        </svg>
      </button>
      <div uiDropdownMenuContent class="w-44">
        <div uiDropdownMenuGroup>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['volumeOff']"></span>
            Mute Conversation
          </button>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['check']"></span>
            Mark as Read
          </button>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['warning']"></span>
            Report Conversation
          </button>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['personRemove']"></span>
            Block User
          </button>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['share']"></span>
            Share Conversation
          </button>
          <button uiDropdownMenuItem>
            <span class="size-4" [innerHTML]="icons['contentCopy']"></span>
            Copy Conversation
          </button>
        </div>
        <div uiDropdownMenuSeparator></div>
        <div uiDropdownMenuGroup>
          <button uiDropdownMenuItem variant="destructive">
            <span class="size-4" [innerHTML]="icons['delete']"></span>
            Delete Conversation
          </button>
        </div>
      </div>
    </div>
  </div>`,
})
export class ButtonGroupDropdownComponent {
  protected readonly icons = ICONS
}

export default ButtonGroupDropdownComponent

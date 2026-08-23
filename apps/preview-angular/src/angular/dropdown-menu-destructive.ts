import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-destructive.tsx
// Material Symbols Rounded inline SVGs — decorative (aria-hidden).
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const EDIT = svg("M180-180h44l472-471-44-44-472 471v44Zm-30 60q-13 0-21.5-8.5T120-150v-73q0-12 5-23.5t13-19.5l557-556q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L266-138q-8 8-19.5 13t-23.5 5h-73Zm629-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z")
const SHARE = svg("M220-80q-24 0-42-18t-18-42v-469q0-24 18-42t42-18h139q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H220v469h520v-469H599q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h141q24 0 42 18t18 42v469q0 24-18 42t-42 18H220Zm237.5-275.63Q449-364.25 449-377v-427l-67 67q-9 9-21 9t-21.39-9q-8.61-9-8.61-21.5t9-21.5l118-119q5-5 10.13-7 5.14-2 11-2 5.87 0 10.87 2 5 2 10 7l119 119q9 9 9 21.16t-8.61 21Q610-729 597.53-729q-12.46 0-21.53-9l-67-66v427q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Z")
const DELETE = svg("M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-11q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h158q0-13 8.63-21.5 8.62-8.5 21.37-8.5h204q12.75 0 21.38 8.62Q612-822.75 612-810h158q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-11v570q0 24.75-17.62 42.37Q723.75-120 699-120H261Zm438-630H261v570h438v-570Z")

@Component({
  selector: "preview-dropdown-menu-destructive",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Actions</button>
    <div uiDropdownMenuContent>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="edit"></svg>
          Edit
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="share"></svg>
          Share
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem variant="destructive">
          <svg aria-hidden="true" focusable="false" [innerHTML]="del"></svg>
          Delete
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuDestructiveComponent {
  protected readonly edit = EDIT
  protected readonly share = SHARE
  protected readonly del = DELETE
}

export default DropdownMenuDestructiveComponent

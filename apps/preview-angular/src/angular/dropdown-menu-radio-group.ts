import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-radio-group.tsx
@Component({
  selector: "preview-dropdown-menu-radio-group",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent class="w-32">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>Panel Position</div>
        <div uiDropdownMenuRadioGroup [(value)]="position">
          <button uiDropdownMenuRadioItem value="top">Top</button>
          <button uiDropdownMenuRadioItem value="bottom">Bottom</button>
          <button uiDropdownMenuRadioItem value="right">Right</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuRadioGroupDemoComponent {
  protected readonly position = signal("bottom")
}

export default DropdownMenuRadioGroupDemoComponent

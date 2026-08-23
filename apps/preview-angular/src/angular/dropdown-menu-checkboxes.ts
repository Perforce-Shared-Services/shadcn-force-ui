import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-checkboxes.tsx
@Component({
  selector: "preview-dropdown-menu-checkboxes",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Open</button>
    <div uiDropdownMenuContent class="w-40">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>Appearance</div>
        <button uiDropdownMenuCheckboxItem [(checked)]="showStatusBar">
          Status Bar
        </button>
        <button uiDropdownMenuCheckboxItem [(checked)]="showActivityBar" disabled>
          Activity Bar
        </button>
        <button uiDropdownMenuCheckboxItem [(checked)]="showPanel">
          Panel
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuCheckboxesComponent {
  protected readonly showStatusBar = signal(true)
  protected readonly showActivityBar = signal(false)
  protected readonly showPanel = signal(false)
}

export default DropdownMenuCheckboxesComponent

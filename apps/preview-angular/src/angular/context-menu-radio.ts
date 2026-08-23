import { Component, signal } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-radio.tsx
@Component({
  selector: "preview-context-menu-radio",
  standalone: true,
  imports: [
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
  ],
  template: `<div uiContextMenuRoot>
    <div
      uiContextMenuTrigger
      class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
    >
      <span class="hidden pointer-fine:inline-block">Right click here</span>
      <span class="hidden pointer-coarse:inline-block">Long press here</span>
    </div>
    <div uiContextMenuContent>
      <div uiContextMenuGroup>
        <div uiContextMenuLabel>People</div>
        <div
          uiContextMenuRadioGroup
          [value]="user()"
          (onValueChange)="user.set($event)"
        >
          <button uiContextMenuRadioItem value="pedro">Pedro Duarte</button>
          <button uiContextMenuRadioItem value="colm">Colm Tuite</button>
        </div>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <div uiContextMenuLabel>Theme</div>
        <div
          uiContextMenuRadioGroup
          [value]="theme()"
          (onValueChange)="theme.set($event)"
        >
          <button uiContextMenuRadioItem value="light">Light</button>
          <button uiContextMenuRadioItem value="dark">Dark</button>
          <button uiContextMenuRadioItem value="system">System</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class ContextMenuRadioComponent {
  protected readonly user = signal("pedro")
  protected readonly theme = signal("light")
}

export default ContextMenuRadioComponent

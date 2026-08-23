import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-sides.tsx
//
// Parity note: the React example sets `side` on each ContextMenuContent, but a
// context menu always opens at the cursor — radix-ng v1.x positions it via the
// pointer anchor and has no `side` input. The four panels are kept as in the
// React example; placement is identical at runtime.
@Component({
  selector: "preview-context-menu-sides",
  standalone: true,
  imports: [ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem],
  template: `<div class="grid w-full max-w-sm grid-cols-2 gap-4">
    <div uiContextMenuRoot>
      <div
        uiContextMenuTrigger
        class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click (top)</span>
        <span class="hidden pointer-coarse:inline-block">Long press (top)</span>
      </div>
      <div uiContextMenuContent>
        <div uiContextMenuGroup>
          <button uiContextMenuItem>Back</button>
          <button uiContextMenuItem>Forward</button>
          <button uiContextMenuItem>Reload</button>
        </div>
      </div>
    </div>
    <div uiContextMenuRoot>
      <div
        uiContextMenuTrigger
        class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click (right)</span>
        <span class="hidden pointer-coarse:inline-block">Long press (right)</span>
      </div>
      <div uiContextMenuContent>
        <div uiContextMenuGroup>
          <button uiContextMenuItem>Back</button>
          <button uiContextMenuItem>Forward</button>
          <button uiContextMenuItem>Reload</button>
        </div>
      </div>
    </div>
    <div uiContextMenuRoot>
      <div
        uiContextMenuTrigger
        class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click (bottom)</span>
        <span class="hidden pointer-coarse:inline-block">Long press (bottom)</span>
      </div>
      <div uiContextMenuContent>
        <div uiContextMenuGroup>
          <button uiContextMenuItem>Back</button>
          <button uiContextMenuItem>Forward</button>
          <button uiContextMenuItem>Reload</button>
        </div>
      </div>
    </div>
    <div uiContextMenuRoot>
      <div
        uiContextMenuTrigger
        class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click (left)</span>
        <span class="hidden pointer-coarse:inline-block">Long press (left)</span>
      </div>
      <div uiContextMenuContent>
        <div uiContextMenuGroup>
          <button uiContextMenuItem>Back</button>
          <button uiContextMenuItem>Forward</button>
          <button uiContextMenuItem>Reload</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class ContextMenuSidesComponent {}

export default ContextMenuSidesComponent

import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
  SheetPortal,
} from "@/angular-ui/sheet"

// apps/v4/examples/base/sheet-side.tsx — one sheet per edge. The side classes
// (max-height on top/bottom) come in via the className input, same as React.
type SheetSideOption = "top" | "right" | "bottom" | "left"

const SHEET_SIDES: SheetSideOption[] = ["top", "right", "bottom", "left"]

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

@Component({
  selector: "preview-sheet-side",
  standalone: true,
  imports: [
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
    Button,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (side of sides; track side) {
        <div uiSheet>
          <button uiButton variant="outline" uiSheetTrigger class="capitalize">
            {{ side }}
          </button>
          <ng-template uiSheetPortal>
            <div uiSheetOverlay></div>
            <div
              uiSheetContent
              [side]="side"
              class="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
              <div uiSheetHeader>
                <h2 uiSheetTitle>Edit profile</h2>
                <p uiSheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </p>
              </div>
              <div class="no-scrollbar overflow-y-auto px-4">
                @for (p of paragraphs; track $index) {
                  <p class="mb-2 leading-relaxed">{{ lorem }}</p>
                }
              </div>
              <div uiSheetFooter>
                <button uiButton type="submit">Save changes</button>
                <button uiButton variant="outline" uiSheetClose>Cancel</button>
              </div>
            </div>
          </ng-template>
        </div>
      }
    </div>
  `,
})
export class SheetSideComponent {
  protected readonly sides = SHEET_SIDES
  protected readonly paragraphs = Array.from({ length: 10 })
  protected readonly lorem = LOREM
}

export default SheetSideComponent

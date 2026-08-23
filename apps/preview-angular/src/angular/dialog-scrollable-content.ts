import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/angular-ui/dialog"

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

@Component({
  selector: "preview-dialog-scrollable-content",
  standalone: true,
  imports: [DialogOverlay, Button, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription],
  template: `
    <div uiDialogRoot>
      <button uiButton variant="outline" uiDialogTrigger type="button">
        Scrollable Content
      </button>
      <ng-template uiDialogPortal>
        <div uiDialogOverlay></div>
        <div uiDialogContent>
          <div uiDialogHeader>
            <h2 uiDialogTitle>Scrollable Content</h2>
            <p uiDialogDescription>
              This is a dialog with scrollable content.
            </p>
          </div>
          <div class="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            @for (paragraph of paragraphs; track $index) {
              <p class="mb-4 leading-normal">{{ paragraph }}</p>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class DialogScrollableContentComponent {
  protected readonly paragraphs = Array.from({ length: 10 }, () => LOREM)
}

export default DialogScrollableContentComponent

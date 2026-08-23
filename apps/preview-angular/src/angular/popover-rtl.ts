import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPositioner,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from "@/angular-ui/popover"

// apps/v4/examples/base/popover-rtl.tsx drives dir and labels from the
// language-selector translations (ar). Static dir="rtl" with the Arabic
// strings renders the same visual state.
@Component({
  selector: "preview-popover-rtl",
  standalone: true,
  imports: [Button, Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription],
  template: `
    <div class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        @for (s of physicalSides; track s.label) {
          <div uiPopover dir="rtl">
            <button uiButton variant="outline" uiPopoverTrigger type="button">
              {{ s.label }}
            </button>
            <ng-template uiPopoverPortal>
              <div
                uiPopoverPositioner
                [side]="s.side"
                align="center"
                [sideOffset]="4"
                dir="rtl"
              >
                <div uiPopoverContent>
                  <div uiPopoverHeader>
                    <div uiPopoverTitle>الأبعاد</div>
                    <p uiPopoverDescription>تعيين الأبعاد للطبقة.</p>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        }
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        @for (s of logicalSides; track s.label) {
          <div uiPopover dir="rtl">
            <button uiButton variant="outline" uiPopoverTrigger type="button">
              {{ s.label }}
            </button>
            <ng-template uiPopoverPortal>
              <div
                uiPopoverPositioner
                [side]="s.side"
                align="center"
                [sideOffset]="4"
                dir="rtl"
              >
                <div uiPopoverContent>
                  <div uiPopoverHeader>
                    <div uiPopoverTitle>الأبعاد</div>
                    <p uiPopoverDescription>تعيين الأبعاد للطبقة.</p>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        }
      </div>
    </div>
  `,
})
export class PopoverRtlComponent {
  protected readonly physicalSides = [
    { label: "يسار", side: "left" },
    { label: "أعلى", side: "top" },
    { label: "أسفل", side: "bottom" },
    { label: "يمين", side: "right" },
  ]

  protected readonly logicalSides = [
    { label: "بداية السطر", side: "inline-start" },
    { label: "نهاية السطر", side: "inline-end" },
  ]
}

export default PopoverRtlComponent

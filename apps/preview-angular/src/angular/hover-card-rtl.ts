import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  HoverCardContent,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/angular-ui/hover-card"

type Side = "left" | "top" | "bottom" | "right" | "inline-start" | "inline-end"

// React: apps/v4/examples/base/hover-card-rtl.tsx — Arabic product card opened
// from physical sides (`left`…) and logical sides (`inline-start`…). The React
// version drives `dir` per row via the language selector; the Angular preview
// renders the `ar` state statically (same convention as dialog-rtl /
// breadcrumb-rtl): static Arabic labels + dir="rtl". Logical sides resolve to
// physical ones through the positioner's `dir` input.
@Component({
  selector: "preview-hover-card-rtl",
  standalone: true,
  imports: [Button, HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardPositioner, HoverCardContent],
  template: `
    <div class="grid gap-4">
      @for (row of rows; track $index) {
        <div class="flex flex-wrap justify-center gap-2" dir="rtl">
          @for (side of row.sides; track side) {
            <div uiHoverCardRoot>
              <button uiButton variant="outline" uiHoverCardTrigger [delay]="10" [closeDelay]="100" type="button">
                {{ row.labels[side] }}
              </button>
              <ng-template uiHoverCardPortal>
                <div uiHoverCardPositioner [side]="side" dir="rtl">
                  <div uiHoverCardContent class="flex w-64 flex-col gap-1">
                    <div class="font-semibold">{{ name }}</div>
                    <div class="text-sm text-muted-foreground">{{ price }}</div>
                  </div>
                </div>
              </ng-template>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class HoverCardRtlComponent {
  protected readonly name = "سماعات لاسلكية"
  protected readonly price = "٩٩.٩٩ $"

  protected readonly rows: { sides: readonly Side[]; labels: Partial<Record<Side, string>> }[] = [
    {
      sides: ["left", "top", "bottom", "right"],
      labels: { left: "يسار", top: "أعلى", bottom: "أسفل", right: "يمين" },
    },
    {
      sides: ["inline-start", "inline-end"],
      labels: { "inline-start": "بداية السطر", "inline-end": "نهاية السطر" },
    },
  ]
}

export default HoverCardRtlComponent

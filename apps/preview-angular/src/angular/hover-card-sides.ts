import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  HoverCardContent,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/angular-ui/hover-card"

// React: apps/v4/examples/base/hover-card-sides.tsx — one card per physical
// side. `side` lives on the Angular positioner, not the content box.
@Component({
  selector: "preview-hover-card-sides",
  standalone: true,
  imports: [Button, HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardPositioner, HoverCardContent],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      @for (side of sides; track side) {
        <div uiHoverCardRoot>
          <button
            uiButton
            variant="outline"
            class="capitalize"
            uiHoverCardTrigger
            [delay]="100"
            [closeDelay]="100"
            type="button"
          >
            {{ side }}
          </button>
          <ng-template uiHoverCardPortal>
            <div uiHoverCardPositioner [side]="side">
              <div uiHoverCardContent>
                <div class="flex flex-col gap-1">
                  <h4 class="font-medium">Hover Card</h4>
                  <p>This hover card appears on the {{ side }} side of the trigger.</p>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      }
    </div>
  `,
})
export class HoverCardSidesComponent {
  protected readonly sides = ["left", "top", "bottom", "right"] as const
}

export default HoverCardSidesComponent

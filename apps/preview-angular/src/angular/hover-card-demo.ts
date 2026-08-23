import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  HoverCardContent,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/angular-ui/hover-card"

// React: apps/v4/examples/base/hover-card-demo.tsx — @nextjs preview card on a
// link-style trigger. `delay` / `closeDelay` move to the Angular trigger.
@Component({
  selector: "preview-hover-card-demo",
  standalone: true,
  imports: [Button, HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardPositioner, HoverCardContent],
  template: `
    <div uiHoverCardRoot>
      <button uiButton variant="link" uiHoverCardTrigger [delay]="10" [closeDelay]="100" type="button">
        Hover Here
      </button>
      <ng-template uiHoverCardPortal>
        <div uiHoverCardPositioner>
          <div uiHoverCardContent class="flex w-64 flex-col gap-0.5">
            <div class="font-semibold">@nextjs</div>
            <div>The React Framework – created and maintained by @vercel.</div>
            <div class="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class HoverCardDemoComponent {}

export default HoverCardDemoComponent

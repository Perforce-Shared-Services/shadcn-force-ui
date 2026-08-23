import { Button } from "@/angular-ui/button"
import { Card, CardContent } from "@/angular-ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import { Component } from "@angular/core"

@Component({
  selector: "preview-collapsible-basic",
  standalone: true,
  imports: [Button, Card, CardContent, Collapsible, CollapsibleTrigger, CollapsibleContent],
  template: ` <div uiCard class="mx-auto w-full max-w-sm">
    <div uiCardContent>
      <div uiCollapsible class="rounded-md data-open:bg-muted">
        <button
          uiCollapsibleTrigger
          class="inline-flex w-full items-center gap-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground [&_svg]:fill-current [&_svg]:size-4"
        >
          Product details
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="ml-auto transition-transform group-data-panel-open:rotate-180"
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </button>
        <div
          uiCollapsibleContent
          class="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm"
        >
          <div>
            This panel can be expanded or collapsed to reveal additional
            content.
          </div>
          <button uiButton size="xs">Learn More</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class CollapsibleBasicComponent {}

export default CollapsibleBasicComponent

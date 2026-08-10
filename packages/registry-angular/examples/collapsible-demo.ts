import { Button } from "@/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible"
import { Component } from "@angular/core"

@Component({
  selector: "preview-collapsible-demo",
  standalone: true,
  imports: [Button, Collapsible, CollapsibleTrigger, CollapsibleContent],
  template: ` <div uiCollapsible class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium"
        >&#64;shadcn starred 3 repositories</span
      >
      <button uiCollapsibleTrigger>
        <button uiButton variant="ghost" size="icon-sm" aria-label="Toggle">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </button>
      </button>
    </div>
    <div class="rounded-md border border-border px-4 py-3 text-sm">
      &#64;radix-ui/primitives
    </div>
    <div uiCollapsibleContent>
      <div class="flex flex-col gap-2">
        <div class="rounded-md border border-border px-4 py-3 text-sm">
          &#64;radix-ui/colors
        </div>
        <div class="rounded-md border border-border px-4 py-3 text-sm">
          &#64;stitches/react
        </div>
      </div>
    </div>
  </div>`,
})
export class CollapsibleDemoComponent {}

export default CollapsibleDemoComponent

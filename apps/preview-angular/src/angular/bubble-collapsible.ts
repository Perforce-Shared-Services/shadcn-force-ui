import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Button } from "@/angular-ui/button"
import { Collapsible, CollapsibleTrigger } from "@/angular-ui/collapsible"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/bubble-collapsible.tsx — React useState → Angular signal.
const TEXT = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const PREVIEW_LENGTH = 180

@Component({
  selector: "preview-bubble-collapsible",
  standalone: true,
  imports: [Bubble, BubbleContent, Button, Collapsible, CollapsibleTrigger],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble variant="muted"><div uiBubbleContent>How can I help you today?</div></div>
      <div uiBubble variant="muted" align="end">
        <div uiBubbleContent class="whitespace-pre-line">
          <div uiCollapsible>
            <div>{{ open() || !isLong ? text : preview }}</div>
            @if (isLong) {
              <button uiButton variant="link" class="gap-1 p-0 text-muted-foreground" uiCollapsibleTrigger type="button">
                {{ open() ? 'Show less' : 'Show more' }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" data-icon="inline-end" class="size-4 group-data-panel-open/uiCollapsible:rotate-180" aria-hidden="true"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BubbleCollapsibleComponent {
  protected readonly text = TEXT
  protected readonly isLong = TEXT.length > PREVIEW_LENGTH
  protected readonly preview = `${TEXT.slice(0, PREVIEW_LENGTH)}...`
  protected readonly open = signal(false)
}

export default BubbleCollapsibleComponent

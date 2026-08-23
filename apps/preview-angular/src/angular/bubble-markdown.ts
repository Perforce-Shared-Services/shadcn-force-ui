import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-markdown.tsx — React uses @/components/markdown;
// the Angular preview renders the same copy as pre-formatted text.
@Component({
  selector: "preview-bubble-markdown",
  standalone: true,
  imports: [Bubble, BubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble align="end" variant="muted">
        <div uiBubbleContent>Hello! Are you actually <strong>thinking</strong>?</div>
      </div>
      <div uiBubble variant="ghost">
        <div uiBubbleContent class="whitespace-pre-line">Ghost bubbles work for assistant text, <strong>markdown</strong>, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render <code>code</code> in it.

Ghost bubbles are full width and can take the full width of the container.</div>
      </div>
    </div>
  `,
})
export class BubbleMarkdownComponent {}

export default BubbleMarkdownComponent

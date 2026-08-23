import { toast } from "@/angular-ui/sonner"
import { Bubble, BubbleContent, BubbleReactions } from "@/angular-ui/bubble"
import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-reactions.tsx
@Component({
  selector: "preview-bubble-reactions",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleReactions, Button],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-12 py-12">
      <div uiBubble variant="muted" align="end">
        <div uiBubbleContent>I don't need tests, I know my code works.</div>
        <div uiBubbleReactions align="start" role="img" aria-label="Reactions: thumbs up, surprised">
          <span>👍</span><span>😮</span>
        </div>
      </div>
      <div uiBubble variant="muted">
        <div uiBubbleContent>Bold. Fine I'll add some tests. I'll let you know when they're done.</div>
        <div uiBubbleReactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
          <span>👀</span><span>🚀</span><span>+2</span>
        </div>
      </div>
      <div uiBubble variant="default" align="end">
        <div uiBubbleContent>Tests passed on the first try. All 142 of them. Looking good!</div>
        <div uiBubbleReactions side="top" align="start" role="img" aria-label="Reactions: party popper, clapping hands">
          <span>🎉</span><span>👏</span>
        </div>
      </div>
      <div uiBubble variant="destructive">
        <div uiBubbleContent>Are you sure I can run this command?</div>
        <div uiBubbleReactions>
          <button uiButton variant="ghost" size="xs" type="button" (click)="run()">Yes, run it</button>
        </div>
      </div>
    </div>
  `,
})
export class BubbleReactionsComponent {
  protected run() {
    toast.success("You clicked yes, running command...")
  }
}

export default BubbleReactionsComponent

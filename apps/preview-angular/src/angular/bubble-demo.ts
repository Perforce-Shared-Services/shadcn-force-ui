import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-demo.tsx
@Component({
  selector: "preview-bubble-demo",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleGroup, BubbleReactions],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble align="end"><div uiBubbleContent>Hey there! what's up?</div></div>
      <div uiBubbleGroup>
        <div uiBubble variant="muted">
          <div uiBubbleContent>Hey! Want to see chat bubbles?</div>
        </div>
        <div uiBubble variant="muted">
          <div uiBubbleContent>I can group messages, switch sides, and keep the whole thread easy to scan.</div>
          <div uiBubbleReactions role="img" aria-label="Reaction: thumbs up"><span>👍</span></div>
        </div>
      </div>
      <div uiBubble align="end"><div uiBubbleContent>Sure. Hit me with your best demo.</div></div>
      <div uiBubble variant="muted">
        <div uiBubbleContent>Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.</div>
        <div uiBubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
          <span>👍</span><span>🔥</span><span>👀</span><span>+2</span>
        </div>
      </div>
    </div>
  `,
})
export class BubbleDemoComponent {}

export default BubbleDemoComponent

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-group-demo.tsx
@Component({
  selector: "preview-bubble-group",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleGroup, BubbleReactions],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble variant="muted"><div uiBubbleContent>Can you tell me what's the issue?</div></div>
      <div uiBubbleGroup>
        <div uiBubble align="end"><div uiBubbleContent>You tell me!</div></div>
        <div uiBubble align="end"><div uiBubbleContent>It worked yesterday. You broke it!</div></div>
        <div uiBubble align="end">
          <div uiBubbleContent>Find the bug and fix it.</div>
          <div uiBubbleReactions aria-label="Reactions: eyes" align="start"><span>👀</span></div>
        </div>
      </div>
      <div uiBubble variant="muted">
        <div uiBubbleContent>Want me to diff yesterday's you against today's you? It's a bit embarrassing.</div>
      </div>
    </div>
  `,
})
export class BubbleGroupDemoComponent {}

export default BubbleGroupDemoComponent

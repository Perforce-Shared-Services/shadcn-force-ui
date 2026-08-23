import { Bubble, BubbleContent, BubbleReactions } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-variants.tsx
// React renders assistant text through @/components/markdown; the Angular
// preview has no markdown pipeline, so the ghost-bubble copy is rendered as
// plain text with inline strong/code to approximate it.
@Component({
  selector: "preview-bubble-variants",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleReactions],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-12 py-12">
      <div uiBubble><div uiBubbleContent>This is the default primary bubble.</div></div>
      <div uiBubble variant="secondary" align="end">
        <div uiBubbleContent>This is the secondary variant.</div>
      </div>
      <div uiBubble variant="muted">
        <div uiBubbleContent>This one is muted. It uses a lower emphasis color for the chat bubble.</div>
        <div uiBubbleReactions role="img" aria-label="Reaction: thumbs up"><span>👍</span></div>
      </div>
      <div uiBubble variant="tinted" align="end">
        <div uiBubbleContent>This one is tinted. The tint is a softer color derived from the primary color.</div>
      </div>
      <div uiBubble variant="outline"><div uiBubbleContent>We can also use an outlined variant.</div></div>
      <div uiBubble variant="destructive" align="end">
        <div uiBubbleContent>Or a destructive variant with a reaction.</div>
        <div uiBubbleReactions role="img" aria-label="Reaction: fire"><span>🔥</span></div>
      </div>
      <div uiBubble variant="ghost">
        <div uiBubbleContent class="whitespace-pre-line">Ghost bubbles work for assistant text, <strong>markdown</strong>, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render <code>code</code> in it.

Ghost bubbles are full width and can take the full width of the container.</div>
      </div>
    </div>
  `,
})
export class BubbleVariantsComponent {}

export default BubbleVariantsComponent

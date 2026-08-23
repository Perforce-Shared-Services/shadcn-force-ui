import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-alignment.tsx
@Component({
  selector: "preview-bubble-alignment",
  standalone: true,
  imports: [Bubble, BubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble variant="muted">
        <div uiBubbleContent>This bubble is aligned to the start. This is the default alignment.</div>
      </div>
      <div uiBubble align="end">
        <div uiBubbleContent>This bubble is aligned to the end. Use this for user messages.</div>
      </div>
    </div>
  `,
})
export class BubbleAlignmentComponent {}

export default BubbleAlignmentComponent

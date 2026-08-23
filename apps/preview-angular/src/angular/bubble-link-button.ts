import { toast } from "@/angular-ui/sonner"
import { Bubble, BubbleContent, BubbleGroup } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base/bubble-link-button.tsx — React renders BubbleContent
// through render={<button/>}; the Angular attribute selector decorates the
// native button the caller writes instead.
@Component({
  selector: "preview-bubble-link-button",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleGroup],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble variant="muted"><div uiBubbleContent>How can I help you today?</div></div>
      <div uiBubbleGroup>
        <div uiBubble variant="tinted" align="end">
          <button uiBubbleContent type="button" (click)="toast('You clicked forgot password')">I forgot my password</button>
        </div>
        <div uiBubble variant="tinted" align="end">
          <button uiBubbleContent type="button" (click)="toast('You clicked help with subscription')">I need help with my subscription</button>
        </div>
        <div uiBubble variant="tinted" align="end">
          <button uiBubbleContent type="button" (click)="toast('You clicked something else. Talk to a human.')">Something else. Talk to a human.</button>
        </div>
      </div>
    </div>
  `,
})
export class BubbleLinkButtonComponent {
  protected toast = toast
}

export default BubbleLinkButtonComponent

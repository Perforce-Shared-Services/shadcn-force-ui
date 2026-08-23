import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent, MessageFooter, MessageHeader } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-header-footer.tsx
@Component({
  selector: "preview-message-header-footer",
  standalone: true,
  imports: [Message, MessageContent, MessageFooter, MessageHeader, Bubble, BubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiMessage>
        <div uiMessageContent>
          <div uiMessageHeader>Olivia</div>
          <div uiBubble variant="muted"><div uiBubbleContent>I already checked the logs.</div></div>
        </div>
      </div>
      <div uiMessage align="end">
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>Send the report to the team. Ping @shadcn if you need help.</div></div>
          <div uiMessageFooter>
            <div>Read <span class="font-normal">Yesterday</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageHeaderFooterComponent {}

export default MessageHeaderFooterComponent

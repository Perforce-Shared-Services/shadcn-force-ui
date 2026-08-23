import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-markdown.tsx
// Deviation: React renders assistant text through a `Markdown` component; no
// Angular markdown renderer ships with the preview app, so the same content is
// rendered as equivalent static markup (ordered list + bold + code).
@Component({
  selector: "preview-message-markdown",
  standalone: true,
  imports: [Message, MessageContent, Bubble, BubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-muted [&_code]:px-1">
      <div uiMessage align="end">
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>How do I render markdown in a message?</div></div>
        </div>
      </div>
      <div uiMessage>
        <div uiMessageContent>
          <div uiBubble variant="ghost">
            <div uiBubbleContent>
              <p>Here's how to render markdown in a message:</p>
              <ol>
                <li>Render assistant text through <strong>Markdown</strong>.</li>
                <li>Keep user messages as plain text.</li>
                <li>Use a <code>ghost</code> bubble so the response is unframed.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageMarkdownComponent {}

export default MessageMarkdownComponent

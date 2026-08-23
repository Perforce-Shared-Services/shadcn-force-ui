import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-group.tsx
@Component({
  selector: "preview-message-group",
  standalone: true,
  imports: [Message, MessageAvatar, MessageContent, MessageGroup, Bubble, BubbleContent, Avatar, AvatarImage, AvatarFallback],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6 py-12">
      <div uiMessageGroup role="log" aria-live="polite">
        <div uiMessage>
          <div uiMessageAvatar></div>
          <div uiMessageContent>
            <div uiBubble variant="muted">
              <div uiBubbleContent>I checked the registry addresses.</div>
            </div>
          </div>
        </div>
        <div uiMessage>
          <div uiMessageAvatar>
            <span uiAvatar><img uiAvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&q=80" alt="@rabbit" /><span uiAvatarFallback>CN</span></span>
          </div>
          <div uiMessageContent>
            <div uiBubble variant="muted">
              <div uiBubbleContent>
                The component and example JSON now live under the UI registry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageGroupDemoComponent {}

export default MessageGroupDemoComponent

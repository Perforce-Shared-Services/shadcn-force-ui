import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "@/angular-ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-avatar.tsx
@Component({
  selector: "preview-message-avatar",
  standalone: true,
  imports: [Message, MessageAvatar, MessageContent, Bubble, BubbleContent, BubbleGroup, Avatar, AvatarImage, AvatarFallback],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6 py-12">
      <div uiMessage>
        <div uiMessageAvatar>
          <span uiAvatar><span uiAvatarFallback>R</span></span>
        </div>
        <div uiMessageContent>
          <div uiBubble variant="muted">
            <div uiBubbleContent>
              The build failed during dependency installation.
            </div>
          </div>
        </div>
      </div>
      <div uiMessage align="end">
        <div uiMessageAvatar>
          <span uiAvatar><img uiAvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&q=80" alt="@me" /><span uiAvatarFallback>R</span></span>
        </div>
        <div uiMessageContent>
          <div uiBubble>
            <div uiBubbleContent>Can you share the exact error?</div>
          </div>
        </div>
      </div>
      <div uiMessage>
        <div uiMessageAvatar>
          <span uiAvatar><img uiAvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&q=80" alt="@rabbit" /><span uiAvatarFallback>R</span></span>
        </div>
        <div uiMessageContent>
          <div uiBubbleGroup>
            <div uiBubble variant="muted">
              <div uiBubbleContent>Here's the error from the logs</div>
            </div>
            <div uiBubble variant="muted">
              <div uiBubbleContent>
                Something went wrong with the build. The libraries are not installed correctly. Try running the build again.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageAvatarDemoComponent {}

export default MessageAvatarDemoComponent

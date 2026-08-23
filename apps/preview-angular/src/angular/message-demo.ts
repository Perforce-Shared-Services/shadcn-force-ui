import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/angular-ui/bubble"
import { Marker, MarkerContent } from "@/angular-ui/marker"
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-demo.tsx
@Component({
  selector: "preview-message-demo",
  standalone: true,
  imports: [Message, MessageAvatar, MessageContent, MessageFooter, Avatar, AvatarImage, AvatarFallback, Bubble, BubbleContent, BubbleGroup, BubbleReactions, Marker, MarkerContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6 py-12">
      <div uiMessage align="end">
        <div uiMessageAvatar>
          <span uiAvatar>
            <img uiAvatarImage src="/avatars/10.png" alt="@me" />
            <span uiAvatarFallback>ME</span>
          </span>
        </div>
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>Deploying to prod real quick.</div></div>
        </div>
      </div>
      <div uiMessage>
        <div uiMessageAvatar>
          <span uiAvatar>
            <img uiAvatarImage src="/avatars/02.png" alt="@rabbit" />
            <span uiAvatarFallback>R</span>
          </span>
        </div>
        <div uiMessageContent>
          <div uiBubble variant="muted"><div uiBubbleContent>It's 4:55 PM. On a Friday.</div></div>
        </div>
      </div>
      <div uiMessage align="end">
        <div uiMessageAvatar>
          <span uiAvatar>
            <img uiAvatarImage src="/avatars/10.png" alt="@me" />
            <span uiAvatarFallback>ME</span>
          </span>
        </div>
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>It's a one-line change.</div></div>
          <div uiMessageFooter>Delivered</div>
        </div>
      </div>
      <div uiMessage>
        <div uiMessageAvatar>
          <span uiAvatar>
            <img uiAvatarImage src="/avatars/02.png" alt="@rabbit" />
            <span uiAvatarFallback>R</span>
          </span>
        </div>
        <div uiMessageContent>
          <div uiBubbleGroup>
            <div uiBubble variant="muted">
              <div uiBubbleContent>It's always a one-line change 😭.</div>
            </div>
            <div uiBubble variant="muted">
              <div uiBubbleContent>Alright, let me take a look.</div>
              <div uiBubbleReactions aria-label="Reactions: thumbs up"><span>👍</span></div>
            </div>
          </div>
        </div>
      </div>
      <div uiMarker role="status">
        <div uiMarkerContent class="shimmer"><span class="font-medium">Oliver</span> is typing...</div>
      </div>
    </div>
  `,
})
export class MessageDemoComponent {}

export default MessageDemoComponent

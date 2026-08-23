import { Button } from "@/angular-ui/button"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent, MessageFooter } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-actions.tsx
// Material Symbols (CopyIcon → "content_copy", RefreshCcwIcon → "refresh",
// ThumbsUpIcon → "thumb_up", ThumbsDownIcon → "thumb_down").
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="${d}"/></svg>`

const COPY = svg("M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z")
const THUMB_UP = svg("M855-632q24 0 42 18t18 42v81.84q0 7.16 1.5 14.66T915-461L789-171q-8.88 21.25-29.59 36.12Q738.69-120 716-120H272v-512l225-238q13.6-14 32.19-16.5Q547.77-889 565-879q17 10 25.5 27.5t4.2 36.5L556-632h299Zm-523 25v427h397l126-299v-93H482l53-249-203 214ZM139-120q-24.75 0-42.37-17.63Q79-155.25 79-180v-392q0-24.75 17.63-42.38Q114.25-632 139-632h133v60H139v392h133v60H139Zm193-60v-427 427Z")
const THUMB_DOWN = svg("M105-328q-24 0-42-18t-18-42v-81.84q0-7.16-1.5-14.66T45-499l126-290q8.88-21.25 29.59-36.13Q221.31-840 244-840h444v512L463-90q-13.6 14-32.19 16.5Q412.23-71 395-81q-17-10-25.5-27.5t-4.2-36.5L404-328H105Zm523-25v-427H231L105-481v93h373l-53 249 203-214Zm193-487q24.75 0 42.38 17.62Q881-804.75 881-780v392q0 24.75-17.62 42.37Q845.75-328 821-328H688v-60h133v-392H688v-60h133Zm-193 60v427-427Z")
const REFRESH = svg("M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z")

@Component({
  selector: "preview-message-actions",
  standalone: true,
  imports: [Message, MessageContent, MessageFooter, Bubble, BubbleContent, Button],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiMessage>
        <div uiMessageContent>
          <div uiBubble variant="muted">
            <div uiBubbleContent>The install failure is coming from the workspace package.</div>
          </div>
          <div uiMessageFooter variant="action">
            <button uiButton variant="ghost" size="icon" type="button" aria-label="Copy" title="Copy" [innerHTML]="copy"></button>
            <button uiButton variant="ghost" size="icon" type="button" aria-label="Like" title="Like" [innerHTML]="thumbUp"></button>
            <button uiButton variant="ghost" size="icon" type="button" aria-label="Dislike" title="Dislike" [innerHTML]="thumbDown"></button>
          </div>
        </div>
      </div>
      <div uiMessage align="end">
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>Okay drop me a link. Taking a look...</div></div>
          <div uiMessageFooter class="gap-2" variant="action">
            <span class="font-normal text-destructive">Failed to send</span>
            <button uiButton variant="ghost" size="icon-xs" type="button" title="Retry" aria-label="Retry" [innerHTML]="refresh"></button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageActionsComponent {
  protected readonly copy = COPY
  protected readonly thumbUp = THUMB_UP
  protected readonly thumbDown = THUMB_DOWN
  protected readonly refresh = REFRESH
}

export default MessageActionsComponent

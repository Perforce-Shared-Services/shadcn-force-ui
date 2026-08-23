import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import {
  injectMessageScroller,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Component } from "@angular/core"
import { inject } from "@angular/core"

// apps/v4/examples/base/message-scroller-scrollable.tsx
// Deviation: React renders rows through a shared `MessageAnimated` wrapper;
// the Angular preview renders `uiMessage`/`uiBubble` directly.
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const messages: ChatMsg[] = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
}))

/** Lives inside the provider so it can read scroll state. */
@Component({
  selector: "app-scroll-status",
  standalone: true,
  template: `{{ status() }}`,
})
export class ScrollStatusComponent {
  private readonly scroller = injectMessageScroller()

  protected readonly status = () => {
    const start = this.scroller.isAtStart()
    const end = this.scroller.isAtEnd()
    if (start && end) return "You can scroll both ways."
    if (end) return "You are at the top. You can only scroll down."
    if (start) return "You are at the bottom. You can only scroll up."
    return "All messages fit in the viewport."
  }
}

@Component({
  selector: "preview-message-scroller-scrollable",
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, ScrollStatusComponent],
  template: `
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div uiCard class="h-140 w-full gap-0 overflow-hidden">
        <div uiCardHeader class="gap-1 border-b">
          <div uiCardTitle>Scroll Status</div>
          <div uiCardDescription>Where the reader can go scroll to based on current scroll position.</div>
        </div>
        <div uiMessageScrollerProvider defaultScrollPosition="start">
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            <div uiMessageScroller>
              <div uiMessageScrollerViewport ariaLabel="Transcript">
                <div uiMessageScrollerContent class="gap-4 p-(--card-spacing)">
                  @for (m of messages; track m.id) {
                    <div uiMessage [align]="m.role === 'user' ? 'end' : 'start'">
                      <div uiMessageContent>
                        <div uiBubble [variant]="m.role === 'user' ? 'default' : 'ghost'">
                          <div uiBubbleContent class="whitespace-pre-wrap">{{ m.text }}</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button uiMessageScrollerButton></button>
            </div>
          </div>
          <div uiCardFooter class="justify-center border-t text-center text-sm text-muted-foreground">
            <app-scroll-status />
          </div>
        </div>
      </div>
      <div class="px-0.5 text-center text-xs text-muted-foreground">Scroll the transcript to see the footer update.</div>
    </div>
  `,
})
export class MessageScrollerScrollableComponent {
  protected readonly messages = messages
}

export default MessageScrollerScrollableComponent

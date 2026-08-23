import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/angular-ui/card"
import {
  injectMessageScroller,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Component, inject } from "@angular/core"

// apps/v4/examples/base/message-scroller-state.tsx
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const messages: ChatMsg[] = Array.from({ length: 12 }, (_, index) => ({
  id: `state-${index + 1}`,
  role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
  text:
    index % 2 === 0
      ? `Check section ${index + 1} of the transcript.`
      : `Section ${index + 1} is ready. Scroll state updates without rerendering the rows.`,
}))

/** Lives inside the provider so it can read scroll state. */
@Component({
  selector: "app-status-bar",
  standalone: true,
  template: `
    <div class="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap gap-1.5">
      @for (state of states; track state.label) {
        <span
          [attr.data-on]="state.on()"
          class="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground data-[on=true]:border-transparent data-[on=true]:bg-primary data-[on=true]:text-primary-foreground"
        >
          {{ state.label }}
        </span>
      }
    </div>
  `,
})
export class StatusBarComponent {
  private readonly scroller = injectMessageScroller()

  protected readonly states = [
    { label: "At top", on: () => (!this.scroller.isAtStart() ? "true" : "false") },
    { label: "At bottom", on: () => (!this.scroller.isAtEnd() ? "true" : "false") },
    { label: "Older above", on: () => (this.scroller.isAtStart() ? "true" : "false") },
    { label: "Newer below", on: () => (this.scroller.isAtEnd() ? "true" : "false") },
  ]
}

@Component({
  selector: "preview-message-scroller-state",
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardHeader, CardTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, StatusBarComponent],
  template: `
    <div uiCard class="mx-auto h-112 w-full max-w-md gap-0">
      <div uiCardHeader class="border-b">
        <div uiCardTitle>Scroll State</div>
        <div uiCardDescription>Read scroll state in JavaScript with the state hook.</div>
      </div>
      <div uiCardContent class="min-h-0 flex-1 p-0">
        <div uiMessageScrollerProvider defaultScrollPosition="start">
          <div uiMessageScroller>
            <app-status-bar />
            <div uiMessageScrollerViewport ariaLabel="Transcript">
              <div uiMessageScrollerContent class="gap-4 p-4 pt-12">
                @for (m of messages; track m.id) {
                  <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="m.role === 'user'">
                    <div uiMessage [align]="m.role === 'user' ? 'end' : 'start'">
                      <div uiMessageContent>
                        <div uiBubble [variant]="m.role === 'user' ? 'default' : 'muted'">
                          <div uiBubbleContent class="whitespace-pre-wrap">{{ m.text }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <button uiMessageScrollerButton></button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageScrollerStateComponent {
  protected readonly messages = messages
}

export default MessageScrollerStateComponent

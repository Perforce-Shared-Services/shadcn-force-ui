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

// apps/v4/examples/base/message-scroller-visibility.tsx
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const messages: ChatMsg[] = [
  { id: "vis-brief", role: "user", text: "Review the incident handoff and tell me what to read first." },
  { id: "vis-reply-1", role: "assistant", text: "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job." },
  { id: "vis-impact", role: "user", text: "What was the customer impact?" },
  { id: "vis-reply-2", role: "assistant", text: "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors." },
  { id: "vis-actions", role: "user", text: "What actions are open?" },
  { id: "vis-reply-3", role: "assistant", text: "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike." },
  { id: "vis-checklist", role: "user", text: "Give me the follow-up checklist." },
]

@Component({
  selector: "app-transcript-outline",
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardHeader, CardTitle, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent],
  template: `
    <div uiCard class="h-140 w-full gap-0">
      <div uiCardHeader class="gap-1 border-b">
        <div uiCardTitle>Transcript Outline</div>
        <div uiCardDescription>Track the current anchored turn.</div>
      </div>
      <div uiCardContent class="flex-1 overflow-hidden p-0">
        <div uiMessageScroller>
          <div uiMessageScrollerViewport ariaLabel="Incident transcript">
            <div uiMessageScrollerContent class="p-(--card-spacing)">
              @for (m of messages; track m.id) {
                <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="m.role === 'user'">
                  <div uiMessage [align]="m.role === 'user' ? 'end' : 'start'">
                    <div uiMessageContent>
                      <div uiBubble [variant]="m.role === 'user' ? 'muted' : 'ghost'" [class.ring-1]="currentAnchorId() === m.id" [class.ring-ring]="currentAnchorId() === m.id" [class.rounded-lg]="currentAnchorId() === m.id" [class.p-2]="currentAnchorId() === m.id" [class.-m-2]="currentAnchorId() !== m.id">
                        @for (p of paragraphs(m.text); track $index) {
                          <div uiBubbleContent><p class="whitespace-pre-wrap">{{ p }}</p></div>
                        }
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
  `,
})
export class TranscriptOutlineComponent {
  protected readonly messages = messages
  private readonly scroller = injectMessageScroller()

  protected currentAnchorId(): string | null {
    return this.scroller.currentAnchorId()
  }

  protected paragraphs(text: string): string[] {
    return text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
  }
}

@Component({
  selector: "preview-message-scroller-visibility",
  standalone: true,
  imports: [MessageScrollerProvider, TranscriptOutlineComponent],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative mx-auto w-full max-w-sm">
        <app-transcript-outline />
      </div>
    </div>
  `,
})
export class MessageScrollerVisibilityComponent {}

export default MessageScrollerVisibilityComponent

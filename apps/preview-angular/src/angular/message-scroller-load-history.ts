import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/angular-ui/tooltip"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-load-history.tsx
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const history: ChatMsg[] = [
  { id: "hist-1-user", role: "user", text: "Can you summarize the incident channel?" },
  { id: "hist-1-assistant", role: "assistant", text: "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind." },
  { id: "hist-2-user", role: "user", text: "Was checkout affected?" },
  { id: "hist-2-assistant", role: "assistant", text: "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout." },
  { id: "hist-3-user", role: "user", text: "What changed in the last deploy?" },
  { id: "hist-3-assistant", role: "assistant", text: "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes." },
  { id: "hist-4-user", role: "user", text: "Do we need to roll back?" },
  { id: "hist-4-assistant", role: "assistant", text: "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery." },
  { id: "hist-5-user", role: "user", text: "Keep watching for customer-visible issues." },
  { id: "hist-5-assistant", role: "assistant", text: "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation." },
]
const INITIAL_VISIBLE_COUNT = 5

@Component({
  selector: "preview-message-scroller-load-history",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>Load History</div>
            <div uiCardDescription>Prepended messages keep your place.</div>
            <div uiCardAction>
              <div uiTooltip>
                <button uiTooltipTrigger uiButton variant="outline" size="icon" aria-label="Reset loaded messages" [disabled]="visibleCount() === initialCount" (click)="reset()">
                  Reset
                </button>
                <div uiTooltipContent><p>Reset</p></div>
              </div>
            </div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            @if (canLoadHistory()) {
              <div class="flex justify-center border-b py-2">
                <button uiButton variant="ghost" size="sm" (click)="loadMore()">Load earlier messages</button>
              </div>
            }
            <div uiMessageScroller>
              <div uiMessageScrollerViewport ariaLabel="Incident transcript">
                <div uiMessageScrollerContent class="p-(--card-spacing)">
                  @for (m of visibleMessages(); track m.id) {
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
          <div uiCardFooter class="justify-center border-t text-xs text-muted-foreground">
            Showing {{ visibleMessages().length }} of {{ history.length }} messages
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageScrollerLoadHistoryComponent {
  protected readonly history = history
  protected readonly initialCount = INITIAL_VISIBLE_COUNT
  protected readonly visibleCount = signal(INITIAL_VISIBLE_COUNT)

  protected get visibleMessages(): ChatMsg[] {
    return history.slice(-this.visibleCount())
  }

  protected get canLoadHistory(): boolean {
    return this.visibleCount() < history.length
  }

  protected loadMore(): void {
    this.visibleCount.update((count) => Math.min(history.length, count + 4))
  }

  protected reset(): void {
    this.visibleCount.set(INITIAL_VISIBLE_COUNT)
  }
}

export default MessageScrollerLoadHistoryComponent

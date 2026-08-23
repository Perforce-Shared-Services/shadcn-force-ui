import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Message, MessageContent, MessageHeader } from "@/angular-ui/message"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/angular-ui/tooltip"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-group-chat.tsx
type GroupChatItem =
  | { id: string; type: "event"; text: string; scrollAnchor?: boolean }
  | { id: string; type: "message"; sender: string; role: "assistant" | "participant"; text: string; scrollAnchor?: boolean }

const currentUser = "Grace"

const initialItems: GroupChatItem[] = [
  { id: "group-1", type: "message", sender: "Grace", role: "participant", text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?" },
  { id: "group-2", type: "message", sender: "Mary (Agent)", role: "assistant", text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need." },
  { id: "group-3", type: "message", sender: "Grace", role: "participant", text: "ping @rocky", scrollAnchor: true },
]
const rockyMarker: GroupChatItem = { id: "group-4", type: "event", text: "Rocky has joined the chat", scrollAnchor: true }
const rockyMessage: GroupChatItem = { id: "group-5", type: "message", sender: "Rocky", role: "participant", text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart." }

@Component({
  selector: "preview-message-scroller-group-chat",
  standalone: true,
  imports: [Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Message, MessageContent, MessageHeader, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>Group Chat</div>
            <div uiCardDescription>Events and messages share one transcript.</div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            <div uiMessageScroller>
              <div uiMessageScrollerViewport ariaLabel="Group transcript">
                <div uiMessageScrollerContent class="p-(--card-spacing)">
                  @for (item of items(); track item.id) {
                    @if (item.type === "event") {
                      <div uiMessageScrollerItem [scrollAnchor]="item.scrollAnchor ?? false" class="my-2 text-center text-xs text-muted-foreground">
                        {{ item.text }}
                      </div>
                    } @else {
                      <div uiMessageScrollerItem [scrollAnchor]="item.scrollAnchor ?? false">
                        <div uiMessage [align]="item.sender === currentUser ? 'end' : 'start'">
                          @if (item.sender !== previousSender($index)) {
                            <div uiMessageHeader>{{ item.sender }}</div>
                          }
                          <div uiMessageContent>
                            <span class="whitespace-pre-wrap">{{ item.text }}</span>
                          </div>
                        </div>
                      </div>
                    }
                  }
                </div>
              </div>
              <button uiMessageScrollerButton></button>
            </div>
          </div>
          <div uiCardFooter>
            <div uiTooltip>
              <button uiTooltipTrigger uiButton variant="outline" size="sm" (click)="joinRocky()">Add Rocky</button>
              <div uiTooltipContent><p>Appends the join event and Rocky's reply</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageScrollerGroupChatComponent {
  protected readonly currentUser = currentUser
  protected readonly items = signal<GroupChatItem[]>([...initialItems])

  protected previousSender(index: number): string | undefined {
    const list = this.items()
    for (let i = index - 1; i >= 0; i--) {
      const prior = list[i]
      if (prior.type === "message") return prior.sender
    }
    return undefined
  }

  protected joinRocky(): void {
    this.items.update((list) =>
      list.some((i) => i.id === rockyMessage.id) ? list : [...list, rockyMarker, rockyMessage]
    )
  }
}

export default MessageScrollerGroupChatComponent

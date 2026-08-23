import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/angular-ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-anchoring.tsx
// Deviation: React renders rows through a shared `MessageAnimated` wrapper;
// the Angular preview renders `uiMessage`/`uiBubble` directly.
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const scriptedMessages: ChatMsg[] = [
  { id: "anchor-1-user", role: "user", text: "Can you show me how anchoring behaves when a new prompt starts the turn?" },
  { id: "anchor-1-assistant", role: "assistant", text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it." },
  { id: "anchor-2-user", role: "user", text: "What changes when assistant messages are the anchor?" },
  { id: "anchor-2-assistant", role: "assistant", text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn." },
  { id: "anchor-3-user", role: "user", text: "Can I switch roles and keep adding turns?" },
  { id: "anchor-3-assistant", role: "assistant", text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo." },
]

const RESET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg>`
const ARROW_UP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>`

@Component({
  selector: "preview-message-scroller-anchoring",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, ToggleGroup, ToggleGroupItem],
  template: `
    <div class="relative flex flex-col gap-4">
      <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <div uiCardHeader class="border-b">
          <div uiCardTitle>Anchoring Turns</div>
          <div uiCardDescription>Choose which role settles near the top edge.</div>
          <div uiCardAction>
            <button uiButton type="button" variant="outline" size="icon" aria-label="Reset anchored turns" [disabled]="messages().length === 0" (click)="reset()" [innerHTML]="resetIcon"></button>
          </div>
        </div>
        <div uiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
          @if (messages().length === 0) {
            <div uiEmpty class="h-full">
              <div uiEmptyHeader>
                <div uiEmptyMedia variant="icon"><span [innerHTML]="chatIcon"></span></div>
                <div uiEmptyTitle>No anchored messages yet</div>
                <div uiEmptyDescription>Send the first message to see the selected role anchor.</div>
              </div>
            </div>
          } @else {
            <div uiMessageScrollerProvider>
              <div uiMessageScroller>
                <div uiMessageScrollerViewport ariaLabel="Transcript">
                  <div uiMessageScrollerContent class="p-(--card-spacing)">
                    @for (m of messages(); track m.id) {
                      <div
                        uiMessageScrollerItem
                        [messageId]="m.id"
                        [scrollAnchor]="m.role === anchorRole()"
                      >
                        <div uiMessage [align]="m.role === 'user' ? 'end' : 'start'">
                          <div uiMessageContent>
                            <div uiBubble [variant]="m.role === 'user' ? 'muted' : 'ghost'">
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
          }
        </div>
        <div uiCardFooter>
          <div uiToggleGroup aria-label="Select scroll anchor role" [value]="[anchorRole()]" (valueChange)="onAnchorChange($event)">
            <span uiToggleGroupItem value="user" aria-label="Anchor user messages">User</span>
            <span uiToggleGroupItem value="assistant" aria-label="Anchor assistant messages">Assistant</span>
          </div>
          <button uiButton type="button" size="icon" class="ml-auto" [disabled]="!nextMessage()" (click)="send()" [innerHTML]="arrowUp"></button>
          <span class="sr-only">Send Message</span>
        </div>
      </div>
      <div class="mx-auto max-w-xs px-0.5 text-center text-xs text-muted-foreground">Toggle the anchor role, then send messages to compare where turns settle.</div>
    </div>
  `,
})
export class MessageScrollerAnchoringComponent {
  protected readonly resetIcon = RESET
  protected readonly arrowUp = ARROW_UP
  protected readonly chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z"/></svg>`

  protected readonly anchorRole = signal<"user" | "assistant">("user")
  protected readonly messages = signal<ChatMsg[]>([])
  private readonly messageIndex = signal(0)

  protected get nextMessage(): ChatMsg | undefined {
    return scriptedMessages[this.messageIndex()]
  }

  protected onAnchorChange(value: string[]): void {
    const next = value[0]
    if (next === "user" || next === "assistant") {
      this.anchorRole.set(next)
      this.messages.set([])
      this.messageIndex.set(0)
    }
  }

  protected reset(): void {
    this.messages.set([])
    this.messageIndex.set(0)
  }

  protected send(): void {
    const next = scriptedMessages[this.messageIndex()]
    if (!next) return
    this.messages.update((msgs) => [...msgs, next])
    this.messageIndex.update((i) => i + 1)
  }
}

export default MessageScrollerAnchoringComponent

import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/angular-ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/angular-ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton } from "@/angular-ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/angular-ui/tooltip"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-streaming.tsx
// Deviation: the React demo streams assistant tokens through @ai-sdk/react;
// the Angular preview simulates streaming by revealing the reply in chunks.
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const scriptedTurns: Array<[string, string]> = [
  ["I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
   "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom."],
  ["Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
   "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost."],
]
const initialMessages: ChatMsg[] = [
  { id: "stream-1-user", role: "user", text: scriptedTurns[0][0] },
]

const ICON = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="${d}"/></svg>`
const RESET = ICON("M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z")
const ARROW_UP = ICON("M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z")
const PLUS = ICON("M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z")

@Component({
  selector: "preview-message-scroller-streaming",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DropdownMenuRoot, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, InputGroup, InputGroupAddon, InputGroupButton, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>Streaming</div>
            <div uiCardDescription>Auto-scroll follows tokens while you are pinned to the bottom.</div>
            <div uiCardAction>
              <div uiTooltip>
                <button uiTooltipTrigger [innerHTML]="resetIcon" uiButton variant="outline" size="icon" aria-label="Reset conversation" (click)="reset()"></button>
                <div uiTooltipContent><p>Reset</p></div>
              </div>
            </div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            @if (messages().length === 0) {
              <div uiEmpty class="h-full">
                <div uiEmptyHeader>
                  <div uiEmptyMedia variant="icon"><span [innerHTML]="chatIcon"></span></div>
                  <div uiEmptyTitle>No messages</div>
                  <div uiEmptyDescription>Press send to start streaming a reply.</div>
                </div>
              </div>
            } @else {
              <div uiMessageScroller>
                <div uiMessageScrollerViewport ariaLabel="Transcript">
                  <div uiMessageScrollerContent aria-busy="{{ isBusy() ? 'true' : 'false' }}" class="p-(--card-spacing)">
                    @for (m of messages(); track m.id) {
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
            }
          </div>
          <div uiCardFooter class="flex-col gap-2">
            <form (submit)="send($event)" class="w-full">
              <div uiInputGroup>
                <div class="h-14 w-full px-3 py-2.5">
                  @if (nextUserText(); as next) {
                    <span class="line-clamp-2 opacity-60">{{ next }}</span>
                  } @else {
                    <span class="text-muted-foreground">No messages queued. Reset the conversation.</span>
                  }
                </div>
                <div uiInputGroupAddon align="block-end" class="pt-1">
                  <div uiDropdownMenuRoot>
                    <button uiDropdownMenuTrigger uiInputGroupButton aria-label="Add files" type="button" size="icon-sm" variant="outline" [innerHTML]="plus"></button>
                    <div uiDropdownMenuContent align="start" side="top" class="w-44">
                      <span uiDropdownMenuItem>Add Photos & Files</span>
                      <div uiDropdownMenuSeparator></div>
                      <span uiDropdownMenuItem>Create Image</span>
                      <span uiDropdownMenuItem>Deep Research</span>
                    </div>
                  </div>
                  <button uiInputGroupButton type="submit" variant="default" size="icon-sm" class="ml-auto" [disabled]="!nextUserText()">
                    <span [innerHTML]="arrowUp"></span>
                    <span class="sr-only">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessageScrollerStreamingComponent {
  protected readonly resetIcon = RESET
  protected readonly arrowUp = ARROW_UP
  protected readonly plus = PLUS
  protected readonly chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z"/></svg>`

  protected readonly messages = signal<ChatMsg[]>([...initialMessages])
  private readonly turnIndex = signal(1)
  private streamTimer: ReturnType<typeof setInterval> | undefined

  protected nextUserText(): string | undefined {
    const i = this.turnIndex()
    return i < scriptedTurns.length ? scriptedTurns[i][0] : undefined
  }

  protected isBusy(): boolean {
    return this.streamTimer !== undefined
  }

  protected reset(): void {
    clearInterval(this.streamTimer)
    this.streamTimer = undefined
    this.messages.set([...initialMessages])
    this.turnIndex.set(1)
  }

  protected send(event: Event): void {
    event.preventDefault()
    const i = this.turnIndex()
    if (i >= scriptedTurns.length || this.isBusy()) return
    this.messages.update((msgs) => [...msgs, { id: `stream-user-${i}`, role: "user", text: scriptedTurns[i][0] }])
    // Simulated token streaming: reveal the assistant reply in chunks so the
    // scroller's ResizeObserver-driven autoScroll has real growth to follow.
    const full = scriptedTurns[i][1]
    let shown = 0
    const replyId = `stream-reply-${i}`
    this.messages.update((msgs) => [...msgs, { id: replyId, role: "assistant", text: "" }])
    this.streamTimer = setInterval(() => {
      shown = Math.min(full.length, shown + 24)
      this.messages.update((msgs) =>
        msgs.map((m) => (m.id === replyId ? { ...m, text: full.slice(0, shown) } : m))
      )
      if (shown >= full.length) {
        clearInterval(this.streamTimer)
        this.streamTimer = undefined
        this.turnIndex.set(i + 1)
      }
    }, 40)
  }
}

export default MessageScrollerStreamingComponent

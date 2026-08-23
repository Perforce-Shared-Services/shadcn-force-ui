import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
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

// apps/v4/examples/base/message-scroller-previous-context.tsx
// Deviation: React streams through @ai-sdk/react; the Angular preview appends
// the next scripted turn on send.
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const scriptedTurns: Array<[string, string]> = [
  ["I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
   "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place."],
  ["Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
   "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."],
  ["And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
   "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport."],
]
const initialMessages: ChatMsg[] = [
  { id: "peek-user", role: "user", text: scriptedTurns[0][0] },
  { id: "peek-assistant", role: "assistant", text: scriptedTurns[0][1] },
]

const ICON = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="${d}"/></svg>`
const RESET = ICON("M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z")
const ARROW_UP = ICON("M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z")
const PLUS = ICON("M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z")

@Component({
  selector: "preview-message-scroller-previous-context",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, InputGroup, InputGroupAddon, InputGroupButton, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <div uiMessageScrollerProvider [scrollPreviousItemPeek]="peek()">
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>Previous Context</div>
            <div uiCardDescription>The anchored turn keeps a peek of the previous exchange.</div>
            <div uiCardAction>
              <div uiTooltip>
                <button uiTooltipTrigger [innerHTML]="resetIcon" uiButton variant="outline" size="icon" aria-label="Reset conversation" (click)="reset()"></button>
                <div uiTooltipContent><p>Reset</p></div>
              </div>
            </div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            <div uiMessageScroller>
              <div uiMessageScrollerViewport ariaLabel="Transcript">
                <div uiMessageScrollerContent class="p-(--card-spacing)">
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
                  <button uiInputGroupButton type="submit" variant="default" size="icon-sm" class="ml-auto" [disabled]="!nextUserText()">
                    <span [innerHTML]="arrowUp"></span>
                    <span class="sr-only">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="px-0.5 text-center text-xs text-muted-foreground">Peek: {{ peek() }}px</div>
      </div>
    </div>
  `,
})
export class MessageScrollerPreviousContextComponent {
  protected readonly resetIcon = RESET
  protected readonly arrowUp = ARROW_UP
  protected readonly plus = PLUS

  protected readonly peek = signal(64)
  protected readonly messages = signal<ChatMsg[]>([...initialMessages])
  private readonly turnIndex = signal(1)

  protected nextUserText(): string | undefined {
    const i = this.turnIndex()
    return i < scriptedTurns.length ? scriptedTurns[i][0] : undefined
  }

  protected reset(): void {
    this.messages.set([...initialMessages])
    this.turnIndex.set(1)
    this.peek.set(64)
  }

  protected send(event: Event): void {
    event.preventDefault()
    const i = this.turnIndex()
    if (i >= scriptedTurns.length) return
    this.messages.update((msgs) => [
      ...msgs,
      { id: `peek-user-${i}`, role: "user", text: scriptedTurns[i][0] },
      { id: `peek-reply-${i}`, role: "assistant", text: scriptedTurns[i][1] },
    ])
    // Vary the peek so the anchor compensation is visible across sends.
    this.peek.update((p) => (p === 64 ? 96 : 64))
    this.turnIndex.set(i + 1)
  }
}

export default MessageScrollerPreviousContextComponent

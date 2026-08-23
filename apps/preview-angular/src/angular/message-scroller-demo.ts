import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/angular-ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/angular-ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/angular-ui/input-group"
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

// apps/v4/examples/base/message-scroller-demo.tsx
// Deviations: the React demo streams through @ai-sdk/react; the Angular
// preview appends the next scripted turn on send. Rows render via
// uiMessage/uiBubble instead of the shared MessageAnimated wrapper.
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const scriptedTurns: Array<[string, string]> = [
  ["I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
   "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."],
  ["Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
   "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."],
  ["And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
   "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."],
  ["Last one — does this work with assistive tech?",
   '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'],
]
const initialMessages: ChatMsg[] = scriptedTurns.slice(0, 4).flatMap(([userText, assistantText], i) => [
  { id: `demo-${i + 1}-user`, role: "user" as const, text: userText },
  { id: `demo-${i + 1}-assistant`, role: "assistant" as const, text: assistantText },
])

const ICON = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="${d}"/></svg>`
const RESET = ICON("M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z")
const ARROW_UP = ICON("M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z")
const PLUS = ICON("M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z")
const PAPERCLIP = ICON("M720-80q-50 0-85-35t-35-85v-360q0-42 29-71t71-29q42 0 71 29t29 71v320h-80v-320q0-9-6-15t-14-6q-8 0-15 6t-7 15v360q0 17 12.5 29.5T720-160q17 0 28.5-12.5T760-200v-320h80v320q0 50-35 85t-85 35ZM120-320v-480q0-33 23.5-56.5T200-880q33 0 56.5 23.5T280-800v480h-80v-480q0-9-6-15t-14-6q-8 0-14 6t-6 15v480h-40Zm40-480q17 0 28.5-11.5T200-840q0-17-11.5-28.5T160-880q-17 0-28.5 11.5T120-840q0 17 11.5 28.5T160-800Zm40 480h-80 80Z")
const IMAGE = ICON("M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Z")
const TELESCOPE = ICON("M440-120v-400l-64-190q-17-51 13-95t86-44q56 0 86 44t13 95l-54 190 154 362q8 19-2 38.5T641-100l-201-20Zm-40-500q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17Z")

@Component({
  selector: "preview-message-scroller-demo",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DropdownMenuRoot, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, InputGroup, InputGroupAddon, InputGroupButton, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>New Chat</div>
            <div uiCardDescription>How can I help you today?</div>
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
                  <div uiEmptyTitle>Morning, shadcn!</div>
                  <div uiEmptyDescription>What are we working on today? Press send to start a new conversation</div>
                </div>
              </div>
            } @else {
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
            }
          </div>
          <div uiCardFooter class="flex-col gap-2">
            <form (submit)="onSubmit($event)" class="w-full">
              <div uiInputGroup>
                <div class="h-14 w-full px-3 py-2.5">
                  @if (nextMessage; as next) {
                    <span class="line-clamp-2 opacity-60">{{ next.text }}</span>
                  } @else {
                    <span class="text-muted-foreground">No messages queued. Reset the conversation.</span>
                  }
                </div>
                <div uiInputGroupAddon align="block-end" class="pt-1">
                  <div uiDropdownMenuRoot>
                    <button uiDropdownMenuTrigger uiInputGroupButton aria-label="Add files" type="button" size="icon-sm" variant="outline" [innerHTML]="plus"></button>
                    <div uiDropdownMenuContent align="start" side="top" class="w-44">
                      <span uiDropdownMenuItem><span [innerHTML]="paperclip"></span> Add Photos & Files</span>
                      <div uiDropdownMenuSeparator></div>
                      <span uiDropdownMenuItem><span [innerHTML]="image"></span> Create Image</span>
                      <span uiDropdownMenuItem><span [innerHTML]="telescope"></span> Deep Research</span>
                    </div>
                  </div>
                  <button uiInputGroupButton type="submit" variant="default" size="icon-sm" class="ml-auto" [disabled]="!nextMessage">
                    <span [innerHTML]="arrowUp"></span>
                    <span class="sr-only">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="px-0.5 text-center text-xs text-muted-foreground">Demo is read only. Press send to send messages.</div>
      </div>
    </div>
  `,
})
export class MessageScrollerDemoComponent {
  protected readonly resetIcon = RESET
  protected readonly arrowUp = ARROW_UP
  protected readonly plus = PLUS
  protected readonly paperclip = PAPERCLIP
  protected readonly image = IMAGE
  protected readonly telescope = TELESCOPE
  protected readonly chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z"/></svg>`

  protected readonly messages = signal<ChatMsg[]>([...initialMessages])
  private readonly turnIndex = signal(scriptedTurns.length)

  protected get nextMessage(): ChatMsg | undefined {
    const i = this.turnIndex()
    if (i >= scriptedTurns.length) return undefined
    return { id: `demo-next-${i}`, role: "user", text: scriptedTurns[i][0] }
  }

  protected reset(): void {
    this.messages.set([...initialMessages])
    this.turnIndex.set(scriptedTurns.length)
  }

  protected onSubmit(event: Event): void {
    event.preventDefault()
    const next = this.nextMessage
    if (!next) return
    const i = this.turnIndex()
    this.messages.update((msgs) => [
      ...msgs,
      next,
      { id: `demo-reply-${i}`, role: "assistant" as const, text: scriptedTurns[i][1] },
    ])
    this.turnIndex.set(i + 1)
  }
}

export default MessageScrollerDemoComponent

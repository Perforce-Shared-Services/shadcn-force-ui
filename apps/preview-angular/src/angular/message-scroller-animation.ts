import { Button } from "@/angular-ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/angular-ui/card"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/angular-ui/select"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-animation.tsx
// Deviation: React streams through @ai-sdk/react and animates user rows via a
// shared MessageAnimated wrapper with named presets; the Angular preview
// appends scripted turns and applies an equivalent CSS entrance animation to
// the newest user row (fade / pop / tilt).
interface ChatMsg { id: string; role: "user" | "assistant"; text: string; animation?: string }

const scriptedTurns: Array<[string, string]> = [
  ["Can user messages pop in like iMessage without breaking anchoring?",
   "Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance."],
  ["What makes the animation feel more like iMessage?",
   "Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout."],
  ["Can I switch between presets while testing the same thread?",
   "Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time."],
]
const initialMessages: ChatMsg[] = [
  { id: "anim-1-user", role: "user", text: scriptedTurns[0][0] },
  { id: "anim-1-assistant", role: "assistant", text: scriptedTurns[0][1] },
]

@Component({
  selector: "preview-message-scroller-animation",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger],
  template: `
    <div uiMessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="border-b">
            <div uiCardTitle>Animation</div>
            <div uiCardDescription>Choose how user messages are animated when they are added to the conversation.</div>
            <div uiCardAction class="flex items-center gap-2">
              <button uiButton type="button" variant="outline" size="icon" aria-label="Reset animated messages" [disabled]="messages().length === 0" (click)="reset()">↺</button>
              <div uiSelect [value]="preset()" (valueChange)="setPreset($event)">
                <button uiSelectTrigger size="sm" class="w-24">{{ preset() }}</button>
                <div uiSelectContent>
                  <div uiSelectGroup>
                    <span uiSelectItem value="fade">fade</span>
                    <span uiSelectItem value="pop">pop</span>
                    <span uiSelectItem value="tilt">tilt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            @if (messages().length === 0) {
              <div uiEmpty class="h-full">
                <div uiEmptyHeader>
                  <div uiEmptyMedia variant="icon">💬</div>
                  <div uiEmptyTitle>No messages yet</div>
                  <div uiEmptyDescription>Send one to see the selected animation.</div>
                </div>
              </div>
            } @else {
              <div uiMessageScroller>
                <div uiMessageScrollerViewport ariaLabel="Transcript">
                  <div uiMessageScrollerContent class="p-(--card-spacing)">
                    @for (m of messages(); track m.id) {
                      <div uiMessage [align]="m.role === 'user' ? 'end' : 'start'" [class]="m.animation ? 'animate-in fade-in ' + m.animation : ''" [style.animation-duration.ms]="300">
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
        </div>
        <div uiCardContent class="border-t py-3 text-center">
          @if (canSend) {
            <button uiButton size="sm" (click)="sendNext()">Send next message ({{ preset() }})</button>
          }
        </div>
        <div class="px-0.5 text-center text-xs text-muted-foreground">Send messages to compare entrances against the same context.</div>
      </div>
    </div>
  `,
})
export class MessageScrollerAnimationComponent {
  protected readonly preset = signal("fade")
  protected readonly messages = signal<ChatMsg[]>([...initialMessages])
  private readonly turnIndex = signal(1)

  protected setPreset(value: string): void {
    this.preset.set(value)
  }

  protected reset(): void {
    this.messages.set([...initialMessages])
    this.turnIndex.set(1)
  }

  protected get canSend(): boolean {
    return this.turnIndex() < scriptedTurns.length
  }

  protected sendNext(): void {
    const i = this.turnIndex()
    if (i >= scriptedTurns.length) return
    const anim = this.preset() === "pop" ? "zoom-in-95 slide-in-from-bottom-2" : this.preset() === "tilt" ? "slide-in-from-bottom-2 [transform:rotateX(8deg)]" : ""
    this.messages.update((msgs) => [
      ...msgs,
      { id: `anim-user-${i}`, role: "user", text: scriptedTurns[i][0], animation: anim },
      { id: `anim-reply-${i}`, role: "assistant", text: scriptedTurns[i][1] },
    ])
    this.turnIndex.set(i + 1)
  }
}

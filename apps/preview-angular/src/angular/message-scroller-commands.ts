import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/angular-ui/card"
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/angular-ui/dropdown-menu"
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
import { Component } from "@angular/core"

// apps/v4/examples/base/message-scroller-commands.tsx
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const messages: ChatMsg[] = [
  { id: "command-activation", role: "user", text: "We're seeing activation dip after workspace creation. Can you help me find the likely step?" },
  { id: "command-reply-1", role: "assistant", text: "The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace." },
  { id: "command-compare", role: "user", text: "What should I compare before we change the onboarding flow?" },
  { id: "command-reply-2", role: "assistant", text: "Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt." },
  { id: "command-experiment", role: "user", text: "Can you turn that into an experiment?" },
  { id: "command-reply-3", role: "assistant", text: "Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project." },
  { id: "command-risk", role: "user", text: "What's the risk if we delay the invite prompt?" },
  { id: "command-reply-4", role: "assistant", text: "The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early." },
]
const userMessages = messages.filter((m) => m.role === "user")

@Component({
  selector: "app-command-menu",
  standalone: true,
  template: `
    <div uiDropdownMenuRoot>
      <button uiDropdownMenuTrigger uiButton type="button" variant="outline" size="sm">Jump to…</button>
      <div uiDropdownMenuContent align="end" class="w-52">
        <div uiDropdownMenuLabel>Questions</div>
        <div uiDropdownMenuGroup>
          @for (m of userMessages; track m.id) {
            <span uiDropdownMenuItem (click)="jump(m.id)">{{ m.text.slice(0, 34) }}…</span>
          }
        </div>
      </div>
    </div>
  `,
})
export class CommandMenuComponent {
  protected readonly userMessages = userMessages
  private readonly scroller = injectMessageScroller()

  protected jump(id: string): void {
    this.scroller.scrollToMessage(id)
  }
}

@Component({
  selector: "preview-message-scroller-commands",
  standalone: true,
  imports: [Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent, CommandMenuComponent],
  template: `
    <div uiMessageScrollerProvider defaultScrollPosition="end">
      <div class="relative flex flex-col gap-4">
        <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
          <div uiCardHeader class="gap-1 border-b">
            <div uiCardTitle>Commands</div>
            <div uiCardDescription>Drive the transcript from outside.</div>
            <div uiCardAction><app-command-menu /></div>
          </div>
          <div uiCardContent class="flex-1 overflow-hidden p-0">
            <div uiMessageScroller>
              <div uiMessageScrollerViewport ariaLabel="Transcript">
                <div uiMessageScrollerContent class="p-(--card-spacing)">
                  @for (m of messages; track m.id) {
                    <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="m.role === 'user'">
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
        </div>
        <div class="px-0.5 text-center text-xs text-muted-foreground">Use “Jump to…” to scroll a question into view.</div>
      </div>
    </div>
  `,
})
export class MessageScrollerCommandsComponent {
  protected readonly messages = messages
}

export default MessageScrollerCommandsComponent

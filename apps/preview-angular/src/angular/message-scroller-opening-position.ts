import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/angular-ui/card"
import {
  injectMessageScroller,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerScrollPosition,
} from "@/angular-ui/message-scroller"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/message-scroller-opening-position.tsx
interface ChatMsg { id: string; role: "user" | "assistant"; text: string }

const messages: ChatMsg[] = [
  { id: "open-1", role: "user", text: "This is the first message the user sent in the conversation." },
  { id: "open-2", role: "assistant", text: "Workspace creation rose 8%, but first invite completion only rose 2%." },
  { id: "open-3", role: "user", text: "This is the last message the user sent in the conversation." },
  { id: "open-4", role: "assistant", text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder." },
]

@Component({
  selector: "app-opening-scroller",
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardHeader, CardTitle, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, Bubble, BubbleContent, Message, MessageContent],
  template: `
    <div uiCard class="mx-auto h-140 w-full max-w-sm gap-0">
      <div uiCardHeader class="gap-1 border-b">
        <div uiCardTitle>Opening Position</div>
        <div uiCardDescription>Choose where a saved transcript opens.</div>
      </div>
      <div uiCardContent class="flex-1 overflow-hidden p-0">
        <div uiMessageScroller [class.hidden]="false">
          <div uiMessageScrollerViewport ariaLabel="Saved transcript">
            <div uiMessageScrollerContent class="p-(--card-spacing)">
              @for (m of messages; track m.id + '-' + positionKey()) {
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
  `,
})
export class OpeningPositionScrollerComponent {
  protected readonly messages = messages
  protected readonly positionKey = signal(0)
}

@Component({
  selector: "preview-message-scroller-opening-position",
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, MessageScrollerProvider, Tabs, TabsList, TabsTrigger, TabsContent],
  template: `
    <div class="relative flex flex-col gap-4">
      <div uiMessageScrollerProvider [defaultScrollPosition]="position()">
        <app-opening-scroller />
      </div>
      <div uiCard class="mx-auto w-full max-w-sm">
        <div uiCardContent>
          <div uiTabs [value]="tabValue()" class="w-full">
            <div uiTabsList class="grid w-full grid-cols-3">
              <button uiTabsTrigger value="start" (click)="setPosition('start')">start</button>
              <button uiTabsTrigger value="end" (click)="setPosition('end')">end</button>
              <button uiTabsTrigger value="last-anchor" (click)="setPosition('last-anchor')">last-anchor</button>
            </div>
          </div>
        </div>
      </div>
      <div class="px-0.5 text-center text-xs text-muted-foreground">Switching the position remounts the scroller so the opening pass reruns.</div>
    </div>
  `,
})
export class MessageScrollerOpeningPositionComponent {
  protected readonly tabValue = signal("last-anchor")

  protected get position(): MessageScrollerScrollPosition {
    return this.tabValue() as MessageScrollerScrollPosition
  }

  protected setPosition(value: string): void {
    this.tabValue.set(value)
  }
}

export default MessageScrollerOpeningPositionComponent

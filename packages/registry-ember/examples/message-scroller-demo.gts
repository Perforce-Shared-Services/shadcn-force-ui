import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { Button } from '@/ui/button';
import { Bubble, BubbleContent } from '@/ui/bubble';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from '@/ui/message-scroller';

interface ChatMessage {
  id: number;
  align: 'start' | 'end';
  text: string;
}

// [FORCE-UI] Ember port of the React message-scroller demo. The React version
// streams replies via @ai-sdk/react; this demo appends canned replies with a
// timer so the same auto-scroll behavior is visible without an AI backend.
export default class MessageScrollerDemo extends Component {
  @tracked messages: ChatMessage[] = [
    {
      id: 1,
      align: 'start',
      text: 'Wrap your message list in MessageScroller — the viewport pins to the bottom as new content arrives.',
    },
    {
      id: 2,
      align: 'end',
      text: "And if I've scrolled up to read something older?",
    },
    {
      id: 3,
      align: 'start',
      text: "Auto-scroll backs off while you're away from the bottom, and a button appears to jump back to the newest message.",
    },
  ];

  nextId = 4;
  timer?: ReturnType<typeof setTimeout>;

  get busy() {
    return this.timer !== undefined;
  }

  send = () => {
    if (this.busy) return;
    this.messages = [
      ...this.messages,
      { id: this.nextId++, align: 'end', text: 'One more question about scrolling…' },
    ];
    this.timer = setTimeout(() => {
      this.messages = [
        ...this.messages,
        {
          id: this.nextId++,
          align: 'start',
          text: 'Auto-scroll keeps the latest reply in view as long as you stay pinned to the bottom.',
        },
      ];
      this.timer = undefined;
    }, 600);
  };

  willDestroy() {
    super.willDestroy();
    clearTimeout(this.timer);
  }

  <template>
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div class="relative flex h-140 w-full flex-col overflow-hidden rounded-xl border bg-card">
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent aria-busy={{if this.busy "true"}} @class="p-4">
              {{#each this.messages as |message|}}
                <MessageScrollerItem class="py-1">
                  <Bubble @align={{message.align}} @variant={{if (eq message.align "start") "muted" "default"}}>
                    <BubbleContent>{{message.text}}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              {{/each}}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
      <div class="flex justify-end">
        <Button disabled={{this.busy}} {{on "click" this.send}}>
          Send message
        </Button>
      </div>
      <div class="px-0.5 text-center text-xs text-muted-foreground">
        Send messages and scroll up to see the jump-to-latest button.
      </div>
    </div>
  </template>
}

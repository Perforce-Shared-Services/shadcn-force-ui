// [FORCE-UI] Ember port of examples/base/message-scroller-scrollable.tsx.
// The React version reads a scrollable hook for the footer status; this port
// exposes both edge buttons so the same start/end navigation is possible
// with the simplified scroller port (no scrollable hook).
import { eq } from 'ember-truth-helpers';
import Component from '@glimmer/component';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ember-ui/card';
import { Bubble, BubbleContent } from '@/ember-ui/bubble';
import { Message, MessageContent } from '@/ember-ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from '@/ember-ui/message-scroller';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const messages: ChatMessage[] = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? 'user' : 'assistant',
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scroll state updates as the viewport moves.`,
}));

export default class MessageScrollerScrollable extends Component {
  messages = messages;

  <template>
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Card class="h-140 w-full gap-0 overflow-hidden">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Scroll Status</CardTitle>
          <CardDescription>
            Where the reader can go scroll to based on current scroll position.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex-1 overflow-hidden p-0">
          <MessageScroller @autoScroll={{false}}>
            <MessageScrollerViewport class="min-h-0 flex-1">
              <MessageScrollerContent class="gap-4 p-4 pt-12">
                {{#each this.messages as |message|}}
                  <MessageScrollerItem>
                    <Message @align={{if (eq message.role "user") "end" "start"}}>
                      <MessageContent>
                        <Bubble
                          @variant={{if
                            (eq message.role "user")
                            "default"
                            "muted"
                          }}
                        >
                          <BubbleContent>{{message.text}}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                {{/each}}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton @direction="start" />
            <MessageScrollerButton />
          </MessageScroller>
        </CardContent>
      </Card>
      <div class="px-0.5 text-center text-xs text-muted-foreground">
        Scroll the transcript to move between checkpoints.
      </div>
    </div>
  </template>
}

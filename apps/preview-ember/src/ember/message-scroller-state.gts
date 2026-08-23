// [FORCE-UI] Ember port of examples/base/message-scroller-state.tsx. The
// React status bar reads the scrollable hook; this port shows both edge
// buttons and a static status strip (simplified scroller port).
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
  id: `state-${index + 1}`,
  role: index % 2 === 0 ? 'user' : 'assistant',
  text:
    index % 2 === 0
      ? `Check section ${index + 1} of the transcript.`
      : `Section ${index + 1} is ready. Scroll state updates without rerendering the rows.`,
}));

export default class MessageScrollerState extends Component {
  messages = messages;

  <template>
    <Card class="mx-auto h-112 w-full max-w-md gap-0">
      <CardHeader class="border-b">
        <CardTitle>Scroll State</CardTitle>
        <CardDescription>
          Read scroll state in JavaScript with the state hook.
        </CardDescription>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 p-0">
        <MessageScroller @autoScroll={{false}}>
          <div
            class="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground"
          >
            <span>Start</span>
            <span>You are here</span>
            <span>End</span>
          </div>
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
  </template>
}

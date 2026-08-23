// [FORCE-UI] Ember port of examples/base/message-scroller-group-chat.tsx.
// Group transcript with per-participant avatars; the React regenerate button
// is rendered as a plain ghost button (no AI backend to regenerate from).
import { eq } from 'ember-truth-helpers';
import Component from '@glimmer/component';
import RotateCwIcon from '~icons/ms/refresh';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { Bubble, BubbleContent } from '@/ui/bubble';
import { Message, MessageAvatar, MessageContent } from '@/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from '@/ui/message-scroller';

interface GroupMessage {
  id: string;
  name: string;
  initials: string;
  align: 'start' | 'end';
  text: string;
}

const messages: GroupMessage[] = [
  {
    id: 'gc-1',
    name: 'Ada',
    initials: 'AD',
    align: 'start',
    text: 'Morning! Shipping the parity branch today?',
  },
  {
    id: 'gc-2',
    name: 'Grace',
    initials: 'GR',
    align: 'start',
    text: 'Yes — registry build is green across vue, svelte and ember.',
  },
  {
    id: 'gc-3',
    name: 'Me',
    initials: 'ME',
    align: 'end',
    text: 'Great. I will cut the release notes after review.',
  },
];

export default class MessageScrollerGroupChat extends Component {
  messages = messages;

  <template>
    <Card class="mx-auto h-112 w-full max-w-md gap-0">
      <CardHeader class="border-b">
        <CardTitle>Group Chat</CardTitle>
        <CardDescription>Three participants, one transcript.</CardDescription>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 p-0">
        <MessageScroller>
          <MessageScrollerViewport class="min-h-0 flex-1">
            <MessageScrollerContent class="gap-5 p-4 pt-12">
              {{#each this.messages as |message|}}
                <MessageScrollerItem>
                  <Message @align={{message.align}}>
                    {{#if (eq message.align "start")}}
                      <MessageAvatar
                        aria-label={{message.name}}
                        class="self-center"
                      >
                        <Avatar @size="sm">
                          <AvatarFallback>{{message.initials}}</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                    {{/if}}
                    <MessageContent>
                      <span class="text-xs font-medium text-muted-foreground">
                        {{message.name}}
                      </span>
                      <Bubble
                        @variant={{if (eq message.align "end") "default" "muted"}}
                      >
                        <BubbleContent>{{message.text}}</BubbleContent>
                      </Bubble>
                      {{#if (eq message.align "start")}}
                        <Button
                          aria-label="Regenerate"
                          class="h-6 w-6 p-0 text-muted-foreground"
                          @variant="ghost"
                          @size="icon-xs"
                        >
                          <RotateCwIcon />
                        </Button>
                      {{/if}}
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              {{/each}}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </CardContent>
    </Card>
  </template>
}

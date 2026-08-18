import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Avatar, AvatarFallback } from '@/app/ui/avatar';
import { Bubble, BubbleContent } from '@/app/ui/bubble';
import { Button } from '@/app/ui/button';
import { Message, MessageAvatar, MessageContent, MessageHeader } from '@/app/ui/message';

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerScrollPosition,
  MessageScrollerViewport,
} from './';

interface DemoMessage {
  id: string;
  align: 'start' | 'end';
  sender: string;
  text: string;
}

const SCROLL_POSITIONS: MessageScrollerScrollPosition[] = [
  MessageScrollerScrollPosition.Start,
  MessageScrollerScrollPosition.End,
  MessageScrollerScrollPosition.LastAnchor,
];

// Demo conversation — artist-facing content, never P4 jargon.
const SEED_TURNS: Omit<DemoMessage, 'id'>[] = [
  { align: 'start', sender: 'Ada Lovelace', text: 'Kicked off the render pass on the hero turntable.' },
  { align: 'end', sender: 'You', text: 'Nice, how long is that expected to take?' },
  { align: 'start', sender: 'Ada Lovelace', text: 'About twenty minutes for all four angles.' },
  { align: 'end', sender: 'You', text: 'Happy to wait, want to sanity-check lighting before we save a version.' },
  { align: 'start', sender: 'Ada Lovelace', text: 'Sounds good, first frame is in now if you want a look.' },
  { align: 'end', sender: 'You', text: 'Looking now, rim light on the shoulder is a little hot.' },
];

const FOLLOW_UP_LINES = [
  'Pulled the rim light down two stops, re-rendering that frame.',
  'That reads better, saving this as the next version.',
  'One more pass on the background bounce and it should be ready.',
  'Applied that, want to try it in the full turntable now?',
];

function buildSeedMessages(): DemoMessage[] {
  return SEED_TURNS.map((turn, i) => ({ id: `seed-${i}`, ...turn }));
}

interface MessageScrollerStoryArgs {
  autoScroll: boolean;
  defaultScrollPosition: MessageScrollerScrollPosition;
}

/**
 * `[uiMessageScroller]` (+ `Provider`/`Viewport`/`Content`/`Item`/`Button`)
 * is the Angular port of the Force UI chat scroller — a height-constrained,
 * auto-scroll-to-bottom viewport for a running conversation.
 *
 * Hand-ported behavior (no `@radix-ng/primitives` equivalent — see
 * `message-scroller-provider.component.ts`'s doc comment): `autoScroll`
 * keeps the viewport following newly appended/growing content while the
 * reader is at the live edge, `[scrollAnchor]` on an item marks a turn that
 * should settle near the top when it becomes current, and
 * `[uiMessageScrollerButton]` fades in once the reader has scrolled away
 * from the edge it targets.
 *
 * Click "Add message" to append a new turn and watch the viewport follow it
 * — then scroll up manually to disengage auto-follow and see the "Scroll to
 * latest" button fade in.
 */
const meta: Meta<MessageScrollerStoryArgs> = {
  title: 'UI/MessageScroller',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MessageScroller,
        MessageScrollerButton,
        MessageScrollerContent,
        MessageScrollerItem,
        MessageScrollerProvider,
        MessageScrollerViewport,
        Message,
        MessageAvatar,
        MessageContent,
        MessageHeader,
        Bubble,
        BubbleContent,
        Avatar,
        AvatarFallback,
        Button,
      ],
    }),
  ],
  argTypes: {
    autoScroll: {
      control: 'boolean',
      description: 'Keep following newly appended/growing content while the reader is at the live edge.',
    },
    defaultScrollPosition: {
      control: 'select',
      options: SCROLL_POSITIONS,
      description: 'Where the viewport settles on first mount.',
      table: { type: { summary: SCROLL_POSITIONS.join(' | ') }, defaultValue: { summary: MessageScrollerScrollPosition.End } },
    },
  },
  args: {
    autoScroll: true,
    defaultScrollPosition: MessageScrollerScrollPosition.End,
  },
  render: (args) => {
    const messages = signal<DemoMessage[]>(buildSeedMessages());
    let nextIndex = 0;
    const addMessage = () => {
      const align: 'start' | 'end' = messages().length % 2 === 0 ? 'start' : 'end';
      messages.update((list) => [
        ...list,
        {
          id: `follow-up-${nextIndex}`,
          align,
          sender: align === 'start' ? 'Ada Lovelace' : 'You',
          text: FOLLOW_UP_LINES[nextIndex++ % FOLLOW_UP_LINES.length],
        },
      ]);
    };
    return {
      props: { ...args, messages, addMessage },
      template: `
        <div class="flex w-full max-w-md flex-col gap-3">
          <button uiButton type="button" variant="outline" size="sm" class="self-start" (click)="addMessage()">
            Add message
          </button>
          <div uiMessageScrollerProvider [autoScroll]="autoScroll" [defaultScrollPosition]="defaultScrollPosition">
            <div uiMessageScroller class="h-80 w-full rounded-md border border-border">
              <div uiMessageScrollerViewport>
                <div uiMessageScrollerContent>
                  @for (m of messages(); track m.id) {
                    <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="true">
                      <div uiMessage [align]="m.align">
                        @if (m.align === 'start') {
                          <div uiMessageAvatar><span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span></div>
                        }
                        <div uiMessageContent>
                          <div uiMessageHeader class="sr-only">{{ m.sender }}</div>
                          <div uiBubble [align]="m.align" [variant]="m.align === 'end' ? 'tinted' : 'default'">
                            <div uiBubbleContent>{{ m.text }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button uiMessageScrollerButton direction="end" aria-label="Scroll to latest"></button>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<MessageScrollerStoryArgs>;

/** Interactive playground — every control available, plus a live "Add message" button. */
export const Playground: Story = {};

/** `autoScroll="false"` — new turns arrive without pulling the reader's scroll position along. */
export const NoAutoScroll: Story = { args: { autoScroll: false } };

/**
 * `defaultScrollPosition="start"` — the viewport opens at the oldest turn
 * instead of the latest, so `[uiMessageScrollerButton][direction=end]` is the
 * one active on mount (the mirror image of `Playground`'s "scroll up to
 * reveal the start button" interaction).
 */
export const OpensAtStart: Story = { args: { defaultScrollPosition: MessageScrollerScrollPosition.Start } };

/** Gallery — the default (auto-follow, opens at end) next to `autoScroll="false"`. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { messages: buildSeedMessages() },
    template: `
      <div class="flex flex-wrap items-start gap-6">
        @for (autoScroll of [true, false]; track autoScroll) {
          <div class="flex flex-col gap-2">
            <p class="text-xs font-semibold text-muted-foreground">autoScroll = {{ autoScroll }}</p>
            <div uiMessageScrollerProvider [autoScroll]="autoScroll">
              <div uiMessageScroller class="h-64 w-72 rounded-md border border-border">
                <div uiMessageScrollerViewport>
                  <div uiMessageScrollerContent>
                    @for (m of messages; track m.id) {
                      <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="true">
                        <div uiMessage [align]="m.align">
                          <div uiMessageContent>
                            <div uiMessageHeader class="sr-only">{{ m.sender }}</div>
                            <div uiBubble [align]="m.align" [variant]="m.align === 'end' ? 'tinted' : 'default'">
                              <div uiBubbleContent>{{ m.text }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <button uiMessageScrollerButton direction="end" aria-label="Scroll to latest"></button>
              </div>
            </div>
          </div>
        }
      </div>
    `,
  }),
};

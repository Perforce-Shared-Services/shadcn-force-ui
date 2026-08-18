import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Avatar, AvatarFallback } from '@/app/ui/avatar';
import { Bubble, BubbleContent } from '@/app/ui/bubble';
import { Button } from '@/app/ui/button';

import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from './';
import { type MessageAlign } from './message.component';

const ALIGNS: MessageAlign[] = ['start', 'end'];

interface MessageStoryArgs {
  align: MessageAlign;
  sender: string;
  content: string;
  timestamp: string;
}

const TEMPLATE = `
  <div uiMessage [align]="align" class="w-96">
    <div uiMessageAvatar>
      <span uiAvatar><span uiAvatarFallback>AL</span></span>
    </div>
    <div uiMessageContent>
      <div uiMessageHeader>{{ sender }}</div>
      <div uiBubble [align]="align">
        <div uiBubbleContent>{{ content }}</div>
      </div>
      <div uiMessageFooter>{{ timestamp }}</div>
    </div>
  </div>`;

/**
 * `[uiMessage]` is the Angular port of the Force UI (radix-force-ui) chat
 * message row — `[uiMessage]` positions one turn of a conversation (an
 * avatar + content column), `[uiMessageContent]` wraps the actual
 * bubble(s)/text for that turn, `[uiMessageHeader]`/`[uiMessageFooter]` are
 * optional slots above/below the content (sender name, timestamp, actions),
 * and `[uiMessageGroup]` stacks consecutive `[uiMessage]` rows.
 *
 * `align` mirrors a message's side of the conversation (`start` = incoming,
 * `end` = outgoing) and is typically passed straight through to the
 * `[uiBubble]` nested inside `[uiMessageContent]`.
 */
const meta: Meta<MessageStoryArgs> = {
  title: 'UI/Message',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Message,
        MessageAvatar,
        MessageContent,
        MessageFooter,
        MessageGroup,
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
    align: {
      control: 'select',
      options: ALIGNS,
      description: 'Conversation side: start (incoming) or end (outgoing)',
    },
    sender: { control: 'text', description: 'Sender name shown in the header' },
    content: { control: 'text', description: 'Message bubble text' },
    timestamp: { control: 'text', description: 'Footer timestamp text' },
  },
  args: {
    align: 'start',
    sender: 'Ada Lovelace',
    content: 'Started the audit pass.',
    timestamp: 'Sent 2m ago',
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<MessageStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/**
 * `align="start"` vs `align="end"` — the two sides of a conversation.
 *
 * Each message carries a `sr-only` `[uiMessageHeader]` naming its speaker —
 * `align` + `[uiBubble]` color alone is a position/color-only signal for
 * "who sent this" (WCAG 1.3.1 / 1.4.1); this demo is visually header-less
 * only to keep the alignment axis isolated, not because a real message can
 * skip identifying its speaker.
 */
export const Alignment: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-6">
        <div uiMessage align="start">
          <div uiMessageAvatar>
            <span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span>
          </div>
          <div uiMessageContent>
            <div uiMessageHeader class="sr-only">Ada Lovelace</div>
            <div uiBubble><div uiBubbleContent>This message is aligned to the start.</div></div>
          </div>
        </div>
        <div uiMessage align="end">
          <div uiMessageContent>
            <div uiMessageHeader class="sr-only">You</div>
            <div uiBubble variant="tinted" align="end"><div uiBubbleContent>This message is aligned to the end.</div></div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * `[uiMessageAvatar]` composes the existing `ui/avatar` primitive. A single
 * message with no other speaker in view — no header needed to disambiguate.
 */
export const WithAvatar: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-6">
        <div uiMessage>
          <div uiMessageAvatar>
            <span uiAvatar><span uiAvatarFallback>AL</span></span>
          </div>
          <div uiMessageContent>
            <div uiBubble><div uiBubbleContent>How can I help you today?</div></div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** `[uiMessageHeader]` (sender name) and `[uiMessageFooter]` (timestamp) slots. */
export const HeaderAndFooter: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-6">
        <div uiMessage>
          <div uiMessageAvatar>
            <span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span>
          </div>
          <div uiMessageContent>
            <div uiMessageHeader>Ada Lovelace</div>
            <div uiBubble><div uiBubbleContent>Started the audit pass.</div></div>
            <div uiMessageFooter>Sent 2m ago</div>
          </div>
        </div>
        <div uiMessage align="end">
          <div uiMessageContent>
            <div uiBubble variant="tinted" align="end"><div uiBubbleContent>Sounds good, thanks.</div></div>
            <div uiMessageFooter>Seen</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * `[uiMessageFooter]` can also hold an icon-action row (copy / rate) instead
 * of a timestamp — composes the existing `ui/button` `variant="ghost"
 * size="icon"` primitive, matching the Figma "Variant=Action" footer. A
 * single message with no other speaker in view — no header needed here.
 */
export const ActionFooter: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMessage class="w-96">
        <div uiMessageAvatar>
          <span uiAvatar><span uiAvatarFallback>AL</span></span>
        </div>
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>Here is the summary you asked for.</div></div>
          <div uiMessageFooter variant="action" class="gap-1 px-0">
            <button uiButton variant="ghost" size="icon" aria-label="Copy message">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z"/></svg>
            </button>
            <button uiButton variant="ghost" size="icon" aria-label="Upvote response">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M855-632q24 0 42 18t18 42v81.84q0 7.16 1.5 14.66T915-461L789-171q-8.88 21.25-29.59 36.12Q738.69-120 716-120H272v-512l225-238q13.6-14 32.19-16.5Q547.77-889 565-879q17 10 25.5 27.5t4.2 36.5L556-632h299Zm-523 25v427h397l126-299v-93H482l53-249-203 214ZM139-120q-24.75 0-42.37-17.63Q79-155.25 79-180v-392q0-24.75 17.63-42.38Q114.25-632 139-632h133v60H139v392h133v60H139Zm193-60v-427 427Z"/></svg>
            </button>
            <button uiButton variant="ghost" size="icon" aria-label="Downvote response">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M105-328q-24 0-42-18t-18-42v-81.84q0-7.16-1.5-14.66T45-499l126-290q8.88-21.25 29.59-36.13Q221.31-840 244-840h444v512L463-90q-13.6 14-32.19 16.5Q412.23-71 395-81q-17-10-25.5-27.5t-4.2-36.5L404-328H105Zm523-25v-427H231L105-481v93h373l-53 249 203-214Zm193-487q24.75 0 42.38 17.62Q881-804.75 881-780v392q0 24.75-17.62 42.37Q845.75-328 821-328H688v-60h133v-392H688v-60h133Zm-193 60v427-427Z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * `[uiMessageGroup]` stacks a full back-and-forth conversation.
 *
 * `role="log" aria-live="polite" aria-relevant="additions"` on the group
 * announces new turns as they arrive (WCAG 4.1.3) — `[uiMessageGroup]` has no
 * live-region behavior of its own (see the component JSDoc), so a caller
 * rendering a real running conversation must wire this itself, same as here.
 */
export const Conversation: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMessageGroup class="w-full max-w-md" role="log" aria-live="polite" aria-relevant="additions">
        <div uiMessage>
          <div uiMessageAvatar>
            <span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span>
          </div>
          <div uiMessageContent>
            <div uiMessageHeader>Ada Lovelace</div>
            <div uiBubble><div uiBubbleContent>I finished the audit pass.</div></div>
            <div uiBubble><div uiBubbleContent>Found one stale route in the output.</div></div>
          </div>
        </div>
        <div uiMessage align="end">
          <div uiMessageContent>
            <div uiBubble variant="tinted" align="end"><div uiBubbleContent>Yes, clean that up.</div></div>
            <div uiMessageFooter>Seen 1m ago</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Gallery — start/end alignment side by side. Each carries a `sr-only`
 * `[uiMessageHeader]` naming its speaker — see the `Alignment` story's note
 * on why `align` + `[uiBubble]` color alone isn't a sufficient signal.
 */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-6">
        ${ALIGNS.map(
          (align) => `
            <div uiMessage align="${align}">
              ${align === 'start' ? '<div uiMessageAvatar><span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span></div>' : ''}
              <div uiMessageContent>
                <div uiMessageHeader class="sr-only">${align === 'start' ? 'Ada Lovelace' : 'You'}</div>
                <div uiBubble align="${align}"><div uiBubbleContent>align="${align}"</div></div>
              </div>
            </div>`,
        ).join('')}
      </div>
    `,
  }),
};

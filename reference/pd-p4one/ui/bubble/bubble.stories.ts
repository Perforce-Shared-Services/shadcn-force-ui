import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from './';
import {
  type BubbleAlign,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
  type BubbleVariant,
} from './bubble.variants';

const VARIANTS: BubbleVariant[] = [
  'default',
  'secondary',
  'muted',
  'tinted',
  'outline',
  'ghost',
  'destructive',
];
const ALIGNS: BubbleAlign[] = ['start', 'end'];
const REACTION_SIDES: BubbleReactionsSide[] = ['top', 'bottom'];
const REACTION_ALIGNS: BubbleReactionsAlign[] = ['start', 'end'];

interface BubbleStoryArgs {
  variant: BubbleVariant;
  align: BubbleAlign;
  content: string;
}

const TEMPLATE = `
  <div uiBubble [variant]="variant" [align]="align" class="w-96">
    <div uiBubbleContent>{{ content }}</div>
  </div>`;

/**
 * `[uiBubble]` is the Angular port of the Force UI (radix-force-ui)
 * chat bubble — `[uiBubble]` is the colored/positioned container,
 * `[uiBubbleContent]` the text/button/link slot inside it, `[uiBubbleGroup]`
 * stacks consecutive bubbles from the same speaker, and `[uiBubbleReactions]`
 * is an optional pill anchored to a corner of the bubble.
 *
 * `variant` on `[uiBubble]` recolors every `[uiBubbleContent]` slotted inside
 * it — set it on the outer bubble, not the content. `align` mirrors a
 * message's side of the conversation (`start` = incoming, `end` = outgoing).
 */
const meta: Meta<BubbleStoryArgs> = {
  title: 'UI/Bubble',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, Bubble, BubbleContent, BubbleGroup, BubbleReactions, Button],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Bubble color style' },
    align: {
      control: 'select',
      options: ALIGNS,
      description: 'Conversation side: start (incoming) or end (outgoing)',
    },
    content: { control: 'text', description: 'Bubble message text' },
  },
  args: {
    variant: 'default',
    align: 'start',
    content: 'This is a one line bubble.',
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<BubbleStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** All seven color variants. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-4">
        <div uiBubble>
          <div uiBubbleContent>Default bubbles use the primary color for the active user side of a conversation.</div>
        </div>
        <div uiBubble variant="secondary">
          <div uiBubbleContent>Secondary bubbles are the standard neutral surface for assistant content.</div>
        </div>
        <div uiBubble variant="muted">
          <div uiBubbleContent>Muted bubbles lower the emphasis for quiet system notes.</div>
        </div>
        <div uiBubble variant="tinted" align="end">
          <div uiBubbleContent>Tinted bubbles use a softer primary tint when a full-primary fill is too strong.</div>
        </div>
        <div uiBubble variant="outline">
          <div uiBubbleContent>Outline bubbles frame message content with a border instead of a fill.</div>
        </div>
        <div uiBubble variant="destructive">
          <div uiBubbleContent>Destructive bubbles flag errors or failed actions in a conversation.</div>
        </div>
        <div uiBubble variant="ghost">
          <div uiBubbleContent>Ghost bubbles have no frame and can take the full width of the container — good for long assistant replies.</div>
        </div>
      </div>
    `,
  }),
};

/** `align="start"` vs `align="end"` — the two sides of a conversation. */
export const Alignment: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-4">
        <div uiBubble variant="muted" align="start">
          <div uiBubbleContent>This bubble is aligned to the start.</div>
        </div>
        <div uiBubble align="end">
          <div uiBubbleContent>This bubble is aligned to the end.</div>
        </div>
      </div>
    `,
  }),
};

/** `[uiBubbleGroup]` stacks consecutive bubbles from the same speaker. */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-8">
        <div uiBubbleGroup>
          <div uiBubble variant="secondary">
            <div uiBubbleContent>I finished the audit pass.</div>
          </div>
          <div uiBubble variant="secondary">
            <div uiBubbleContent>The output looks clean, but I found one stale route.</div>
          </div>
          <div uiBubble variant="secondary">
            <div uiBubbleContent>Want me to remove it now?</div>
          </div>
        </div>
        <div uiBubbleGroup>
          <div uiBubble variant="tinted" align="end">
            <div uiBubbleContent>Yes, clean that up.</div>
          </div>
          <div uiBubble variant="tinted" align="end">
            <div uiBubbleContent>Then rerun the build.</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** `[uiBubbleContent]` hosted on a `<button>`/`<a>` for clickable bubbles. */
export const ButtonAndLinks: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-4">
        <div uiBubble>
          <a uiBubbleContent href="#">This bubble is a link.</a>
        </div>
        <div uiBubble variant="secondary">
          <button uiBubbleContent type="button">This one is a button you can click.</button>
        </div>
        <div uiBubble>
          <div uiBubbleContent>How can I help you today?</div>
        </div>
        <div uiBubbleGroup>
          <div uiBubble variant="outline" align="end">
            <button uiBubbleContent type="button" class="border-dashed border-primary">I need help with my account.</button>
          </div>
          <div uiBubble variant="outline" align="end">
            <button uiBubbleContent type="button" class="border-dashed border-primary">I forgot my password.</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** `[uiBubbleReactions]` anchored to a corner of the bubble. */
export const WithReactions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-12">
        <div uiBubble>
          <div uiBubbleContent>This is a one line message.</div>
          <div uiBubbleReactions side="bottom" align="end" role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </div>
        </div>
        <div uiBubble variant="secondary" align="end">
          <div uiBubbleContent>A longer message that wraps across lines so the reaction offset is easier to inspect.</div>
          <div uiBubbleReactions side="bottom" align="start" role="img" aria-label="Reactions: thumbs up, surprised">
            <span>👍</span>
            <span>😮</span>
          </div>
        </div>
        <div uiBubble>
          <div uiBubbleContent>This is a one line message.</div>
          <div uiBubbleReactions>
            <button uiButton variant="outline" size="xs">Reply</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** All `side`/`align` positions for `[uiBubbleReactions]`. */
export const ReactionPlacement: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-8">
        ${REACTION_SIDES.map((side) =>
          REACTION_ALIGNS.map(
            (align) => `
              <div uiBubble>
                <div uiBubbleContent>side="${side}" align="${align}"</div>
                <div uiBubbleReactions side="${side}" align="${align}" role="img" aria-label="Reaction: thumbs up">
                  <span>👍</span>
                </div>
              </div>`,
          ).join(''),
        ).join('')}
      </div>
    `,
  }),
};

/** Gallery — the seven color variants side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-3">
        ${VARIANTS.map(
          (variant) => `
            <div uiBubble variant="${variant}">
              <div uiBubbleContent>variant="${variant}"</div>
            </div>`,
        ).join('')}
      </div>
    `,
  }),
};

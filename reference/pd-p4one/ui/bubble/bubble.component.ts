import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import {
  bubbleReactionsVariants,
  bubbleVariants,
  type BubbleAlign,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
  type BubbleVariant,
} from './bubble.variants';

/**
 * Angular port of @force-ui/bubble (radix-force-ui style).
 *
 * A chat message bubble: `Bubble` is the colored/positioned container,
 * `BubbleContent` is the text/button/link slot inside it, `BubbleGroup`
 * stacks consecutive bubbles from the same speaker, and `BubbleReactions` is
 * an optional pill anchored to a corner of the bubble. Attribute selectors —
 * each decorates whatever host element the caller writes (a plain `<div>`
 * for content, or `<button>`/`<a>` when the bubble itself is an action) with
 * the registry class string plus the `data-slot` attribute Force UI's
 * selector-based theming relies on.
 *
 * Usage:
 *   <div uiBubbleGroup>
 *     <div uiBubble variant="secondary">
 *       <div uiBubbleContent>I finished the audit pass.</div>
 *     </div>
 *     <div uiBubble variant="tinted" align="end">
 *       <div uiBubbleContent>Yes, clean that up.</div>
 *       <div uiBubbleReactions side="bottom" align="end" role="img" aria-label="Reaction: thumbs up">
 *         <span>👍</span>
 *       </div>
 *     </div>
 *   </div>
 *
 *   <div uiBubble>
 *     <a uiBubbleContent href="#">This bubble is a link.</a>
 *   </div>
 *
 * `Bubble`'s `variant` colors every `BubbleContent` slotted inside it via a
 * `*:data-[slot=bubble-content]:...` descendant selector — set the variant
 * on the outer `Bubble`, not on `BubbleContent` itself.
 *
 * `align` mirrors a message's side of the conversation ('start' = incoming,
 * 'end' = outgoing) and drives self-alignment when a `Bubble` sits inside a
 * flex column (`BubbleGroup`, or a future message-list wrapper).
 *
 * Accessibility:
 * - `BubbleContent` hosted on `<button>`/`<a>` gets its own focus-visible
 *   ring and `transition-colors` (registry-verbatim) — no extra work needed.
 * - `BubbleReactions` carries no default role/label because its content
 *   varies (emoji pill vs. a `Button`) — always add `role="img"` +
 *   `aria-label` when the content is a bare emoji/count, matching the
 *   registry's own example usage (WCAG 1.1.1).
 * - Speaker identity ("who sent this") is conveyed only by `align` (position)
 *   and `variant` (color) — neither carries a text/ARIA equivalent (WCAG
 *   1.3.1 / 1.4.1). A caller building a real message list should pair each
 *   `Bubble`/`BubbleGroup` with a visible or `sr-only` speaker label; this
 *   primitive doesn't have one to give.
 * - This primitive has no live-region behavior of its own. A caller rendering
 *   a running conversation (e.g. an incoming assistant reply) is responsible
 *   for announcing new messages via `aria-live`/`role="log"` on the message
 *   list wrapper (WCAG 4.1.3) — `Bubble`/`BubbleGroup` do not apply one
 *   themselves, since a static demo or a one-off bubble should not announce.
 */
// `motion-reduce:transition-none` is an app-compat addition over the
// registry string (WCAG 2.3.3) — guards the `[button,a]:transition-colors`
// clause for a bubble hosted on a clickable button/link (see the "Button &
// Links" registry example), same convention as `item`/`toggle`/`checkbox`.
const BUBBLE_CONTENT_BASE_CLASS =
  "w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors motion-reduce:transition-none [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50";

@Component({
  selector: '[uiBubbleGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'bubble-group',
    '[class]': 'classes()',
  },
})
export class BubbleGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('flex min-w-0 flex-col gap-2', this.className()));
}

@Component({
  selector: '[uiBubble]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'bubble',
    '[attr.data-variant]': 'variant()',
    '[attr.data-align]': 'align()',
    '[class]': 'classes()',
  },
})
export class BubbleComponent {
  readonly variant = input<BubbleVariant>('default');
  readonly align = input<BubbleAlign>('start');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(bubbleVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiBubbleContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'bubble-content',
    '[class]': 'classes()',
  },
})
export class BubbleContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(BUBBLE_CONTENT_BASE_CLASS, this.className()));
}

@Component({
  selector: '[uiBubbleReactions]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'bubble-reactions',
    '[attr.data-align]': 'align()',
    '[attr.data-side]': 'side()',
    '[class]': 'classes()',
  },
})
export class BubbleReactionsComponent {
  readonly side = input<BubbleReactionsSide>('bottom');
  readonly align = input<BubbleReactionsAlign>('end');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(bubbleReactionsVariants({ side: this.side(), align: this.align() }), this.className()),
  );
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/message (radix-force-ui style).
 *
 * A chat message row: `Message` is the layout/alignment container (typically
 * holding one `MessageAvatar` + one `MessageContent`), `MessageContent` wraps
 * the actual bubble(s)/text for that turn, `MessageHeader`/`MessageFooter` are
 * optional slots above/below the content (sender name, timestamp, actions),
 * and `MessageGroup` stacks consecutive `Message` rows from the same
 * conversation. Attribute selectors — each decorates whatever host element the
 * caller writes with the registry class string plus the `data-slot` attribute
 * Force UI's selector-based theming relies on.
 *
 * Usage:
 *   <div uiMessageGroup role="log" aria-live="polite" aria-relevant="additions">
 *     <div uiMessage>
 *       <div uiMessageAvatar>
 *         <span uiAvatar><span uiAvatarFallback aria-hidden="true">AL</span></span>
 *       </div>
 *       <div uiMessageContent>
 *         <div uiMessageHeader>Ada Lovelace</div>
 *         <div uiBubble><div uiBubbleContent>Started the audit pass.</div></div>
 *       </div>
 *     </div>
 *     <div uiMessage align="end">
 *       <div uiMessageContent>
 *         <div uiBubble variant="tinted" align="end">
 *           <div uiBubbleContent>Sounds good, thanks.</div>
 *         </div>
 *         <div uiMessageFooter>Sent 2m ago</div>
 *       </div>
 *     </div>
 *   </div>
 *
 * The avatar fallback is `aria-hidden` here because `MessageHeader` already
 * names the sender in text — without a header, drop the `aria-hidden` (or
 * give the fallback an `aria-label`) so identity isn't silently unannounced.
 *
 * `MessageAvatar` is a positioning wrapper (self-end, rounded, overflow-hidden)
 * — it does not itself implement avatar rendering. Compose the existing
 * `ui/avatar` primitive (`<span uiAvatar>`) inside it rather than hand-rolling
 * an image/fallback (see the reuse-existing-components rule).
 *
 * `align` mirrors a message's side of the conversation ('start' = incoming,
 * 'end' = outgoing) and drives the row's flex direction plus the
 * `group-data-[align=end]/message:` hooks that `MessageContent`/`MessageFooter`
 * key off. `MessageHeader`/`MessageFooter`'s `group-has-data-[variant=ghost]/
 * message:` clause is registry-verbatim and currently inert — `Message` has no
 * `variant` prop in this component set (same forward-compat posture as
 * `bubble`'s inert `group-data-[align=end]/message:` hook, now resolved by
 * this component).
 *
 * Accessibility:
 * - `Message` carries no default role — like `bubble`, speaker identity is
 *   conveyed only by `align` (position); a caller building a real
 *   conversation view should pair each `Message` with a visible or `sr-only`
 *   sender name (WCAG 1.3.1 / 1.4.1), typically in `MessageHeader`.
 * - This primitive has no live-region behavior of its own. A caller rendering
 *   a running conversation is responsible for `aria-live`/`role="log"` on the
 *   `MessageGroup` (or an ancestor list) wrapper (WCAG 4.1.3).
 */

@Component({
  selector: '[uiMessageGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-group',
    '[class]': 'classes()',
  },
})
export class MessageGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('flex min-w-0 flex-col gap-2', this.className()));
}

/** Message alignment — mirrors which side of the conversation the row is on. */
export type MessageAlign = 'start' | 'end';

@Component({
  selector: '[uiMessage]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message',
    '[attr.data-align]': 'align()',
    '[class]': 'classes()',
  },
})
export class MessageComponent {
  readonly align = input<MessageAlign>('start');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiMessageAvatar]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-avatar',
    '[class]': 'classes()',
  },
})
export class MessageAvatarComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // The registry's own class list has a single `group-has-data-[slot=message-footer]/message:-translate-y-8`
      // here — a fixed 32px meant to compensate for a footer's height so a `self-end` avatar re-aligns with the
      // last bubble instead of the taller (footer-including) column. It only cancels out correctly for a
      // single-line text footer (~16px + the 10px `gap-2.5` = 26px needed, so the fixed 32px overshoots by 6px —
      // barely visible). It visibly breaks for the Action-variant footer (a `size="icon"` button row, 32px tall,
      // needing 42px) — the avatar's bottom edge lands 10px short, straddling the bubble/footer boundary instead
      // of sitting flush with the bubble (found via maintainer visual QA, `HeaderAndFooter`/`ActionFooter`
      // stories, not caught by the build gate). Fixed by keying the exact compensation off `MessageFooter`'s
      // `variant` (see below) instead of one fixed value for every footer shape.
      'flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-[[data-slot=message-footer][data-variant=text]]/message:-translate-y-[1.625rem] group-has-[[data-slot=message-footer][data-variant=action]]/message:-translate-y-[2.625rem]',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiMessageContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-content',
    '[class]': 'classes()',
  },
})
export class MessageContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiMessageHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-header',
    '[class]': 'classes()',
  },
})
export class MessageHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiMessageFooter]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-footer',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class MessageFooterComponent {
  /**
   * `text` (default) is a short status caption (a timestamp, "Delivered", …).
   * `action` is a row of icon-only actions (copy / rate), matching the Figma
   * "Variant=Action" footer. Not part of the upstream registry source (which
   * has no variant prop at all) — added so `MessageAvatar`'s sibling
   * `group-has-[...]` selector can compensate for the two footers' different
   * heights precisely instead of guessing with one fixed value (see the
   * `MessageAvatarComponent` comment).
   */
  readonly variant = input<MessageFooterVariant>('text');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
      this.className(),
    ),
  );
}

/** `MessageFooter`'s content shape — see the component doc comment. */
export type MessageFooterVariant = 'text' | 'action';

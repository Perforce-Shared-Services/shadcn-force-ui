import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/app/ui/button';

import {
  attachmentMediaVariants,
  attachmentVariants,
  type AttachmentMediaVariant,
  type AttachmentOrientation,
  type AttachmentSize,
  type AttachmentState,
} from './attachment.variants';

/**
 * Angular port of @force-ui/attachment (radix-force-ui style).
 *
 * A bordered file/media card — leading `AttachmentMedia` (icon or image),
 * `AttachmentContent` (title + description), and a trailing `AttachmentActions`
 * slot. Attribute selectors — each sub-component decorates whatever host
 * element the caller writes with the registry class string plus the
 * `data-slot` attribute Force UI's selector-based theming relies on for
 * parity with the React/Vue/Svelte siblings.
 *
 * Usage:
 *   <div uiAttachment state="uploading" size="default" orientation="horizontal">
 *     <div uiAttachmentMedia variant="icon"><svg aria-hidden="true">…</svg></div>
 *     <div uiAttachmentContent>
 *       <span uiAttachmentTitle>character_turntable.mp4</span>
 *       <span uiAttachmentDescription>4.2 MB · Uploading…</span>
 *     </div>
 *     <div uiAttachmentActions>
 *       <button uiAttachmentAction aria-label="Cancel upload"><svg …></svg></button>
 *     </div>
 *     <button uiAttachmentTrigger aria-label="Open character_turntable.mp4"></button>
 *   </div>
 *
 * `AttachmentTrigger` is an invisible full-cover overlay (`absolute inset-0`)
 * so the whole card is a single click target — layer it last so it sits above
 * the media/content but reserve `AttachmentActions` above it (`z-20` vs the
 * trigger's `z-10`) so per-action buttons (cancel, remove) stay independently
 * clickable. Omit the trigger entirely for a purely informational card.
 *
 * `AttachmentGroup` lays multiple `Attachment`s out as a horizontal snap
 * scroller (composes the shared `scroll-fade-x` utility, same family as
 * `ui/scroll-area`) and is itself a `tabindex="0"` keyboard scroll region
 * (WCAG 2.1.1) — pass `ariaLabel` when it's a meaningful landmark.
 *
 * Accessibility:
 * - Decorative media (a generic file-type glyph) carries `aria-hidden="true"`
 *   on its svg; a thumbnail `<img>` needs empty `alt=""` if purely decorative
 *   or a real description otherwise (WCAG 1.1.1).
 * - `AttachmentAction`/`AttachmentTrigger` are icon-only or invisible —
 *   always give them an `aria-label` naming the action + file (WCAG 4.1.2).
 *   The action's label/icon should reflect what it actually does per state
 *   (Cancel while uploading/processing, Retry on error, Remove once done) —
 *   see `attachment.stories.ts`'s shared template for the pattern.
 * - The host sets `aria-busy="true"` while `uploading`/`processing` (WCAG
 *   4.1.3); pair this with a visually-hidden `role="status"`/`aria-live`
 *   announcement of the state change itself (see the stories) — `aria-busy`
 *   alone doesn't announce, and the processing/uploading `shimmer` on
 *   `AttachmentTitle` is decorative motion only, never the sole signal
 *   (WCAG 1.4.1).
 * - `AttachmentTrigger` carries its own `focus-visible:ring` (not just the
 *   card's thinner `focus-within:ring-1`) since it's the card's primary
 *   click target on the common "whole card opens the file" path (WCAG 2.4.7).
 */
@Component({
  selector: '[uiAttachment]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-orientation]': 'orientation()',
    // WCAG 4.1.3 — an in-progress card announces its busy state to the
    // container's accessibility tree; pairs with the surrounding list's
    // `aria-live` region (see the class doc above), doesn't replace it.
    '[attr.aria-busy]': "state() === 'uploading' || state() === 'processing' ? 'true' : null",
    '[class]': 'classes()',
  },
})
export class AttachmentComponent {
  readonly state = input<AttachmentState>('done');
  readonly size = input<AttachmentSize>('default');
  readonly orientation = input<AttachmentOrientation>('horizontal');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(attachmentVariants({ size: this.size(), orientation: this.orientation() }), this.className()),
  );
}

@Component({
  selector: '[uiAttachmentMedia]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class AttachmentMediaComponent {
  readonly variant = input<AttachmentMediaVariant>('icon');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(attachmentMediaVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiAttachmentContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-content',
    '[class]': 'classes()',
  },
})
export class AttachmentContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiAttachmentTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-title',
    '[class]': 'classes()',
  },
})
export class AttachmentTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiAttachmentDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-description',
    '[class]': 'classes()',
  },
})
export class AttachmentDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // `text-error` (not the registry's `text-destructive/80`) — an opacity
    // hack on the base destructive colour fails WCAG AA (4.3:1 measured via
    // axe against a white surface, need 4.5:1). Same fix as `button.variants`
    // (text/error, AA-verified).
    cn(
      'mt-0.5 block max-w-full min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-error',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiAttachmentActions]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-actions',
    '[class]': 'classes()',
  },
})
export class AttachmentActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1',
      this.className(),
    ),
  );
}

/**
 * `button[uiAttachmentAction]` — a compact ghost icon-button for a per-card
 * action (cancel upload, remove, retry). Mirrors `ui/input-group`'s
 * `InputGroupButtonComponent`: composes `buttonVariants` directly rather than
 * nesting the `[uiButton]` directive, avoiding a second component instance on
 * the same host for what is otherwise a plain Button with different defaults.
 */
@Component({
  selector: 'button[uiAttachmentAction]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-action',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class AttachmentActionComponent {
  readonly variant = input<ButtonVariant>('ghost');
  readonly size = input<ButtonSize>('icon-xs');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );
}

/**
 * `[uiAttachmentTrigger]` — an invisible full-cover click target (`absolute
 * inset-0`) so the whole card opens/selects the file. Host tag is the
 * caller's choice (Angular attribute selectors already provide the
 * `asChild` behaviour the registry uses `Slot` for); when the host IS a
 * native `<button>`, `type` defaults to `"button"` so it never accidentally
 * submits a surrounding form (mirrors `ButtonComponent`'s `isAnchor` host-tag
 * check).
 *
 * Carries its own `focus-visible:ring` (the registry source has none — the
 * card's `focus-within:ring-1` is too thin, half the width of every other
 * focusable primitive in this codebase). Since this element IS the card's
 * sole click target on the common "whole card opens the file" path, WCAG
 * 2.4.7/1.4.11 need a real focus indicator here, not just the parent's. Ring
 * radius matches the card (`rounded-xl`, `rounded-lg` at `size=xs` — see
 * `attachmentVariants`) so it doesn't square off over rounded corners.
 */
@Component({
  selector: '[uiAttachmentTrigger]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-trigger',
    '[attr.type]': "isButton ? (type() ?? 'button') : null",
    '[class]': 'classes()',
  },
})
export class AttachmentTriggerComponent {
  readonly type = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly isButton =
    (inject(ElementRef).nativeElement as HTMLElement).tagName === 'BUTTON';

  protected readonly classes = computed(() =>
    cn(
      'absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[size=xs]/attachment:rounded-lg',
      this.className(),
    ),
  );
}

/**
 * `tabindex="0"` (an app-compat addition, matching `ui/scroll-area`'s
 * viewport) so the row is reachable and scrollable by keyboard (WCAG 2.1.1)
 * even when every card inside it is non-interactive (e.g. a read-only
 * attachment list with no action/trigger). Because that makes it a tab stop,
 * it always carries an accessible name (WCAG 4.1.2): pass `ariaLabel` when
 * the row is a meaningful landmark and it becomes a named `role="region"`
 * (WCAG 1.3.1); omit it and the row falls back to a generic "Attachments"
 * name with no landmark role, so it's never an unnamed focusable element.
 */
@Component({
  selector: '[uiAttachmentGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'attachment-group',
    tabindex: '0',
    '[attr.role]': "ariaLabel() ? 'region' : null",
    '[attr.aria-label]': "ariaLabel() || 'Attachments'",
    '[class]': 'classes()',
  },
})
export class AttachmentGroupComponent {
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
      this.className(),
    ),
  );
}

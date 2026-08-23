import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonSize, type ButtonVariant } from "@/angular-ui/button"

import {
  attachmentMediaVariants,
  attachmentVariants,
  type AttachmentMediaVariant,
  type AttachmentOrientation,
  type AttachmentSize,
  type AttachmentState,
} from "./attachment.variants"

/**
 * Angular port of @force-ui/attachment.
 *
 * A bordered file/media card — leading `AttachmentMedia` (icon or image),
 * `AttachmentContent` (title + description), and a trailing `AttachmentActions`
 * slot. Attribute selectors — each sub-component decorates whatever host
 * element the caller writes with the token classes plus the `data-slot`
 * attribute Force UI's selector-based theming relies on.
 *
 * `AttachmentTrigger` is an invisible full-cover overlay (`absolute inset-0`)
 * so the whole card is a single click target — layer it last so it sits above
 * the media/content but reserve `AttachmentActions` above it (`z-20` vs the
 * trigger's `z-10`) so per-action buttons stay independently clickable. Omit
 * the trigger entirely for a purely informational card.
 *
 * p4one app-compat styling kept at component level (not in the shared CVA):
 * - `focus-visible:ring` on the trigger — the card's thin `focus-within:ring-1`
 *   is not a sufficient indicator for the card's primary click target
 *   (WCAG 2.4.7); ring radius follows the card (`rounded-xl`, `rounded-lg` at xs).
 * - `tabindex="0"` + accessible name on `AttachmentGroup` so the scroller is
 *   keyboard-operable (WCAG 2.1.1) even when its cards are non-interactive.
 */
const ATTACHMENT_TEMPLATE = "attachment.component.html"

@Component({
  selector: "[uiAttachment]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment",
    "[attr.data-state]": "state()",
    "[attr.data-size]": "size()",
    "[attr.data-orientation]": "orientation()",
    // WCAG 4.1.3 — an in-progress card announces its busy state to the
    // container's accessibility tree; pair with a surrounding aria-live region.
    "[attr.aria-busy]": "state() === 'uploading' || state() === 'processing' ? 'true' : null",
    "[class]": "classes()",
  },
})
export class AttachmentComponent {
  readonly state = input<AttachmentState>("done")
  readonly size = input<AttachmentSize>("default")
  readonly orientation = input<AttachmentOrientation>("horizontal")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      attachmentVariants({ size: this.size(), orientation: this.orientation() }),
      this.className(),
    ),
  )
}

@Component({
  selector: "[uiAttachmentMedia]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-media",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class AttachmentMediaComponent {
  readonly variant = input<AttachmentMediaVariant>("icon")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(attachmentMediaVariants({ variant: this.variant() }), this.className()),
  )
}

@Component({
  selector: "[uiAttachmentContent]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-content",
    "[class]": "classes()",
  },
})
export class AttachmentContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-content max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
      this.className(),
    ),
  )
}

@Component({
  selector: "[uiAttachmentTitle]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-title",
    "[class]": "classes()",
  },
})
export class AttachmentTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-title block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
      this.className(),
    ),
  )
}

@Component({
  selector: "[uiAttachmentDescription]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-description",
    "[class]": "classes()",
  },
})
export class AttachmentDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-description block max-w-full min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
      this.className(),
    ),
  )
}

@Component({
  selector: "[uiAttachmentActions]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-actions",
    "[class]": "classes()",
  },
})
export class AttachmentActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-actions relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
      this.className(),
    ),
  )
}

/**
 * `button[uiAttachmentAction]` — a compact ghost icon-button for a per-card
 * action (cancel upload, remove, retry). Composes `buttonVariants` directly
 * rather than nesting `[uiButton]`, avoiding a second component instance on
 * the same host (same pattern as input-group's InputGroupButton).
 */
@Component({
  selector: "button[uiAttachmentAction]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-action",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class AttachmentActionComponent {
  readonly variant = input<ButtonVariant>("ghost")
  readonly size = input<ButtonSize>("icon-xs")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "cn-attachment-action",
      this.className(),
    ),
  )
}

/**
 * `[uiAttachmentTrigger]` — an invisible full-cover click target so the whole
 * card opens/selects the file. Host tag is the caller's choice (attribute
 * selectors already provide the `asChild` behaviour React needs `Slot` for);
 * when the host IS a native `<button>`, `type` defaults to `"button"`.
 */
@Component({
  selector: "[uiAttachmentTrigger]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-trigger",
    "[attr.type]": "isButton ? (type() ?? 'button') : null",
    "[class]": "classes()",
  },
})
export class AttachmentTriggerComponent {
  readonly type = input<string | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly isButton =
    (inject(ElementRef).nativeElement as HTMLElement).tagName === "BUTTON"

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-trigger rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[size=xs]/attachment:rounded-lg motion-reduce:transition-none",
      this.className(),
    ),
  )
}

/**
 * `tabindex="0"` so the row is reachable and scrollable by keyboard
 * (WCAG 2.1.1) even when every card inside is non-interactive; always carries
 * an accessible name (WCAG 4.1.2) — pass `ariaLabel` for a meaningful landmark
 * (`role="region"`), otherwise falls back to a generic "Attachments".
 */
@Component({
  selector: "[uiAttachmentGroup]",
  standalone: true,
  templateUrl: ATTACHMENT_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "attachment-group",
    tabindex: "0",
    "[attr.role]": "ariaLabel() ? 'region' : null",
    "[attr.aria-label]": "ariaLabel() || 'Attachments'",
    "[class]": "classes()",
  },
})
export class AttachmentGroupComponent {
  readonly ariaLabel = input<string | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none overflow-x-auto overscroll-x-contain py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
      this.className(),
    ),
  )
}

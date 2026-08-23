import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "../../lib/utils"

import {
  messageAvatarVariants,
  messageContentVariants,
  messageFooterVariants,
  messageGroupVariants,
  messageHeaderVariants,
  messageVariants,
  type MessageAlign,
  type MessageFooterVariant,
} from "./message.variants"

/**
 * Chat message row. `Message` is the layout/alignment container (typically
 * one `MessageAvatar` + one `MessageContent`), `MessageHeader`/`MessageFooter`
 * are optional slots above/below the content, `MessageGroup` stacks
 * consecutive rows.
 *
 * `align` mirrors the message's side ('start' = incoming, 'end' = outgoing).
 * Speaker identity is conveyed by position only — pair each `Message` with a
 * visible or `sr-only` sender name (WCAG 1.3.1/1.4.1), typically in
 * `MessageHeader`. This primitive has no live-region behavior of its own; a
 * caller rendering a running conversation is responsible for
 * `aria-live`/`role="log"` on the wrapper (WCAG 4.1.3).
 *
 * `MessageAvatar` is a positioning wrapper — compose the existing
 * `<span uiAvatar>` primitive inside it rather than hand-rolling an image.
 */
@Component({
  selector: "[uiMessageGroup]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-group",
    "[class]": "classes()",
  },
})
export class MessageGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageGroupVariants(), this.className())
  )
}

@Component({
  selector: "[uiMessage]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message",
    "[attr.data-align]": "align()",
    "[class]": "classes()",
  },
})
export class MessageComponent {
  readonly align = input<MessageAlign>("start")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageVariants({ align: this.align() }), this.className())
  )
}

@Component({
  selector: "[uiMessageAvatar]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-avatar",
    "[class]": "classes()",
  },
})
export class MessageAvatarComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageAvatarVariants(), this.className())
  )
}

@Component({
  selector: "[uiMessageContent]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-content",
    "[class]": "classes()",
  },
})
export class MessageContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageContentVariants(), this.className())
  )
}

@Component({
  selector: "[uiMessageHeader]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-header",
    "[class]": "classes()",
  },
})
export class MessageHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageHeaderVariants(), this.className())
  )
}

@Component({
  selector: "[uiMessageFooter]",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-footer",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class MessageFooterComponent {
  /**
   * "text" (default) is a short status caption; "action" is a row of icon
   * actions. Lets `MessageAvatar`'s height compensation key off the footer's
   * real shape instead of one fixed value.
   */
  readonly variant = input<MessageFooterVariant>("text")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageFooterVariants(), this.className())
  )
}

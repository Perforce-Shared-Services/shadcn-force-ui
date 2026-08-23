import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from "@angular/core"

import { cn } from "../../lib/utils"

import { injectMessageScroller } from "./message-scroller-provider.component"
import { messageScrollerItemClass } from "./message-scroller.variants"

/**
 * One scrollable row. `messageId` is the stable identifier
 * `scrollToMessage()` and the visibility tracking key off. `scrollAnchor`
 * marks a row that should settle near the viewport's leading edge when it
 * becomes the newest turn (`currentAnchorId` /
 * `defaultScrollPosition: 'last-anchor'`).
 */
@Component({
  selector: "[uiMessageScrollerItem]",
  standalone: true,
  templateUrl: "./message-scroller-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-scroller-item",
    "[attr.data-message-id]": "messageId() ?? null",
    "[attr.data-scroll-anchor]": "scrollAnchor() ? '' : null",
    "[class]": "classes()",
  },
})
export class MessageScrollerItemComponent {
  readonly messageId = input<string | undefined>(undefined)
  readonly scrollAnchor = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly scroller = injectMessageScroller()

  constructor() {
    const el = inject(ElementRef).nativeElement as HTMLElement
    // Capture at construction — document order guarantees the provider and
    // viewport are registered before any item initializes.
    this.scroller.observeItem(el, this.messageId(), this.scrollAnchor())
    inject(DestroyRef).onDestroy(() => this.scroller.unobserveItem(el, this.messageId()))
  }

  protected readonly classes = computed(() =>
    cn(messageScrollerItemClass, this.className())
  )
}

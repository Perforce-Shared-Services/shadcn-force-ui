import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "../../lib/utils"
import { buttonVariants, type ButtonSize, type ButtonVariant } from "../button"

import { MESSAGE_SCROLLER_ARROW_SVG } from "./message-scroller.icons"
import { injectMessageScroller } from "./message-scroller-provider.component"
import { messageScrollerButtonClass } from "./message-scroller.variants"

/** Which edge this button scrolls toward. Mirrors the registry's `direction` prop. */
export type MessageScrollerButtonDirection = "start" | "end"

/**
 * Floating scroll-to-edge button. Renders real `ui/button` classes (default
 * `variant="secondary" size="icon-sm"`) with the registry-verbatim override
 * string that turns it into the floating outline look.
 *
 * `data-active` is derived live from `canScrollToEnd`/`canScrollToStart`;
 * when inactive it is hidden from the accessibility tree and unfocusable.
 */
@Component({
  selector: "[uiMessageScrollerButton]",
  standalone: true,
  templateUrl: "./message-scroller-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-scroller-button",
    "[attr.data-direction]": "direction()",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[attr.data-active]": "isActive() ? 'true' : 'false'",
    "[attr.tabindex]": "isActive() ? null : '-1'",
    "[attr.aria-hidden]": "isActive() ? null : 'true'",
    "[class]": "classes()",
    "(click)": "onClick()",
  },
})
export class MessageScrollerButtonComponent {
  readonly direction = input<MessageScrollerButtonDirection>("end")
  readonly variant = input<ButtonVariant>("secondary")
  readonly size = input<ButtonSize>("icon-sm")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly scroller = injectMessageScroller()

  protected readonly isActive = computed(() =>
    this.direction() === "end" ? this.scroller.canScrollToEnd() : this.scroller.canScrollToStart()
  )

  protected readonly arrowIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    MESSAGE_SCROLLER_ARROW_SVG
  )

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      messageScrollerButtonClass,
      this.className()
    )
  )

  protected onClick(): void {
    if (this.direction() === "end") {
      this.scroller.scrollToEnd()
    } else {
      this.scroller.scrollToStart()
    }
  }
}

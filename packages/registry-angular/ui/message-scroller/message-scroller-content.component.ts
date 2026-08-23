import {
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
import { messageScrollerContentClass } from "./message-scroller.variants"

/**
 * Watches its own rendered height with a `ResizeObserver` — the single
 * signal covering both ways new content arrives: an appended item, or
 * streaming text growing. The first callback (initial layout) is recorded as
 * baseline and never notifies, so it cannot override a `defaultScrollPosition`
 * of `start`/`last-anchor`.
 *
 * `role="log"` + `aria-live="polite"` + `aria-relevant="additions"`: this is
 * the element whose observer detects new turns, so it carries the live-region
 * responsibility by default (WCAG 4.1.3); only new turns are announced.
 */
@Component({
  selector: "[uiMessageScrollerContent]",
  standalone: true,
  templateUrl: "./message-scroller-content.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-scroller-content",
    role: "log",
    "aria-live": "polite",
    "aria-relevant": "additions",
    "[class]": "classes()",
  },
})
export class MessageScrollerContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly scroller = injectMessageScroller()
  private lastHeight = 0
  private hasMeasuredOnce = false

  constructor() {
    const el = inject(ElementRef).nativeElement as HTMLElement
    this.scroller.registerContent(el)

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height
      if (this.hasMeasuredOnce && height > this.lastHeight) {
        this.scroller.onContentGrew()
      }
      this.hasMeasuredOnce = true
      this.lastHeight = height
    })
    observer.observe(el)
    inject(DestroyRef).onDestroy(() => observer.disconnect())
  }

  protected readonly classes = computed(() =>
    cn(messageScrollerContentClass, this.className())
  )
}

import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from "@angular/core"

import { cn } from "../../lib/utils"

import { injectMessageScroller } from "./message-scroller-provider.component"
import { messageScrollerViewportClass } from "./message-scroller.variants"

/**
 * The native-scrolling element. Registers with the provider, forwards
 * `scroll` events for edge tracking, applies `defaultScrollPosition` once
 * after first render.
 *
 * `tabindex="0"` keeps the viewport keyboard-operable (WCAG 2.1.1); when
 * `ariaLabel` is set it becomes a labelled `role="region"` (WCAG 4.1.2 /
 * 1.3.1), defaulting to "Conversation".
 */
@Component({
  selector: "[uiMessageScrollerViewport]",
  standalone: true,
  templateUrl: "./message-scroller-viewport.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-scroller-viewport",
    tabindex: "0",
    "[attr.role]": "ariaLabel() ? 'region' : null",
    "[attr.aria-label]": 'ariaLabel() || "Conversation"',
    "[attr.data-autoscrolling]": "scroller.isAutoScrolling() ? '' : null",
    "[class]": "classes()",
    "(scroll)": "scroller.onViewportScroll()",
  },
})
export class MessageScrollerViewportComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  /** Accessible name; when set the viewport becomes a labelled `role="region"`. */
  readonly ariaLabel = input<string | undefined>(undefined)

  protected readonly scroller = injectMessageScroller()

  constructor() {
    this.scroller.registerViewport(inject(ElementRef).nativeElement as HTMLElement)
    afterNextRender(() => this.scroller.applyInitialScrollPosition())
  }

  protected readonly classes = computed(() =>
    cn(messageScrollerViewportClass, this.className())
  )
}

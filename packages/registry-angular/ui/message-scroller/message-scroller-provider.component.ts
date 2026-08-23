import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  InjectionToken,
  input,
  signal,
} from "@angular/core"

import { cn } from "../../lib/utils"

import { messageScrollerRootClass } from "./message-scroller.variants"

/**
 * Where the viewport settles when a `MessageScroller` first mounts. Mirrors
 * the registry's `defaultScrollPosition` prop.
 */
export enum MessageScrollerScrollPosition {
  Start = "start",
  End = "end",
  LastAnchor = "last-anchor",
}

const AT_EDGE_THRESHOLD_PX = 24
/** Safety net if the browser never fires `scrollend` (matches the button's own 400ms exit duration). */
const AUTO_SCROLL_SETTLE_MS = 500

/**
 * DI token descendant parts inject to reach the provider — Angular's answer
 * to the registry's `MessageScrollerContext` / `useMessageScroller()`.
 */
export const MESSAGE_SCROLLER_CONTEXT = new InjectionToken<MessageScrollerProviderComponent>(
  "MessageScrollerContext"
)

export function injectMessageScroller(): MessageScrollerProviderComponent {
  const ctx = inject(MESSAGE_SCROLLER_CONTEXT, { optional: true })
  if (!ctx) {
    throw new Error(
      "injectMessageScroller() must be used within a MessageScrollerProvider ([uiMessageScrollerProvider])."
    )
  }
  return ctx
}

/**
 * Angular port of the message-scroller `Provider` plus its three hooks
 * (`useMessageScroller`, `useMessageScrollerScrollable`,
 * `useMessageScrollerVisibility`) collapsed into one injected context —
 * hand-ported natively because there is no headless auto-scroll primitive
 * with an Angular equivalent (same call as scroll-area/input-otp/stepper).
 *
 * Rather than exposing three separate hook functions, every descendant reads
 * this one instance: scrollToMessage/scrollToEnd/scrollToStart,
 * canScrollToStart/canScrollToEnd, currentAnchorId/visibleMessageIds.
 */
@Component({
  selector: "[uiMessageScrollerProvider]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MESSAGE_SCROLLER_CONTEXT,
      useExisting: forwardRef(() => MessageScrollerProviderComponent),
    },
  ],
})
export class MessageScrollerProviderComponent {
  /** Keep following newly appended/growing content while the reader is at the live edge. */
  readonly autoScroll = input(true)
  /** Where the viewport settles on first mount. */
  readonly defaultScrollPosition = input<MessageScrollerScrollPosition>(
    MessageScrollerScrollPosition.End
  )
  /** Pixels of the previous item kept visible above a newly settled anchor turn. */
  readonly scrollPreviousItemPeek = input(24)

  private viewportEl: HTMLElement | null = null
  private contentEl: HTMLElement | null = null
  private lastAnchorId: string | null = null
  private autoScrollSettleTimer: ReturnType<typeof setTimeout> | undefined

  private readonly isAtStartSignal = signal(true)
  private readonly isAtEndSignal = signal(true)
  private readonly isAutoScrollingSignal = signal(false)
  private readonly currentAnchorIdSignal = signal<string | null>(null)
  private readonly visibleMessageIdsSignal = signal<ReadonlySet<string>>(new Set())

  /** Is the viewport scrolled (within threshold) to its start/end edge. */
  readonly isAtStart = this.isAtStartSignal.asReadonly()
  readonly isAtEnd = this.isAtEndSignal.asReadonly()
  /** True while a programmatic `scrollTo` triggered by this service is in flight. */
  readonly isAutoScrolling = this.isAutoScrollingSignal.asReadonly()
  /** The registered-anchor item nearest the viewport's leading edge. */
  readonly currentAnchorId = this.currentAnchorIdSignal.asReadonly()
  /** Every item currently intersecting the viewport, by `messageId`. */
  readonly visibleMessageIds = this.visibleMessageIdsSignal.asReadonly()

  readonly canScrollToStart = computed(() => !this.isAtStart())
  readonly canScrollToEnd = computed(() => !this.isAtEnd())

  private visibilityObserver: IntersectionObserver | null = null
  private readonly visibleRatios = new Map<string, number>()
  private readonly anchorItems = new Set<string>()

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.visibilityObserver?.disconnect()
      clearTimeout(this.autoScrollSettleTimer)
    })
  }

  registerViewport(el: HTMLElement): void {
    this.viewportEl = el
  }

  registerContent(el: HTMLElement): void {
    this.contentEl = el
  }

  /** Called by `MessageScrollerViewport` on every native `scroll` event. */
  onViewportScroll(): void {
    this.updateEdgeState()
  }

  /** Called by `MessageScrollerContent` whenever its rendered size grows (new items, streaming text). */
  onContentGrew(): void {
    if (this.autoScroll() && this.isAtEnd()) {
      this.scrollToEnd(false)
    }
  }

  /**
   * Applies `defaultScrollPosition` once, after the initial layout has
   * settled. Always finishes with a forced `updateEdgeState()` — scrolling to
   * `start` when already at `scrollTop: 0` fires no native `scroll` event,
   * which would otherwise leave the edge signals at their pre-layout default.
   */
  applyInitialScrollPosition(): void {
    switch (this.defaultScrollPosition()) {
      case MessageScrollerScrollPosition.Start:
        this.scrollToStart(false)
        break
      case MessageScrollerScrollPosition.LastAnchor:
        if (this.lastAnchorId) {
          this.scrollToMessage(this.lastAnchorId, false)
          break
        }
        this.scrollToEnd(false)
        break
      case MessageScrollerScrollPosition.End:
      default:
        this.scrollToEnd(false)
    }
    this.updateEdgeState()
  }

  scrollToEnd(smooth = true): void {
    this.runAutoScroll((el) =>
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" })
    )
  }

  scrollToStart(smooth = true): void {
    this.runAutoScroll((el) => el.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" }))
  }

  scrollToMessage(messageId: string, smooth = true): void {
    const target = this.contentEl?.querySelector<HTMLElement>(
      `[data-message-id="${messageId}"]`
    )
    if (!target) {
      return
    }
    this.runAutoScroll((el) => {
      const top = Math.max(0, target.offsetTop - this.scrollPreviousItemPeek())
      el.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })
    })
  }

  private runAutoScroll(scroll: (viewport: HTMLElement) => void): void {
    const el = this.viewportEl
    if (!el) {
      return
    }
    this.isAutoScrollingSignal.set(true)
    clearTimeout(this.autoScrollSettleTimer)
    const settle = () => {
      el.removeEventListener("scrollend", settle)
      clearTimeout(this.autoScrollSettleTimer)
      this.isAutoScrollingSignal.set(false)
    }
    el.addEventListener("scrollend", settle)
    this.autoScrollSettleTimer = setTimeout(settle, AUTO_SCROLL_SETTLE_MS)
    scroll(el)
  }

  /** Registers a `MessageScrollerItem` for visibility/anchor tracking. Call from `ngOnInit`. */
  observeItem(el: HTMLElement, messageId: string | undefined, isAnchor: boolean): void {
    if (isAnchor && messageId) {
      this.anchorItems.add(messageId)
      this.lastAnchorId = messageId
    }
    this.ensureVisibilityObserver().observe(el)
  }

  /** Unregisters a `MessageScrollerItem`. Call from `ngOnDestroy`. */
  unobserveItem(el: HTMLElement, messageId: string | undefined): void {
    this.visibilityObserver?.unobserve(el)
    if (messageId) {
      this.visibleRatios.delete(messageId)
      this.anchorItems.delete(messageId)
      this.recomputeVisibility()
    }
  }

  private ensureVisibilityObserver(): IntersectionObserver {
    if (!this.visibilityObserver) {
      this.visibilityObserver = new IntersectionObserver(
        (entries) => this.onIntersect(entries),
        { root: this.viewportEl, threshold: [0, 0.5, 1] }
      )
    }
    return this.visibilityObserver
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const id = (entry.target as HTMLElement).dataset.messageId
      if (!id) {
        continue
      }
      this.visibleRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
    }
    this.recomputeVisibility()
  }

  private recomputeVisibility(): void {
    const visible = new Set<string>()
    for (const [id, ratio] of this.visibleRatios) {
      if (ratio > 0) {
        visible.add(id)
      }
    }
    this.visibleMessageIdsSignal.set(visible)

    let closestId: string | null = null
    let closestRatio = 0
    for (const id of this.anchorItems) {
      const ratio = this.visibleRatios.get(id) ?? 0
      if (ratio > closestRatio) {
        closestId = id
        closestRatio = ratio
      }
    }
    this.currentAnchorIdSignal.set(closestId)
  }

  private updateEdgeState(): void {
    const el = this.viewportEl
    if (!el) {
      return
    }
    this.isAtStartSignal.set(el.scrollTop <= AT_EDGE_THRESHOLD_PX)
    this.isAtEndSignal.set(
      el.scrollHeight - el.scrollTop - el.clientHeight <= AT_EDGE_THRESHOLD_PX
    )
  }
}

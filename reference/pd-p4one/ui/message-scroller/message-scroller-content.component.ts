import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { injectMessageScroller } from './message-scroller-provider.component';

/**
 * Angular port of @force-ui/message-scroller's `MessageScrollerContent`.
 *
 * Registers itself with the provider (so `scrollToMessage` can query
 * `[data-message-id]` descendants) and watches its own rendered height with
 * a `ResizeObserver` — the single signal that covers both ways new content
 * arrives in a chat: a whole new `MessageScrollerItem` appended, or an
 * existing item's text growing while streaming. The very first callback
 * (which always fires once on `observe()`, reporting the initial layout
 * rather than any real growth) is recorded as the baseline and never
 * notifies — otherwise it races `MessageScrollerViewport`'s own
 * initial-scroll-position pass and can override a `defaultScrollPosition`
 * of `start`/`last-anchor` back to the bottom.
 *
 * `role="log"` + `aria-live="polite"` + `aria-relevant="additions"` (added on
 * audit, 2026-08-18): `ui/message`'s own contract documents that "a caller
 * rendering a running conversation is responsible for `aria-live`/
 * `role="log"` on the ... wrapper (WCAG 4.1.3)" — this component IS that
 * caller (it's the exact element whose `ResizeObserver` already detects new
 * turns arriving), so it takes on the responsibility by default rather than
 * pushing it onto every consumer. `aria-relevant="additions"` (not `"all"`)
 * so only new turns are announced, not a re-read of the whole transcript on
 * every mutation.
 */
@Component({
  selector: '[uiMessageScrollerContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-scroller-content',
    role: 'log',
    'aria-live': 'polite',
    'aria-relevant': 'additions',
    '[class]': 'classes()',
  },
})
export class MessageScrollerContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly scroller = injectMessageScroller();
  private lastHeight = 0;
  private hasMeasuredOnce = false;

  constructor() {
    const el = inject(ElementRef).nativeElement as HTMLElement;
    this.scroller.registerContent(el);

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (this.hasMeasuredOnce && height > this.lastHeight) {
        this.scroller.onContentGrew();
      }
      this.hasMeasuredOnce = true;
      this.lastHeight = height;
    });
    observer.observe(el);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  protected readonly classes = computed(() => cn('flex h-max min-h-full flex-col gap-6', this.className()));
}

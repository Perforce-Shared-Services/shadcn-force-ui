import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { injectMessageScroller } from './message-scroller-provider.component';

/**
 * Angular port of @force-ui/message-scroller's `MessageScrollerViewport`.
 *
 * The actual native-scrolling element. Registers itself with the provider on
 * construction (document order guarantees this runs before any descendant
 * `MessageScrollerItem`'s `ngOnInit`), forwards `scroll` events for
 * start/end-edge tracking, and applies `defaultScrollPosition` once after the
 * first render.
 *
 * Parity gap (documented, maintainer-approved 2026-08-18): the registry
 * string is `scrollbar-thin scrollbar-gutter-stable` plus
 * `data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent`
 * — none of those scrollbar utilities exist in this app's Tailwind build (no
 * `tailwind-scrollbar` plugin). Swapped for the app's own `scrollbar-overlay`
 * token utility, the same substitution already made for `select` / `command`
 * / `scroll-area`'s scrollable panels. `scrollbar-gutter: stable` is kept as
 * a literal arbitrary property (plain CSS, not a color token). The
 * `data-autoscrolling` scrollbar-hiding effect itself is dropped — cosmetic
 * only, `data-autoscrolling` is still emitted on the host for anything else
 * that wants to key off it.
 *
 * Accessibility: `tabindex="0"` makes the viewport reachable and operable by
 * keyboard (arrow keys scroll it, WCAG 2.1.1) — a native-scroll region with
 * no host affordance of its own is otherwise mouse/trackpad-only, the same
 * gap `scroll-area` already closes. Because that makes it a tab stop, it
 * always carries an accessible name (WCAG 4.1.2): pass `ariaLabel` to name a
 * specific conversation and the viewport becomes a labelled `role="region"`
 * (WCAG 1.3.1); the default keeps every existing usage correctly named
 * without a required prop.
 */
@Component({
  selector: '[uiMessageScrollerViewport]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-scroller-viewport',
    tabindex: '0',
    '[attr.role]': "ariaLabel() ? 'region' : null",
    '[attr.aria-label]': 'ariaLabel() || "Conversation"',
    '[attr.data-autoscrolling]': "scroller.isAutoScrolling() ? '' : null",
    '[class]': 'classes()',
    '(scroll)': 'scroller.onViewportScroll()',
  },
})
export class MessageScrollerViewportComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Accessible name; when set the viewport becomes a labelled `role="region"`. */
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly scroller = injectMessageScroller();

  constructor() {
    this.scroller.registerViewport(inject(ElementRef).nativeElement as HTMLElement);
    afterNextRender(() => this.scroller.applyInitialScrollPosition());
  }

  protected readonly classes = computed(() =>
    cn(
      'size-full min-h-0 min-w-0 scroll-fade-b scrollbar-overlay [scrollbar-gutter:stable] overflow-y-auto overscroll-contain contain-content outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 motion-reduce:transition-none',
      this.className(),
    ),
  );
}

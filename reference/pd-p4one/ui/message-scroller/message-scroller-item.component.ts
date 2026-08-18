import {
  booleanAttribute,
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
 * Angular port of @force-ui/message-scroller's `MessageScrollerItem`.
 *
 * `messageId` is the stable identifier `scrollToMessage()` and the
 * visibility tracking key off — set it on any item you want addressable.
 * `scrollAnchor` marks a row that should settle near the viewport's leading
 * edge when it becomes the newest turn (see `MessageScrollerProvider`'s
 * `currentAnchorId` / `defaultScrollPosition: 'last-anchor'`).
 */
@Component({
  selector: '[uiMessageScrollerItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-scroller-item',
    '[attr.data-message-id]': 'messageId() ?? null',
    '[attr.data-scroll-anchor]': "scrollAnchor() ? '' : null",
    '[class]': 'classes()',
  },
})
export class MessageScrollerItemComponent {
  readonly messageId = input<string | undefined>(undefined);
  readonly scrollAnchor = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly scroller = injectMessageScroller();

  constructor() {
    const el = inject(ElementRef).nativeElement as HTMLElement;
    this.scroller.observeItem(el, this.messageId(), this.scrollAnchor());
    inject(DestroyRef).onDestroy(() => this.scroller.unobserveItem(el, this.messageId()));
  }

  protected readonly classes = computed(() =>
    cn('min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]', this.className()),
  );
}

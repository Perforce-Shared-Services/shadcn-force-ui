import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, type OnInit } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { buttonVariants } from '@/app/ui/button';

import { CarouselRootService } from './carousel-root.service';
import { CAROUSEL_PREVIOUS_SVG } from './carousel.icons';

/**
 * Angular port of @force-ui/carousel (radix-force-ui style) — "Previous"
 * control.
 *
 * Attribute selector on a native `<button>`. The registry source defaults
 * this to `Button` (`variant="outline"`, `size="icon-sm"`) — but the real
 * Figma "Carousel / Arrow Button" component (verified 2026-08-18) renders it
 * at 32×32 (`h-8 w-8`), which is `size="icon"` in this app's button scale
 * (`icon-sm` is 28px). Reproduced directly via the shared `buttonVariants`
 * cva (Angular can't stack two `@Component`s on one host), the same
 * technique `pagination-previous` already uses. Native `disabled` (not
 * `aria-disabled`) is correct here — the host is always a real `<button>`.
 *
 * The Figma Disabled state shows a plain `opacity-50`, but this intentionally
 * does NOT mirror that — `buttonVariants`' own disabled treatment
 * (`bg-muted`/`text-muted-foreground`, no opacity) is a deliberate, already-
 * shipped DS decision (see `button.variants.ts`), and the Figma frame
 * predates that fix. Confirmed with the maintainer to keep parity with
 * `ui/button` here rather than the stale Figma opacity.
 *
 * Registers its own element with `CarouselRootService` on init so the
 * service can move focus off it when it becomes disabled out from under a
 * focused keyboard user (see the service's `moveFocusAwayFrom`).
 */
@Component({
  selector: '[uiCarouselPrevious]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
    <span class="sr-only">Previous slide</span>
  `,
  host: {
    'data-slot': 'carousel-previous',
    '[class]': 'classes()',
    '[attr.disabled]': "!carousel.canScrollPrev() ? '' : null",
    '(click)': 'carousel.scrollPrev()',
  },
})
export class CarouselPreviousComponent implements OnInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly carousel = inject(CarouselRootService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CAROUSEL_PREVIOUS_SVG,
  );

  ngOnInit(): void {
    this.carousel.registerPreviousEl(this.elementRef.nativeElement);
  }

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'icon' }),
      'absolute touch-manipulation rounded-full',
      this.carousel.orientation() === 'horizontal'
        ? 'inset-y-0 -left-12 my-auto'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      this.className(),
    ),
  );
}

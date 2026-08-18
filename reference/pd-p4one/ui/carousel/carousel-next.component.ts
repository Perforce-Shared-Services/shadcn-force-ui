import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, type OnInit } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { buttonVariants } from '@/app/ui/button';

import { CarouselRootService } from './carousel-root.service';
import { CAROUSEL_NEXT_SVG } from './carousel.icons';

/**
 * Angular port of @force-ui/carousel (radix-force-ui style) — "Next" control.
 * See `carousel-previous.component.ts` for the shared rationale (32×32
 * `size="icon"` per the real Figma component vs. the registry's `icon-sm`
 * default; disabled stays `buttonVariants`' own treatment, not Figma's
 * opacity-50).
 */
@Component({
  selector: '[uiCarouselNext]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
    <span class="sr-only">Next slide</span>
  `,
  host: {
    'data-slot': 'carousel-next',
    '[class]': 'classes()',
    '[attr.disabled]': "!carousel.canScrollNext() ? '' : null",
    '(click)': 'carousel.scrollNext()',
  },
})
export class CarouselNextComponent implements OnInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly carousel = inject(CarouselRootService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CAROUSEL_NEXT_SVG,
  );

  ngOnInit(): void {
    this.carousel.registerNextEl(this.elementRef.nativeElement);
  }

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'icon' }),
      'absolute touch-manipulation rounded-full',
      this.carousel.orientation() === 'horizontal'
        ? 'inset-y-0 -right-12 my-auto'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      this.className(),
    ),
  );
}

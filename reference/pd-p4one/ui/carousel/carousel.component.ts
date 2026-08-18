import { Component, effect, ElementRef, inject, input, type OnInit, output } from '@angular/core';
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

import { cn } from '@/app/lib/utils';

import { CarouselRootService, type CarouselApi, type CarouselOrientation } from './carousel-root.service';

/**
 * Angular port of @force-ui/carousel (radix-force-ui style) — root.
 *
 * There is no `@radix-ng/primitives` carousel, and the registry itself has no
 * radix/base-ui primitive underneath it either — the React source hand-rolls
 * everything on top of `embla-carousel-react`. This port uses the vanilla
 * `embla-carousel` core package (framework-agnostic, no React) instead of the
 * React wrapper, driving it imperatively from `CarouselContent`. Shared state
 * (orientation, the live embla API, `canScrollPrev`/`canScrollNext`) lives in
 * `CarouselRootService`, provided here — the same shape `combobox` and
 * `command` already use for a store with no primitive to lean on.
 *
 * Attribute selector — usage:
 *   <div uiCarousel>
 *     <div uiCarouselContent>
 *       <div uiCarouselItem>...</div>
 *       <div uiCarouselItem>...</div>
 *     </div>
 *     <button uiCarouselPrevious></button>
 *     <button uiCarouselNext></button>
 *   </div>
 *
 * `role="region"` + `aria-roledescription="carousel"` matches the registry
 * exactly (WCAG 4.1.2 — names the interaction pattern for AT, not just its
 * generic landmark role). A `region` landmark needs an accessible name to be
 * reliably exposed as a landmark at all (WCAG 4.1.2 / APG carousel pattern) —
 * this component doesn't own that text, so pass a plain `aria-label` on the
 * same host element the directive is applied to, same as any native
 * attribute: `<div uiCarousel aria-label="Featured screenshots">`.
 *
 * `tabindex="-1"` on the host is a programmatic-only focus target (never a
 * tab stop) — see `CarouselRootService`'s focus-management effects, which
 * land here when a keyboard user scrolls to an end where BOTH arrow buttons
 * are disabled (audit finding, 2026-08-18).
 */
@Component({
  selector: '[uiCarousel]',
  standalone: true,
  template: '<ng-content />',
  providers: [CarouselRootService],
  host: {
    role: 'region',
    'aria-roledescription': 'carousel',
    'data-slot': 'carousel',
    tabindex: '-1',
    '[class]': 'classes()',
    '(keydown)': 'carousel.handleKeydown($event)',
  },
})
export class CarouselComponent implements OnInit {
  readonly orientation = input<CarouselOrientation>('horizontal');
  readonly opts = input<EmblaOptionsType | undefined>(undefined);
  readonly plugins = input<EmblaPluginType[] | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Emits the embla API once `CarouselContent` creates it (registry `setApi`). */
  readonly apiChange = output<CarouselApi>();

  protected readonly carousel = inject(CarouselRootService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly classes = () => cn('relative', this.className());

  constructor() {
    // `effect()` flushes asynchronously (after this tick's CD), but
    // `CarouselContent.ngAfterViewInit` creates the embla instance
    // synchronously within THIS tick, reading these same signals for the
    // initial axis/opts/plugins — so the effect alone would lose the race on
    // first render. `ngOnInit` seeds the values synchronously (it always runs
    // before any child's `ngAfterViewInit` in the same pass); the effects
    // below keep the store in sync with any later input changes.
    effect(() => this.carousel.orientation.set(this.orientation()));
    effect(() => this.carousel.opts.set(this.opts()));
    effect(() => this.carousel.plugins.set(this.plugins()));
    effect(() => {
      const api = this.carousel.api();
      if (api) {
        this.apiChange.emit(api);
      }
    });
  }

  ngOnInit(): void {
    this.carousel.orientation.set(this.orientation());
    this.carousel.opts.set(this.opts());
    this.carousel.plugins.set(this.plugins());
    this.carousel.registerContainerEl(this.elementRef.nativeElement);
  }
}

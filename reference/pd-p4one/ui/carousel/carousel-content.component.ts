import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  type OnDestroy,
  ViewChild,
} from '@angular/core';
import EmblaCarousel from 'embla-carousel';

import { cn } from '@/app/lib/utils';

import { CarouselRootService } from './carousel-root.service';

/**
 * Angular port of @force-ui/carousel (radix-force-ui style) — content.
 *
 * Element selector: the registry renders TWO nested divs here (an outer
 * `overflow-hidden` embla viewport holding the `carouselRef`, and an inner
 * `flex` track that receives the caller's `className`) — a shape an attribute
 * selector on one host element can't produce (Angular can't stack two
 * `@Component`s, or one component's extra wrapper, onto a single tag). `host:
 * { class: 'contents' }` keeps the custom element itself out of layout, same
 * as `ui/combobox`'s `[uiComboboxCollection]` passthrough.
 *
 * The embla instance is created once, imperatively, against the viewport
 * element (`ngAfterViewInit`) using the vanilla `embla-carousel` core — not
 * `embla-carousel-react` (React-only) — reading the orientation/opts/plugins
 * the root mirrored into `CarouselRootService`. Destroyed symmetrically in
 * `ngOnDestroy`.
 */
@Component({
  selector: 'ui-carousel-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div #viewport class="overflow-hidden" data-slot="carousel-content">
      <div [class]="trackClasses()">
        <ng-content />
      </div>
    </div>
  `,
})
export class CarouselContentComponent implements AfterViewInit, OnDestroy {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  @ViewChild('viewport', { static: true })
  private readonly viewportRef!: ElementRef<HTMLElement>;

  private readonly carousel = inject(CarouselRootService);

  protected readonly trackClasses = computed(() =>
    cn(
      'flex',
      this.carousel.orientation() === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
      this.className(),
    ),
  );

  ngAfterViewInit(): void {
    const axis = this.carousel.orientation() === 'horizontal' ? 'x' : 'y';
    const api = EmblaCarousel(
      this.viewportRef.nativeElement,
      { ...this.carousel.opts(), axis },
      this.carousel.plugins(),
    );
    this.carousel.registerApi(api);
  }

  ngOnDestroy(): void {
    this.carousel.destroyApi();
  }
}

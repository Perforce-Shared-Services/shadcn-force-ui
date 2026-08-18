import { effect, Injectable, signal, untracked } from '@angular/core';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

/** Mirrors the registry `orientation` prop — drives the embla scroll axis. */
export type CarouselOrientation = 'horizontal' | 'vertical';

/** Re-exported so consumers can type a `(apiChange)` handler without importing embla directly. */
export type CarouselApi = EmblaCarouselType;

/**
 * Root store for `[uiCarousel]` — the Angular equivalent of the React
 * `CarouselContext`. There is no `@radix-ng/primitives` carousel (the registry
 * itself has no radix primitive either; it drives everything off
 * `embla-carousel-react`), so this reimplements the context as a provided
 * service: config mirrored from the root's inputs, plus the live embla API
 * and derived `canScrollPrev`/`canScrollNext` state that `CarouselContent`
 * registers once it creates the embla instance.
 */
@Injectable()
export class CarouselRootService {
  readonly orientation = signal<CarouselOrientation>('horizontal');
  readonly opts = signal<EmblaOptionsType | undefined>(undefined);
  readonly plugins = signal<EmblaPluginType[] | undefined>(undefined);

  readonly api = signal<CarouselApi | null>(null);
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  /**
   * Previous/Next button elements, registered by `CarouselPreviousComponent`/
   * `CarouselNextComponent`, plus the root `[uiCarousel]` element as a
   * programmatic fallback target. Used only to fix a real focus-loss bug
   * (audit finding, 2026-08-18): a native `<button disabled>` is pulled out of
   * the accessible tree and the browser drops focus to `<body>` with zero
   * signal the moment a keyboard user scrolls to either end of the set — the
   * button that had focus becomes disabled out from under them. See the
   * effects below.
   */
  private readonly previousEl = signal<HTMLElement | null>(null);
  private readonly nextEl = signal<HTMLElement | null>(null);
  private readonly containerEl = signal<HTMLElement | null>(null);

  private readonly onSelect = () => this.updateScrollable();
  private readonly onReInit = () => this.updateScrollable();

  constructor() {
    effect(() => {
      if (!this.canScrollPrev()) {
        untracked(() => this.moveFocusAwayFrom(this.previousEl()));
      }
    });
    effect(() => {
      if (!this.canScrollNext()) {
        untracked(() => this.moveFocusAwayFrom(this.nextEl()));
      }
    });
  }

  registerPreviousEl(el: HTMLElement): void {
    this.previousEl.set(el);
  }

  registerNextEl(el: HTMLElement): void {
    this.nextEl.set(el);
  }

  registerContainerEl(el: HTMLElement): void {
    this.containerEl.set(el);
  }

  /**
   * If `el` (a button that just became disabled) currently holds focus, move
   * focus to the other arrow button, or to the root region as a last resort
   * (both arrows can be disabled at once — a single-slide, non-looping set).
   */
  private moveFocusAwayFrom(el: HTMLElement | null): void {
    if (!el || document.activeElement !== el) {
      return;
    }
    const fallback = el === this.previousEl() ? this.nextEl() : this.previousEl();
    if (fallback && !fallback.hasAttribute('disabled')) {
      fallback.focus();
    } else {
      this.containerEl()?.focus();
    }
  }

  /** Called by `CarouselContent` once the embla instance exists. */
  registerApi(api: CarouselApi): void {
    this.api.set(api);
    this.updateScrollable();
    api.on('reInit', this.onReInit);
    api.on('select', this.onSelect);
  }

  /** Called by `CarouselContent` on destroy — symmetric with `registerApi`. */
  destroyApi(): void {
    const api = this.api();
    api?.off('select', this.onSelect);
    api?.off('reInit', this.onReInit);
    api?.destroy();
    this.api.set(null);
    this.canScrollPrev.set(false);
    this.canScrollNext.set(false);
  }

  scrollPrev(): void {
    this.api()?.scrollPrev();
  }

  scrollNext(): void {
    this.api()?.scrollNext();
  }

  /** ArrowLeft/ArrowRight navigation (registry `handleKeyDown`, WCAG 2.1.1). */
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollNext();
    }
  }

  private updateScrollable(): void {
    const api = this.api();
    if (!api) {
      return;
    }
    this.canScrollPrev.set(api.canScrollPrev());
    this.canScrollNext.set(api.canScrollNext());
  }
}

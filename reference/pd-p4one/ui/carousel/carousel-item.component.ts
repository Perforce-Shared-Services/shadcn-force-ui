import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { CarouselRootService } from './carousel-root.service';

/**
 * Angular port of @force-ui/carousel (radix-force-ui style) — item.
 *
 * `role="group"` + `aria-roledescription="slide"` matches the registry
 * exactly (WCAG 4.1.2 — each slide announces as a slide, not a generic
 * group, to AT).
 */
@Component({
  selector: '[uiCarouselItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'aria-roledescription': 'slide',
    'data-slot': 'carousel-item',
    '[class]': 'classes()',
  },
})
export class CarouselItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly carousel = inject(CarouselRootService);

  protected readonly classes = computed(() =>
    cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      this.carousel.orientation() === 'horizontal' ? 'pl-4' : 'pt-4',
      this.className(),
    ),
  );
}

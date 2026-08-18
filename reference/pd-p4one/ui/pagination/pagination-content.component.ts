import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — content list.
 *
 * Attribute selector on a `<ul>`. Class string copied verbatim from the
 * registry JSON.
 */
@Component({
  selector: '[uiPaginationContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-content',
    '[class]': 'classes()',
  },
})
export class PaginationContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('flex items-center gap-0.5', this.className()));
}

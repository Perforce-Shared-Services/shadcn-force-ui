import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — item.
 *
 * Attribute selector on an `<li>`. The registry spreads `{...props}` with no
 * base class (`<li data-slot="pagination-item" {...props} />`); `cn()` with no
 * base string reproduces that (a caller-supplied `class` passes through
 * unmerged).
 */
@Component({
  selector: '[uiPaginationItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-item',
    '[class]': 'classes()',
  },
})
export class PaginationItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(this.className()));
}

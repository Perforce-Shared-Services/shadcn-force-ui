import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — item.
 *
 * Attribute selector on an `<li>`. Class string copied verbatim from the
 * registry JSON.
 */
@Component({
  selector: '[uiBreadcrumbItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-item',
    '[class]': 'classes()',
  },
})
export class BreadcrumbItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('inline-flex items-center gap-1', this.className()));
}

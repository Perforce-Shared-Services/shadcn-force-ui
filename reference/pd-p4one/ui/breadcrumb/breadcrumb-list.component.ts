import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — list.
 *
 * Attribute selector on an `<ol>`. Class string copied verbatim from the
 * registry JSON.
 */
@Component({
  selector: '[uiBreadcrumbList]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-list',
    '[class]': 'classes()',
  },
})
export class BreadcrumbListComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground',
      this.className(),
    ),
  );
}

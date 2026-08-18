import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — current page.
 *
 * Attribute selector on a `<span>`. The current page is not a link: it carries
 * `role=link` + `aria-disabled=true` + `aria-current=page` (verbatim from the
 * registry) so assistive tech announces it as the current location. Class
 * string copied verbatim.
 */
@Component({
  selector: '[uiBreadcrumbPage]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-page',
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
    '[class]': 'classes()',
  },
})
export class BreadcrumbPageComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('font-normal text-foreground', this.className()));
}

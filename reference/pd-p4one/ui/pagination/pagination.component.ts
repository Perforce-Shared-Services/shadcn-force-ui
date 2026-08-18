import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — root.
 *
 * Attribute selector on a `<nav>` — usage:
 *   <nav uiPagination>
 *     <ul uiPaginationContent>
 *       <li uiPaginationItem><a uiPaginationLink href="…" [isActive]="true">1</a></li>
 *       …
 *     </ul>
 *   </nav>
 *
 * Purely presentational (no radix primitive) — a set of standalone OnPush
 * attribute-selector decorators that each re-project `<ng-content/>`. Class
 * strings are copied verbatim from the registry JSON.
 */
@Component({
  selector: '[uiPagination]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination',
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'classes()',
  },
})
export class PaginationComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // Registry hardcodes aria-label="pagination"; exposed as an overridable input
  // (parity with the breadcrumb root) so a caller can pass a more specific
  // landmark label, e.g. aria-label="Version history pages".
  readonly ariaLabel = input<string>('pagination', { alias: 'aria-label' });

  protected readonly classes = computed(() =>
    cn('mx-auto flex w-full justify-center', this.className()),
  );
}

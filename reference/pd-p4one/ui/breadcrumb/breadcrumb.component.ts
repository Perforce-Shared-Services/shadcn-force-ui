import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — root.
 *
 * Attribute selector on a `<nav>` — usage:
 *   <nav uiBreadcrumb>
 *     <ol uiBreadcrumbList>
 *       <li uiBreadcrumbItem><a uiBreadcrumbLink href="…">Workspace</a></li>
 *       <li uiBreadcrumbSeparator></li>
 *       <li uiBreadcrumbItem><span uiBreadcrumbPage>Characters</span></li>
 *     </ol>
 *   </nav>
 *
 * Purely presentational (no radix primitive) — a set of standalone OnPush
 * attribute-selector decorators that each re-project `<ng-content/>` and carry a
 * `data-slot`. Class strings are copied verbatim from the registry JSON.
 */
@Component({
  selector: '[uiBreadcrumb]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'classes()',
  },
})
export class BreadcrumbComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // Registry hardcodes aria-label="breadcrumb"; exposed as an overridable input
  // (post-audit) so a caller can pass a content-descriptive landmark label —
  // e.g. aria-label="File location" for the P4 One file-path breadcrumb — while
  // keeping the registry default.
  readonly ariaLabel = input<string>('breadcrumb', { alias: 'aria-label' });

  // Registry root has no own classes (just `cn(className)`); keep that so callers
  // fully control the nav's layout.
  protected readonly classes = computed(() => cn(this.className()));
}

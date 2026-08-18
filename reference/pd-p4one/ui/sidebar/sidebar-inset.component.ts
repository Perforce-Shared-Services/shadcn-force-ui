import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/sidebar's `SidebarInset` — the `<main>` content
 * area, styled via `peer-data-*` selectors keyed off the sibling `Sidebar`'s
 * `data-variant`/`data-state` (registry-verbatim `peer` relationship).
 */
@Component({
  selector: 'main[uiSidebarInset]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-inset',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class SidebarInsetComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
      this.className(),
    ),
  );
}

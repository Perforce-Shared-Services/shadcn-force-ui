import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxTabsListDirective } from '@radix-ng/primitives/tabs';

import { cn } from '@/app/lib/utils';
import { tabsListVariants, type TabsListVariant } from './tabs.variants';

/**
 * Angular port of @force-ui/tabs (radix-force-ui style) — list.
 *
 * Hosts `RdxTabsListDirective` (role=tablist + roving-focus group). The
 * registry renders `data-variant={variant}` on the list; radix-ng does NOT, so
 * we set it explicitly — the triggers key their `group-data-[variant=…]/tabs-list`
 * styling off it (and off the `group/tabs-list` marker baked into the base
 * class string).
 */
@Component({
  selector: '[uiTabsList]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // `RdxTabsListDirective` exposes no inputs of its own — `loop` / `dir` /
  // `orientation` live on the roving-focus group it nests as a hostDirective and
  // are not re-surfaced, so we host the bare directive.
  hostDirectives: [RdxTabsListDirective],
  host: {
    'data-slot': 'tabs-list',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class TabsListComponent {
  readonly variant = input<TabsListVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(tabsListVariants({ variant: this.variant() }), this.className()),
  );
}

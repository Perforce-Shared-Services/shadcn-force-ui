import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { SEPARATOR_BASE_CLASS, type SeparatorOrientation } from '../separator/separator.component';

/** Angular port of @force-ui/sidebar's `SidebarHeader`. Styling-only div. */
@Component({
  selector: '[uiSidebarHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-header',
    'data-sidebar': 'header',
    '[class]': 'classes()',
  },
})
export class SidebarHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('flex flex-col gap-2 p-2', this.className()));
}

/** Angular port of @force-ui/sidebar's `SidebarFooter`. Styling-only div. */
@Component({
  selector: '[uiSidebarFooter]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-footer',
    'data-sidebar': 'footer',
    '[class]': 'classes()',
  },
})
export class SidebarFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('flex flex-col gap-2 p-2', this.className()));
}

/** Angular port of @force-ui/sidebar's `SidebarContent` — the scrollable middle zone. */
@Component({
  selector: '[uiSidebarContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-content',
    'data-sidebar': 'content',
    '[class]': 'classes()',
  },
})
export class SidebarContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      this.className(),
    ),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarSeparator` — wraps `Separator`
 * in the registry. Same "reuse the primitive's base class, don't stack the
 * attribute-selector host directive" shape as `ui/button-group`'s
 * `ButtonGroupSeparator` (dual-`[class]`-host-binding conflict otherwise).
 */
@Component({
  selector: '[uiSidebarSeparator]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-separator',
    'data-sidebar': 'separator',
    '[attr.role]': "decorative() ? 'none' : 'separator'",
    '[attr.aria-orientation]':
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class SidebarSeparatorComponent {
  readonly orientation = input<SeparatorOrientation>('horizontal');
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(SEPARATOR_BASE_CLASS, 'mx-2 w-auto bg-sidebar-border', this.className()),
  );
}

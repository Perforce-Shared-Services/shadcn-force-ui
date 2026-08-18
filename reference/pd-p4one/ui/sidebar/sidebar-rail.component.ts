import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { injectSidebar } from './sidebar-provider.component';

/**
 * Angular port of @force-ui/sidebar's `SidebarRail` — the thin drag-style
 * strip at the sidebar's edge that also toggles it on click. Registry-verbatim
 * class string; a plain `<button>` (no `ui/button` composition upstream
 * either — this is a hit-target strip, not a visible button).
 */
@Component({
  selector: 'button[uiSidebarRail]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-sidebar': 'rail',
    'data-slot': 'sidebar-rail',
    'aria-label': 'Toggle sidebar',
    tabindex: '-1',
    title: 'Toggle sidebar',
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
  template: '',
})
export class SidebarRailComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly ctx = injectSidebar();
  protected readonly classes = computed(() =>
    cn(
      'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear motion-reduce:transition-none group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2',
      'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      this.className(),
    ),
  );

  protected onClick(): void {
    this.ctx.toggleSidebar();
  }
}

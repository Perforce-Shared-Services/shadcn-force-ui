import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { SkeletonComponent } from '../skeleton/skeleton.component';
import { sidebarMenuButtonVariants, type SidebarMenuButtonSize, type SidebarMenuButtonVariant } from './sidebar.variants';

/** Angular port of @force-ui/sidebar's `SidebarMenu`. */
@Component({
  selector: 'ul[uiSidebarMenu]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu',
    'data-sidebar': 'menu',
    '[class]': 'classes()',
  },
})
export class SidebarMenuComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-0', this.className()),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarMenuItem`.
 *
 * Also owns the maintainer-directed active-state accent indicator (see
 * `sidebar.variants.ts`'s doc comment for the full spec/history). It's
 * rendered here — a real sibling `<span>` AFTER the projected content,
 * reacting to the button's `data-active` via the `peer-data-active/menu-button:`
 * variant (the button already carries `peer/menu-button`) — rather than as
 * a `::before` on the button itself. That was the first attempt and it
 * silently clipped: the button's own base class carries `overflow-hidden`
 * (registry-verbatim, needed for label truncation), and a pseudo-element is
 * part of its ORIGINATING element's render box for overflow purposes
 * regardless of what positioned ancestor it resolves `left`/`top` against —
 * so the indicator was correctly positioned at `left:-6px` and still
 * invisible, clipped by the same element's own `overflow-hidden`. Confirmed
 * by walking the full ancestor chain's computed styles in DevTools, not
 * from reasoning about the CSS spec alone. `SidebarMenuItem`'s own
 * `overflow: visible` (registry-verbatim) has no such conflict.
 */
@Component({
  selector: 'li[uiSidebarMenuItem]',
  standalone: true,
  template: `
    <ng-content />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute -left-[6px] inset-y-0 w-1 rounded-full bg-sidebar-accent-foreground opacity-0 peer-data-active/menu-button:opacity-100"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-item',
    'data-sidebar': 'menu-item',
    '[class]': 'classes()',
  },
})
export class SidebarMenuItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('group/menu-item relative', this.className()));
}

/**
 * Angular port of @force-ui/sidebar's `SidebarMenuButton`.
 *
 * PARITY GAP (documented, not fixed): the registry's `tooltip` prop
 * auto-wraps the button in a `<Tooltip>` — an Angular attribute-selector
 * component can decorate its host element but cannot add a NEW parent
 * element around it (the consumer's template already fixed what tag exists
 * at that position), so there's no directive-only equivalent. When a
 * collapsed-mode label tooltip is needed, the consumer composes it
 * explicitly:
 *
 *   <div rdxTooltipRoot>
 *     <button uiSidebarMenuButton rdxTooltipTrigger>...</button>
 *     <ng-template rdxTooltipContent>
 *       <div rdxTooltipContentAttributes side="right" [hidden]="!collapsed">Label</div>
 *     </ng-template>
 *   </div>
 *
 * See the `WithTooltip` story for the full pattern (including gating
 * visibility on the sidebar's collapsed state, matching the registry's
 * `hidden={state !== "collapsed" || isMobile}`).
 */
@Component({
  selector: 'button[uiSidebarMenuButton]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-button',
    'data-sidebar': 'menu-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive()',
    '[class]': 'classes()',
  },
})
export class SidebarMenuButtonComponent {
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly variant = input<SidebarMenuButtonVariant>('default');
  readonly size = input<SidebarMenuButtonSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(sidebarMenuButtonVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarMenuAction` — a small icon
 * button pinned to the item's corner (e.g. a row's overflow menu trigger).
 */
@Component({
  selector: '[uiSidebarMenuAction]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-slot': 'sidebar-menu-action',
    'data-sidebar': 'menu-action',
    '[class]': 'classes()',
  },
})
export class SidebarMenuActionComponent {
  readonly showOnHover = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform motion-reduce:transition-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0',
      this.className(),
    ),
  );
}

/** Angular port of @force-ui/sidebar's `SidebarMenuBadge` — e.g. an unread count. */
@Component({
  selector: '[uiSidebarMenuBadge]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-badge',
    'data-sidebar': 'menu-badge',
    '[class]': 'classes()',
  },
})
export class SidebarMenuBadgeComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground',
      this.className(),
    ),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarMenuSkeleton` — a loading
 * placeholder row, reusing `ui/skeleton`. The random text width is
 * registry-verbatim (a static per-row width keeps the loading state from
 * looking mechanically uniform); computed once per instance via a field
 * initializer, matching the registry's `useState(() => …)` lazy-init.
 *
 * Carries `aria-busy="true"` per `ui/skeleton`'s own documented contract
 * (the "content is loading" state belongs on the container). That alone
 * doesn't ANNOUNCE the loading state to screen readers — wrap a group of
 * these rows in a visually-hidden `aria-live="polite"` region at the call
 * site when the loading state itself needs to be heard, not just queried.
 */
@Component({
  selector: '[uiSidebarMenuSkeleton]',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    @if (showIcon()) {
      <div uiSkeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon"></div>
    }
    <div
      uiSkeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      [style.--skeleton-width]="width"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-skeleton',
    'data-sidebar': 'menu-skeleton',
    'aria-busy': 'true',
    '[class]': 'classes()',
  },
})
export class SidebarMenuSkeletonComponent {
  readonly showIcon = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Random width between 50–90%, fixed for this instance's lifetime. */
  protected readonly width = `${Math.floor(Math.random() * 40) + 50}%`;

  protected readonly classes = computed(() =>
    cn('flex h-8 items-center gap-2 rounded-md px-2', this.className()),
  );
}

/** Angular port of @force-ui/sidebar's `SidebarMenuSub`. */
@Component({
  selector: 'ul[uiSidebarMenuSub]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-sub',
    'data-sidebar': 'menu-sub',
    '[class]': 'classes()',
  },
})
export class SidebarMenuSubComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden',
      this.className(),
    ),
  );
}

/** Angular port of @force-ui/sidebar's `SidebarMenuSubItem`. */
@Component({
  selector: 'li[uiSidebarMenuSubItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    'data-sidebar': 'menu-sub-item',
    '[class]': 'classes()',
  },
})
export class SidebarMenuSubItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('group/menu-sub-item relative', this.className()));
}

/** Angular port of @force-ui/sidebar's `SidebarMenuSubButton`. Native `<a>` (it navigates). */
@Component({
  selector: 'a[uiSidebarMenuSubButton]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive()',
    '[class]': 'classes()',
  },
})
export class SidebarMenuSubButtonComponent {
  readonly size = input<'sm' | 'md'>('md');
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
      this.className(),
    ),
  );
}

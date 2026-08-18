import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/** Angular port of @force-ui/sidebar's `SidebarGroup`. Styling-only div. */
@Component({
  selector: '[uiSidebarGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-group',
    'data-sidebar': 'group',
    '[class]': 'classes()',
  },
})
export class SidebarGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn('relative flex w-full min-w-0 flex-col p-2', this.className()),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarGroupLabel`.
 *
 * The registry's `asChild` (rendering as whatever element the caller
 * projects, e.g. a `<Collapsible.Trigger>`) has no Angular equivalent here —
 * an attribute selector already gives the same result: apply
 * `uiSidebarGroupLabel` directly to any host element (a `<div>`, a
 * `<button>` for a collapsible trigger, etc.) instead of a native `<div>`.
 *
 * DEVIATION FROM REGISTRY-VERBATIM (maintainer-directed, 2026-07-03): adds
 * `uppercase tracking-wide` on top of the registry's class string, and swaps
 * the registry's `text-sidebar-foreground/70` (an opacity-computed tint) for
 * the explicit `text-muted-foreground` token. The plain shadcn source
 * doesn't uppercase its section labels, but the the-force-design-spec MCP's
 * `sidebar-navigation` pattern explicitly specifies section labels as
 * "uppercase, letter-spacing wide, `--force-color-text-tertiary`" — a
 * genuine Force UI spec requirement, not a P4 One-only preference, so both
 * are applied here rather than left as a per-consumer class override.
 * `text-muted-foreground` is this codebase's tertiary-text token (confirmed
 * equal to the spec's `--force-color-text-tertiary` via a `tailwind.css`
 * comment) — matches [[feedback_status_token_model]]'s explicit-token rule:
 * an opacity-computed tint on a differently-scoped base color isn't the same
 * design decision as a dedicated semantic token, even when they render close
 * in one theme.
 */
@Component({
  selector: '[uiSidebarGroupLabel]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-group-label',
    'data-sidebar': 'group-label',
    '[class]': 'classes()',
  },
})
export class SidebarGroupLabelComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear motion-reduce:transition-none group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      this.className(),
    ),
  );
}

/**
 * Angular port of @force-ui/sidebar's `SidebarGroupAction` — a small icon
 * button pinned to the group header's corner (e.g. "add item"). Same
 * attribute-selector-replaces-`asChild` note as `SidebarGroupLabel`.
 */
@Component({
  selector: '[uiSidebarGroupAction]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-slot': 'sidebar-group-action',
    'data-sidebar': 'group-action',
    '[class]': 'classes()',
  },
})
export class SidebarGroupActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform motion-reduce:transition-none group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
      this.className(),
    ),
  );
}

/** Angular port of @force-ui/sidebar's `SidebarGroupContent`. Styling-only div. */
@Component({
  selector: '[uiSidebarGroupContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-group-content',
    'data-sidebar': 'group-content',
    '[class]': 'classes()',
  },
})
export class SidebarGroupContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('w-full text-sm', this.className()));
}

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { RdxTooltip, RdxTooltipPortal, RdxTooltipPopup, RdxTooltipPositioner, RdxTooltipTrigger } from "@radix-ng/primitives/tooltip"

import { cn } from "@/lib/utils"

import { Skeleton } from "@/angular-ui/skeleton"
import { TooltipPositioner } from "@/angular-ui/tooltip"
import {
  sidebarMenuButtonVariants,
  type SidebarMenuButtonSize,
  type SidebarMenuButtonVariant,
} from "./sidebar.variants"
import { injectSidebar } from "./sidebar-provider.component"

/** Angular port of `SidebarMenu` — the nav list. */
@Directive({
  selector: "ul[uiSidebarMenu]",
  standalone: true,
  host: {
    "data-slot": "sidebar-menu",
    "data-sidebar": "menu",
    "[class]": "classes()",
  },
})
export class SidebarMenuDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-menu flex w-full min-w-0 flex-col", this.className()))
}

/**
 * Angular port of `SidebarMenuItem`. Renders the `[FORCE-UI]` active-state
 * accent indicator as a real sibling `<span>` (not a `::before`): the menu
 * button's base class carries `overflow-hidden` for label truncation, which
 * clips a pseudo-element regardless of its positioned ancestor. The indicator
 * reacts to the button's `data-active` via `peer-data-active/menu-button:`.
 */
@Component({
  selector: "li[uiSidebarMenuItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "sidebar-menu-item",
    "data-sidebar": "menu-item",
    "[class]": "classes()",
  },
  template: `
    <ng-content />
    <span aria-hidden="true" class="cn-sidebar-menu-item-indicator"></span>
  `,
})
export class SidebarMenuItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("group/menu-item relative", this.className()))
}

/**
 * Angular port of `SidebarMenuButton`. Attribute-only selector so it can ride
 * a native `<button>` or an `<a>` (the Angular equivalent of React's
 * `render={<a />}` composition). When `tooltip` is set, radix-ng's tooltip
 * root + trigger ride the same element as host directives and the component
 * renders its own portal/content, shown only while the sidebar is collapsed
 * to icons (registry-verbatim `hidden` condition).
 */
@Component({
  selector: "[uiSidebarMenuButton]",
  standalone: true,
  imports: [RdxTooltipPortal, TooltipPositioner, RdxTooltipPopup],
  hostDirectives: [{ directive: RdxTooltip }, { directive: RdxTooltipTrigger }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "[attr.data-size]": "size()",
    "[attr.data-active]": "isActive()",
    "[class]": "classes()",
  },
  template: `
    <ng-content />
    @if (tooltip()) {
      <ng-template uiTooltipPortal>
        <span uiTooltipPositioner side="right" align="center">
          <span
            [RdxTooltipPopup]
            class="cn-tooltip-content z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) bg-foreground text-background"
            [hidden]="!tooltipVisible()"
          >
            {{ tooltip() }}
          </span>
        </span>
      </ng-template>
    }
  `,
})
export class SidebarMenuButtonComponent {
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly variant = input<SidebarMenuButtonVariant>("default")
  readonly size = input<SidebarMenuButtonSize>("default")
  /** Text shown in a right-side tooltip while collapsed to icons (optional). */
  readonly tooltip = input<string>("")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly ctx = injectSidebar()
  protected readonly tooltipVisible = computed(
    () => this.ctx.state() === "collapsed" && !this.ctx.isMobile(),
  )

  protected readonly classes = computed(() =>
    cn(sidebarMenuButtonVariants({ variant: this.variant(), size: this.size() }), this.className()),
  )
}

/**
 * Angular port of `SidebarMenuAction` — the row's corner icon button
 * (e.g. ⋯). With `showOnHover`, it fades in only when its row is hovered or
 * focused, or while the dropdown it anchors is open.
 */
@Component({
  selector: "button[uiSidebarMenuAction]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: "button",
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
    "[attr.data-show-on-hover]": "showOnHover() ? '' : null",
    "[class]": "classes()",
  },
  template: "<ng-content />",
})
export class SidebarMenuActionComponent {
  readonly showOnHover = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-menu-action flex items-center justify-center outline-hidden transition-transform motion-reduce:transition-none group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&_svg]:fill-current [&>svg]:shrink-0",
      this.showOnHover() &&
        "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
      this.className(),
    ),
  )
}

/** Angular port of `SidebarMenuBadge` — e.g. an unread count on the row's edge. */
@Directive({
  selector: "[uiSidebarMenuBadge]",
  standalone: true,
  host: {
    "data-slot": "sidebar-menu-badge",
    "data-sidebar": "menu-badge",
    "[class]": "classes()",
  },
})
export class SidebarMenuBadgeDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-menu-badge flex items-center justify-center tabular-nums select-none group-data-[collapsible=icon]:hidden",
      this.className(),
    ),
  )
}

/** Angular port of `SidebarMenuSkeleton` — loading placeholder row. */
@Component({
  selector: "[uiSidebarMenuSkeleton]",
  standalone: true,
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "sidebar-menu-skeleton",
    "data-sidebar": "menu-skeleton",
    "aria-busy": "true",
    "[class]": "classes()",
  },
  template: `
    @if (showIcon()) {
      <div uiSkeleton class="cn-sidebar-menu-skeleton-icon" data-sidebar="menu-skeleton-icon"></div>
    }
    <div
      uiSkeleton
      class="cn-sidebar-menu-skeleton-text max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      [style.--skeleton-width]="width"
    ></div>
  `,
})
export class SidebarMenuSkeletonComponent {
  readonly showIcon = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // Random width between 50 to 90% — registry-verbatim.
  protected readonly width = `${Math.floor(Math.random() * 40) + 50}%`

  protected readonly classes = computed(() =>
    cn("cn-sidebar-menu-skeleton flex items-center", this.className()),
  )
}

/** Angular port of `SidebarMenuSub` — the indented sub-list under a row. */
@Directive({
  selector: "ul[uiSidebarMenuSub]",
  standalone: true,
  host: {
    "data-slot": "sidebar-menu-sub",
    "data-sidebar": "menu-sub",
    "[class]": "classes()",
  },
})
export class SidebarMenuSubDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-menu-sub flex min-w-0 flex-col", this.className()))
}

/** Angular port of `SidebarMenuSubItem`. */
@Directive({
  selector: "li[uiSidebarMenuSubItem]",
  standalone: true,
  host: {
    "data-slot": "sidebar-menu-sub-item",
    "data-sidebar": "menu-sub-item",
    "[class]": "classes()",
  },
})
export class SidebarMenuSubItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("group/menu-sub-item relative", this.className()))
}

/**
 * Angular port of `SidebarMenuSubButton`. Attribute-only selector so it can
 * ride a native `<a>` or `<button>` (React's `render={<a />}` equivalent).
 */
@Directive({
  selector: "[uiSidebarMenuSubButton]",
  standalone: true,
  host: {
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "[attr.data-size]": "size()",
    "[attr.data-active]": "isActive()",
    "[class]": "classes()",
  },
})
export class SidebarMenuSubButtonDirective {
  readonly size = input<"sm" | "md">("md")
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-menu-sub-button flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:fill-current [&>svg]:shrink-0",
      this.className(),
    ),
  )
}

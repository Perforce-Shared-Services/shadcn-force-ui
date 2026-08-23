import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"

import { cn } from "@/lib/utils"

/** Angular port of `SidebarGroup` — a labelled section of sidebar content. */
@Directive({
  selector: "[uiSidebarGroup]",
  standalone: true,
  host: {
    "data-slot": "sidebar-group",
    "data-sidebar": "group",
    "[class]": "classes()",
  },
})
export class SidebarGroupDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-sidebar-group relative flex w-full min-w-0 flex-col", this.className()),
  )
}

/** Angular port of `SidebarGroupLabel` — small uppercase section heading. */
@Directive({
  selector: "[uiSidebarGroupLabel]",
  standalone: true,
  host: {
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    "[class]": "classes()",
  },
})
export class SidebarGroupLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-sidebar-group-label flex shrink-0 items-center outline-hidden [&_svg]:fill-current [&>svg]:shrink-0", this.className()),
  )
}

/**
 * Angular port of `SidebarGroupAction` — the corner action button of a group
 * (e.g. "+"). The `after:-inset-2` halo enlarges the hit target on touch;
 * hidden when collapsed to icons.
 */
@Component({
  selector: "button[uiSidebarGroupAction]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: "button",
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
    "[class]": "classes()",
  },
  template: "<ng-content />",
})
export class SidebarGroupActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-group-action flex aspect-square items-center justify-center outline-hidden transition-transform motion-reduce:transition-none group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&_svg]:fill-current [&>svg]:shrink-0",
      this.className(),
    ),
  )
}

/** Angular port of `SidebarGroupContent` — the group's body wrapper. */
@Directive({
  selector: "[uiSidebarGroupContent]",
  standalone: true,
  host: {
    "data-slot": "sidebar-group-content",
    "data-sidebar": "group-content",
    "[class]": "classes()",
  },
})
export class SidebarGroupContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-group-content w-full", this.className()))
}

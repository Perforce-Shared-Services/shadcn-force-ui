import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/angular-ui/button"
import { Input, inputVariants } from "@/angular-ui/input"
import { Separator } from "@/angular-ui/separator"
import { SIDEBAR_TRIGGER_SVG } from "./sidebar.icons"
import { injectSidebar } from "./sidebar-provider.component"

/**
 * Angular port of `SidebarTrigger` — a ghost icon button that toggles the
 * sidebar (desktop collapse or mobile drawer). Advertises the Cmd/Ctrl+B
 * shortcut via `aria-keyshortcuts`; the glyph is mirrored in RTL
 * (`cn-rtl-flip`).
 */
@Component({
  selector: "button[uiSidebarTrigger]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: "button",
    "data-sidebar": "trigger",
    "data-slot": "sidebar-trigger",
    "aria-keyshortcuts": "Meta+B Control+B",
    "[class]": "classes()",
    "(click)": "onClick()",
  },
  template: `
    <span class="inline-flex cn-rtl-flip [&>svg]:fill-current" aria-hidden="true" [innerHTML]="icon"></span>
    <span class="sr-only">Toggle sidebar</span>
  `,
})
export class SidebarTriggerDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly ctx = injectSidebar()
  /** Sanitizer-trusted inline SVG (bundled static asset — bypass is safe + required). */
  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(SIDEBAR_TRIGGER_SVG)
  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), this.className()),
  )

  protected onClick(): void {
    this.ctx.toggleSidebar()
  }
}

/**
 * Angular port of `SidebarRail` — the invisible resize strip on the sidebar's
 * inner edge; click toggles collapse. `tabindex="-1"` keeps it out of tab
 * order (decorative affordance, labelled control duplicated by the trigger).
 */
@Component({
  selector: "button[uiSidebarRail]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-sidebar": "rail",
    "data-slot": "sidebar-rail",
    "aria-label": "Toggle Sidebar",
    tabindex: "-1",
    title: "Toggle Sidebar",
    "[class]": "classes()",
    "(click)": "onClick()",
  },
  template: "",
})
export class SidebarRailComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly ctx = injectSidebar()
  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-rail absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
      "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
      "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
      "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
      "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
      "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
      this.className(),
    ),
  )

  protected onClick(): void {
    this.ctx.toggleSidebar()
  }
}

/** Angular port of `SidebarInset` — the main content area beside the sidebar. */
@Component({
  selector: "main[uiSidebarInset]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "sidebar-inset",
    "[class]": "classes()",
  },
  template: "<ng-content />",
})
export class SidebarInsetComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-sidebar-inset relative flex w-full flex-1 flex-col", this.className()),
  )
}

/**
 * Angular port of `SidebarInput` — an `[uiInput]` restyled for the narrow
 * header slot (`cn-sidebar-input`: background flush, h-8).
 */
@Directive({
  selector: "input[uiSidebarInput]",
  standalone: true,
  hostDirectives: [{ directive: Input, inputs: ["variant", "variant"] }],
  host: {
    "data-slot": "sidebar-input",
    "data-sidebar": "input",
    "[class]": "classes()",
  },
})
export class SidebarInputDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-sidebar-input", this.className()))
}

/** Angular port of `SidebarHeader` — stacks the logo / team switcher. */
@Directive({
  selector: "[uiSidebarHeader]",
  standalone: true,
  host: {
    "data-slot": "sidebar-header",
    "data-sidebar": "header",
    "[class]": "classes()",
  },
})
export class SidebarHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-header flex flex-col", this.className()))
}

/** Angular port of `SidebarFooter` — pins actions to the bottom of the column. */
@Directive({
  selector: "[uiSidebarFooter]",
  standalone: true,
  host: {
    "data-slot": "sidebar-footer",
    "data-sidebar": "footer",
    "[class]": "classes()",
  },
})
export class SidebarFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-footer flex flex-col", this.className()))
}

/** Angular port of `SidebarSeparator` — a token-restyled `[uiSeparator]`. */
@Directive({
  selector: "[uiSidebarSeparator]",
  standalone: true,
  hostDirectives: [Separator],
  host: {
    "data-slot": "sidebar-separator",
    "data-sidebar": "separator",
    "[class]": "classes()",
  },
})
export class SidebarSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sidebar-separator w-auto", this.className()))
}

/** Angular port of `SidebarContent` — the scrollable middle zone. */
@Directive({
  selector: "[uiSidebarContent]",
  standalone: true,
  host: {
    "data-slot": "sidebar-content",
    "data-sidebar": "content",
    "[class]": "classes()",
  },
})
export class SidebarContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-sidebar-content flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      this.className(),
    ),
  )
}

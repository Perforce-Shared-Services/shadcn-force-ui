import { NgTemplateOutlet } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  TemplateRef,
  viewChild,
} from "@angular/core"
import { RdxDialogPortal, RdxDialogRoot } from "@radix-ng/primitives/dialog"

import { cn } from "@/lib/utils"

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from "@/angular-ui/sheet"
import { injectSidebar } from "./sidebar-provider.component"

export type SidebarSide = "left" | "right"
export type SidebarVariant = "sidebar" | "floating" | "inset"
export type SidebarCollapsible = "offcanvas" | "icon" | "none"

const SIDEBAR_WIDTH_MOBILE = "18rem"

/**
 * Angular port of the registry `Sidebar`.
 *
 * The registry component RETURNS a different root element per branch
 * (`collapsible="none"` → a plain div; mobile → a `<Sheet>`; desktop → the
 * three-layer gap/container/inner div stack). An Angular attribute-selector
 * host is one fixed element, so this is reconciled as:
 *
 * - `collapsible="none"` and desktop size/attribute the SAME host div
 *   differently via computed host bindings (both branches are "one div" in
 *   the registry source too).
 * - Mobile is architecturally different: `[uiSheetContent]` only works inside
 *   an open radix-ng dialog context. The host therefore carries
 *   `RdxDialogRoot` as a host directive and drives its `open` model from the
 *   provider's `openMobile()` flag; dismissal (Escape / overlay click) flows
 *   back through `onOpenChange`. The projected children live in exactly ONE
 *   always-declared `<ng-template #projected>` — `<ng-content>` in mutually
 *   exclusive `@switch` branches loses the projected nodes when the active
 *   branch is destroyed; an `[ngTemplateOutlet]` re-creates them on demand.
 */
@Component({
  selector: "[uiSidebar]",
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RdxDialogPortal,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetPortal,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxDialogRoot],
  templateUrl: "./sidebar.component.html",
  host: {
    "data-slot": "sidebar",
    "[attr.data-state]": "hostState()",
    "[attr.data-collapsible]": "hostCollapsible()",
    "[attr.data-variant]": "hostVariant()",
    "[attr.data-side]": "hostSide()",
    "[class]": "hostClasses()",
  },
})
export class SidebarComponent {
  readonly side = input<SidebarSide>("left")
  readonly variant = input<SidebarVariant>("sidebar")
  readonly collapsible = input<SidebarCollapsible>("offcanvas")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly ctx = injectSidebar()
  private readonly dialogRoot = inject(RdxDialogRoot)
  private readonly mobileWidth = SIDEBAR_WIDTH_MOBILE

  protected readonly branch = computed<"none" | "mobile" | "desktop">(() => {
    if (this.collapsible() === "none") return "none"
    return this.ctx.isMobile() ? "mobile" : "desktop"
  })

  protected readonly hostState = computed(() => (this.branch() === "desktop" ? this.ctx.state() : null))
  protected readonly hostCollapsible = computed(() =>
    this.branch() === "desktop" ? (this.ctx.state() === "collapsed" ? this.collapsible() : "") : null,
  )
  protected readonly hostVariant = computed(() => (this.branch() === "desktop" ? this.variant() : null))
  protected readonly hostSide = computed(() => (this.branch() === "desktop" ? this.side() : null))

  protected readonly hostClasses = computed(() => {
    if (this.branch() === "none") {
      return cn(
        "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
        this.className(),
      )
    }
    if (this.branch() === "mobile") {
      return "hidden"
    }
    return cn("group peer hidden text-sidebar-foreground md:block", this.className())
  })

  protected readonly gapClasses = computed(() =>
    cn(
      "cn-sidebar-gap relative w-(--sidebar-width) bg-transparent",
      "group-data-[collapsible=offcanvas]:w-0",
      "group-data-[side=right]:rotate-180",
      this.variant() === "floating" || this.variant() === "inset"
        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
    ),
  )

  protected readonly containerClasses = computed(() =>
    cn(
      "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
      this.variant() === "floating" || this.variant() === "inset"
        ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
      this.className(),
    ),
  )

  private readonly projected = viewChild.required<TemplateRef<void>>("projected")

  constructor() {
    effect(() => {
      if (this.branch() !== "mobile") return
      this.dialogRoot.open.set(this.ctx.openMobile())
    })
    this.dialogRoot.onOpenChange.subscribe((change) => {
      if (!change.open && this.branch() === "mobile") {
        this.ctx.setOpenMobile(false)
      }
    })
  }
}

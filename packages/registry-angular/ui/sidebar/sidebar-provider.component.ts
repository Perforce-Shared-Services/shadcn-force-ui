import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  InjectionToken,
  input,
  model,
  signal,
} from "@angular/core"

import { cn } from "@/lib/utils"

import { injectIsMobile } from "./use-mobile"

export type SidebarState = "expanded" | "collapsed"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/**
 * DI token descendant sidebar parts inject to reach the provider — Angular's
 * answer to the registry's `SidebarContext`/`useSidebar()`. Throws the same
 * way `useSidebar()` throws when used outside a `SidebarProvider`.
 */
export const SIDEBAR_CONTEXT = new InjectionToken<SidebarProviderComponent>("SidebarContext")

export function injectSidebar(): SidebarProviderComponent {
  const ctx = inject(SIDEBAR_CONTEXT, { optional: true })
  if (!ctx) {
    throw new Error("injectSidebar() must be used within a SidebarProvider ([uiSidebarProvider]).")
  }
  return ctx
}

/**
 * Angular port of the registry `SidebarProvider`. Holds the shared state every
 * sidebar part reads: desktop open/collapsed (`open`, two-way bindable via
 * `[(open)]` — mirrors the registry's controlled/uncontrolled `open`/
 * `onOpenChange` pair), the mobile drawer's own flag, `isMobile`, and
 * `toggleSidebar()`.
 *
 * Registry parity note: the registry writes the `sidebar_state` cookie on
 * every `setOpen()` but never reads it back on mount (the read lives in the
 * surrounding Next.js SSR layout). Reproduced verbatim — write survives, no
 * read. Cmd/Ctrl+B toggles, guarded so typing targets keep their keystroke
 * (same guard as the registry's `[FORCE-UI]` fix).
 */
@Component({
  selector: "[uiSidebarProvider]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SIDEBAR_CONTEXT, useExisting: forwardRef(() => SidebarProviderComponent) }],
  host: {
    "data-slot": "sidebar-wrapper",
    "[style.--sidebar-width]": "sidebarWidth",
    "[style.--sidebar-width-icon]": "sidebarWidthIcon",
    "[class]": "classes()",
    "(document:keydown)": "onKeyDown($event)",
  },
})
export class SidebarProviderComponent {
  /** Desktop expanded/collapsed state. Two-way bindable: `[(open)]`. */
  readonly open = model(true)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly sidebarWidth = SIDEBAR_WIDTH
  protected readonly sidebarWidthIcon = SIDEBAR_WIDTH_ICON

  /** Mobile drawer open flag — internal, not a public prop on the registry either. */
  private readonly openMobileSignal = signal(false)
  readonly openMobile = this.openMobileSignal.asReadonly()

  readonly isMobile = injectIsMobile()
  readonly state = computed<SidebarState>(() => (this.open() ? "expanded" : "collapsed"))

  protected readonly classes = computed(() =>
    cn(
      "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
      this.className(),
    ),
  )

  setOpen(value: boolean): void {
    this.open.set(value)
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  setOpenMobile(value: boolean): void {
    this.openMobileSignal.set(value)
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.setOpenMobile(!this.openMobile())
    } else {
      this.setOpen(!this.open())
    }
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key !== SIDEBAR_KEYBOARD_SHORTCUT || !(event.metaKey || event.ctrlKey)) {
      return
    }
    const target = event.target as HTMLElement | null
    if (target && isTypingTarget(target)) {
      return
    }
    event.preventDefault()
    this.toggleSidebar()
  }
}

function isTypingTarget(el: HTMLElement): boolean {
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable ||
    !!el.closest(".monaco-editor")
  )
}

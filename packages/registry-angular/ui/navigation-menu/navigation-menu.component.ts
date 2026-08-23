import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  RdxNavigationMenuContent,
  RdxNavigationMenuItem,
  RdxNavigationMenuLink,
  RdxNavigationMenuList,
  RdxNavigationMenuRoot,
  RdxNavigationMenuTrigger,
  RdxNavigationMenuViewport,
  injectNavigationMenuRootContext,
} from "@radix-ng/primitives/navigation-menu"

import { cn } from "@/lib/utils"

import { NAVIGATION_MENU_TRIGGER_CHEVRON_SVG } from "./navigation-menu.icons"
import {
  NAVIGATION_MENU_CONTENT_CLASS,
  NAVIGATION_MENU_ITEM_CLASS,
  NAVIGATION_MENU_LIST_CLASS,
  NAVIGATION_MENU_ROOT_CLASS,
  NAVIGATION_MENU_TRIGGER_BASE,
  NAVIGATION_MENU_TRIGGER_ICON_CLASS,
  NAVIGATION_MENU_VIEWPORT_CLASS,
  NAVIGATION_MENU_VIEWPORT_WRAPPER_CLASS,
} from "./navigation-menu.variants"

/**
 * Angular port of the Force UI `navigation-menu` registry component, built on
 * `@radix-ng/primitives/navigation-menu` v1.x. Each top-level trigger opens a
 * shared, cross-fading viewport panel — reach for this over dropdown-menu when
 * several top-level entries each need their own panel of links.
 *
 * PARITY GAP (documented, not patched): the React registry conditionally
 * renders its own viewport internally when `viewport` is true and falls back to
 * inline content under each trigger when false. radix-ng's content directive
 * only registers its TemplateRef with the root's viewport — there is no inline
 * fallback path — so a `[uiNavigationMenuViewport]` is effectively required.
 * The `viewport` input and `data-viewport` attribute are exposed for registry
 * parity but have no working code path behind them here.
 */

@Directive({
  selector: "[uiNavigationMenu]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxNavigationMenuRoot,
      // v1.x root inputs (v0.50's skipDelayDuration/loop/clickIgnoreDuration are gone)
      inputs: ["orientation", "dir", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "navigation-menu",
    "[attr.data-viewport]": "viewport()",
    "[class]": "classes()",
  },
})
export class NavigationMenuDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly viewport = input(true, { transform: booleanAttribute })

  protected readonly classes = computed(() => cn(NAVIGATION_MENU_ROOT_CLASS, this.className()))
}

@Directive({
  selector: "[uiNavigationMenuList]",
  standalone: true,
  hostDirectives: [RdxNavigationMenuList],
  host: {
    "data-slot": "navigation-menu-list",
    "[class]": "classes()",
  },
})
export class NavigationMenuListDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(NAVIGATION_MENU_LIST_CLASS, this.className()))
}

/**
 * `value` identifies which item is open (required whenever the item hosts a
 * trigger + content pair). The inert `rdxNavigationMenuItem` host attribute is
 * an upstream lookup workaround: radix-ng's indicator finds the active trigger
 * via a raw `closest('[rdxNavigationMenuItem]')` DOM query against its own
 * un-renamed selector. `role="none"` (WAI-ARIA fix): the list's `role="menubar"`
 * requires menuitem-rooted owned elements; the wrapping `<li>`'s implicit
 * listitem role would break that chain.
 */
@Directive({
  selector: "[uiNavigationMenuItem]",
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuItem, inputs: ["value"] }],
  host: {
    "data-slot": "navigation-menu-item",
    rdxNavigationMenuItem: "",
    role: "none",
    "[class]": "classes()",
  },
})
export class NavigationMenuItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(NAVIGATION_MENU_ITEM_CLASS, this.className()))
}

/**
 * Trigger for a content panel. The `data-open`/`data-closed` host attributes
 * re-expose the radix-ng open signal so the token's `data-open:` rules fire
 * (radix-ng only emits `data-state`). The inert `rdxNavigationMenuTrigger`
 * attribute exists purely so radix-ng's raw-DOM trigger lookup still matches.
 */
@Component({
  selector: "button[uiNavigationMenuTrigger]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    { directive: RdxNavigationMenuTrigger, inputs: ["disabled", "openOnHover"] },
  ],
  host: {
    "data-slot": "navigation-menu-trigger",
    role: "menuitem",
    rdxNavigationMenuTrigger: "",
    "[class]": "classes()",
    "[attr.data-open]": `open() ? "" : null`,
    "[attr.data-closed]": `open() ? null : ""`,
  },
  template: `
    <ng-content />
    <span
      data-slot="navigation-menu-trigger-icon"
      aria-hidden="true"
      [class]="iconClass"
      [innerHTML]="chevronIcon"
    ></span>
  `,
})
export class NavigationMenuTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly item = inject(RdxNavigationMenuItem, { self: true })
  private readonly root = injectNavigationMenuRootContext()
  protected readonly open = computed(() => this.root.value() === this.item.valueInput())

  protected readonly chevronIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    NAVIGATION_MENU_TRIGGER_CHEVRON_SVG,
  )

  protected readonly iconClass = NAVIGATION_MENU_TRIGGER_ICON_CLASS

  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_TRIGGER_BASE, this.className()),
  )
}

/** Class-only export matching the registry's `navigationMenuTriggerStyle()` — style a plain link like a trigger. */
export function navigationMenuTriggerStyle(extraClassName?: string): string {
  return cn(NAVIGATION_MENU_TRIGGER_BASE, extraClassName)
}

/**
 * TWO tags, not one — upstream architecture constraint. radix-ng's content
 * directive injects TemplateRef (it registers the panel with the shared
 * viewport), so it must sit on a real `<ng-template>`, which can't be a
 * Component host. The styled panel is therefore a second, nested piece:
 *
 *   <ng-template uiNavigationMenuContent>
 *     <div uiNavigationMenuContent>...</div>
 *   </ng-template>
 *
 * The embedded view is later moved into `[uiNavigationMenuViewport]`'s DOM,
 * but the TemplateRef captures its declaration injector, so the content still
 * resolves to its enclosing `[uiNavigationMenuItem]`.
 */
@Directive({
  selector: "ng-template[uiNavigationMenuContent]",
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuContent, inputs: ["forceMount"] }],
})
export class NavigationMenuContentAnchorDirective {}

@Component({
  selector: "div[uiNavigationMenuContent]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content />",
  host: {
    "data-slot": "navigation-menu-content",
    "[class]": "classes()",
    "[attr.data-open]": `open() ? "" : null`,
    "[attr.data-closed]": `open() ? null : ""`,
  },
})
export class NavigationMenuContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" });

  private readonly item = inject(RdxNavigationMenuItem);
  private readonly root = injectNavigationMenuRootContext();
  // Independently derived from, but must stay equivalent to, the trigger's own
  // open signal — both express "is this item's panel open" via different
  // radix-ng-internal paths that happen to agree today.
  protected readonly open = computed(() => this.item.value() === this.root.value());

  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_CONTENT_CLASS, this.className()),
  )
}

/**
 * Navigational anchor inside a content panel, or as a top-level link styled to
 * match a trigger via `navigationMenuTriggerStyle`.
 */
@Directive({
  selector: "[uiNavigationMenuLink]",
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuLink, inputs: ["active", "onSelect"] }],
  host: {
    "data-slot": "navigation-menu-link",
    role: "menuitem",
    "[class]": "classes()",
  },
})
export class NavigationMenuLinkDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_LINK_BASE, this.className()),
  )
}

// Token carries all state treatment; nothing structural left to add locally.
const NAVIGATION_MENU_LINK_BASE = "cn-navigation-menu-link"

/**
 * NO INDICATOR PART: radix-ng v1.x dropped the navigation-menu indicator
 * primitive entirely (not in the package exports), so the registry's
 * `NavigationMenuIndicator` caret has no Angular implementation. The React
 * base examples never render one either, so example parity is unaffected;
 * the trigger's `data-open:bg-muted/50` fill remains the open-state cue.
 */

/**
 * Internal styled panel hosting the radix viewport directive — every
 * `[uiNavigationMenuContent]` panel portals into it. Never written by
 * consumers directly; see the exported wrapper below.
 */
@Component({
  selector: "div[uiNavigationMenuViewportPanel]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "",
  hostDirectives: [{ directive: RdxNavigationMenuViewport, inputs: ["forceMount"] }],
  host: {
    "data-slot": "navigation-menu-viewport",
    "[class]": "classes()",
  },
})
export class NavigationMenuViewportPanelComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_VIEWPORT_CLASS, this.className()),
  )
}

/**
 * Shared viewport for all panels — outer positioning wrapper (this host) with
 * the styled panel inside. Required exactly once per menu; place after the
 * list. The token's width/height arbitrary-value vars resolve because radix-ng
 * writes them as inline custom properties on the panel host itself.
 */
@Component({
  selector: "[uiNavigationMenuViewport]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./navigation-menu.component.html",
  host: {
    "data-slot": "navigation-menu-viewport-wrapper",
    "[class]": "classes()",
  },
})
export class NavigationMenuViewportComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly panelClasses = input<string | undefined>(undefined)

  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_VIEWPORT_WRAPPER_CLASS, this.className()),
  )
}

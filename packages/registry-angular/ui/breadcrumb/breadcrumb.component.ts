import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

import { BREADCRUMB_ELLIPSIS_SVG, BREADCRUMB_SEPARATOR_SVG } from "./breadcrumb.icons"

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style).
 *
 * All sub-components use attribute selectors so the host element keeps its
 * native semantics — Angular's idiomatic equivalent of React's asChild/Slot:
 *   <nav uiBreadcrumb>
 *     <ol uiBreadcrumbList>
 *       <li uiBreadcrumbItem><a uiBreadcrumbLink href="…">Home</a></li>
 *       <li uiBreadcrumbSeparator></li>
 *       <li uiBreadcrumbItem><span uiBreadcrumbPage>Characters</span></li>
 *     </ol>
 *   </nav>
 */

@Component({
  selector: "[uiBreadcrumb]",
  standalone: true,
  templateUrl: "./breadcrumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb",
    "[attr.aria-label]": "ariaLabel()",
    "[class]": "classes()",
  },
})
export class BreadcrumbComponent {
  // Registry hardcodes aria-label="breadcrumb"; exposed as an overridable input
  // so a caller can pass a content-descriptive landmark label while keeping
  // the registry default.
  readonly ariaLabel = input<string>("breadcrumb", { alias: "aria-label" })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // p4one parity: the root carries no own token styles (`cn-breadcrumb` has
  // no rule in style-force-ui.css), only consumer classes.
  protected readonly classes = computed(() => cn(this.className()))
}

@Component({
  selector: "[uiBreadcrumbList]",
  standalone: true,
  templateUrl: "./breadcrumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-list",
    "[class]": "classes()",
  },
})
export class BreadcrumbListComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", this.className())
  )
}

@Component({
  selector: "[uiBreadcrumbItem]",
  standalone: true,
  templateUrl: "./breadcrumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-item",
    "[class]": "classes()",
  },
})
export class BreadcrumbItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-breadcrumb-item inline-flex items-center", this.className())
  )
}

@Component({
  selector: "[uiBreadcrumbLink]",
  standalone: true,
  templateUrl: "./breadcrumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-link",
    "[class]": "classes()",
  },
})
export class BreadcrumbLinkComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-breadcrumb-link", this.className()))
}

@Component({
  selector: "[uiBreadcrumbPage]",
  standalone: true,
  templateUrl: "./breadcrumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    "[class]": "classes()",
  },
})
export class BreadcrumbPageComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-breadcrumb-page", this.className()))
}

/**
 * Decorative separator (`role=presentation` + `aria-hidden`). Anything projected
 * wins; otherwise the default chevron renders (single swap-point in
 * breadcrumb.icons.ts, injected via [innerHTML]).
 *
 * DEVIATION FROM TOKEN-VERBATIM (documented): `cn-breadcrumb-separator` sizes via
 * `[&>svg]:size-3.5` (direct child). The injected default icon lives in a wrapper
 * span, so the host adds the descendant form `[&_svg]:size-3.5` so both the
 * default and a projected svg size uniformly; `[&_svg]:fill-current` is the icon
 * colour rule (Material Symbols svgs carry no fill attribute).
 */
@Component({
  selector: "[uiBreadcrumbSeparator]",
  standalone: true,
  templateUrl: "./breadcrumb-separator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class BreadcrumbSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>("content")
  protected readonly showDefault = signal(true)

  protected readonly defaultIcon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(BREADCRUMB_SEPARATOR_SVG)

  protected readonly classes = computed(() =>
    cn("cn-breadcrumb-separator [&_svg]:size-3.5 [&_svg]:fill-current", this.className())
  )

  constructor() {
    // Show the default chevron unless the caller projected a custom separator.
    // afterNextRender reads the projected DOM after the first paint (no NG0100),
    // browser-only so it never runs during SSR/prerender.
    afterNextRender(() => {
      const el = this.contentRef().nativeElement
      const hasProjected = Array.from(el.childNodes).some(
        (n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent?.trim() ?? "") !== ""
      )
      if (hasProjected) {
        this.showDefault.set(false)
      }
    })
  }
}

/**
 * Collapsed-crumbs indicator. A11y: `aria-hidden` is scoped to the icon wrapper
 * only — on the host it would also hide the sr-only "More" label (WCAG 4.1.2).
 */
@Component({
  selector: "[uiBreadcrumbEllipsis]",
  standalone: true,
  templateUrl: "./breadcrumb-ellipsis.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "[class]": "classes()",
  },
})
export class BreadcrumbEllipsisComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly icon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(BREADCRUMB_ELLIPSIS_SVG)

  protected readonly classes = computed(() =>
    cn("cn-breadcrumb-ellipsis flex items-center justify-center", this.className())
  )
}

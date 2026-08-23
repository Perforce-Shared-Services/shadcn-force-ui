import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "../../lib/utils"
import { buttonVariants, type ButtonSize } from "../button"

import {
  PAGINATION_ELLIPSIS_SVG,
  PAGINATION_NEXT_SVG,
  PAGINATION_PREVIOUS_SVG,
} from "./pagination.icons"

/**
 * Angular port of the registry pagination family (force-ui style).
 *
 * Attribute selectors on native elements — usage:
 *   <nav uiPagination aria-label="…">
 *     <ul uiPaginationContent>
 *       <li uiPaginationItem><a uiPaginationLink href="…" isActive>1</a></li>
 *       <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
 *       <li uiPaginationItem><span uiPaginationEllipsis></span></li>
 *       …
 *     </ul>
 *   </nav>
 *
 * The registry composes Previous/Next as `<PaginationLink>` wrapping a
 * `<Button>`; Angular cannot stack two `@Component`s on one host, so they
 * reproduce that composition via the shared `buttonVariants` cva (same reuse
 * the registry expresses) plus the `cn-pagination-previous`/`-next` CSS
 * tokens. Class names mirror apps/v4/registry/bases/radix/ui/pagination.tsx;
 * token bodies live in style-force-ui.css.
 */

@Component({
  selector: "nav[uiPagination]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination",
    role: "navigation",
    "[attr.aria-label]": 'ariaLabel()',
    "[class]": "classes()",
  },
})
export class PaginationComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // Registry hardcodes aria-label="pagination"; overridable for a more
  // specific landmark label.
  readonly ariaLabel = input<string>("pagination", { alias: "aria-label" })

  protected readonly classes = computed(() =>
    cn("cn-pagination mx-auto flex w-full justify-center", this.className()),
  )
}

@Component({
  selector: "ul[uiPaginationContent]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-content",
    "[class]": "classes()",
  },
})
export class PaginationContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-pagination-content flex items-center", this.className()),
  )
}

@Component({
  selector: "li[uiPaginationItem]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-item",
    "[class]": "classes()",
  },
})
export class PaginationItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // Registry spreads props with no base class; cn(className()) reproduces that.
  protected readonly classes = computed(() => cn(this.className()))
}

@Component({
  selector: "[uiPaginationLink]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-link",
    "[attr.data-active]": "isActive()",
    "[attr.aria-current]": 'isActive() ? "page" : null',
    "[class]": "classes()",
  },
})
export class PaginationLinkComponent {
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly size = input<ButtonSize>("icon")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.isActive() ? "outline" : "ghost", size: this.size() }),
      "cn-pagination-link",
      this.className(),
    ),
  )
}

@Component({
  selector: "a[uiPaginationPrevious]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  host: {
    "data-slot": "pagination-link",
    "[attr.aria-label]": "ariaLabel()",
    "[class]": "classes()",
  },
  template: `
    <span data-icon="inline-start" aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
    <span class="cn-pagination-previous-text hidden sm:block">{{ text() }}</span>
  `,
})
export class PaginationPreviousComponent {
  readonly text = input("Previous")
  readonly size = input<ButtonSize>("default")
  readonly ariaLabel = input<string>("Go to previous page", { alias: "aria-label" })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_PREVIOUS_SVG,
  )

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: "ghost", size: this.size() }),
      "cn-pagination-previous",
      this.className(),
    ),
  )
}

@Component({
  selector: "a[uiPaginationNext]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-link",
    "[attr.aria-label]": "ariaLabel()",
    "[class]": "classes()",
  },
  template: `
    <span class="cn-pagination-next-text hidden sm:block">{{ text() }}</span>
    <span data-icon="inline-end" aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
  `,
})
export class PaginationNextComponent {
  readonly text = input("Next")
  readonly size = input<ButtonSize>("default")
  readonly ariaLabel = input<string>("Go to next page", { alias: "aria-label" })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_NEXT_SVG,
  )

  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: "ghost", size: this.size() }), "cn-pagination-next", this.className()),
  )
}

@Component({
  selector: "span[uiPaginationEllipsis]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-ellipsis",
    role: "presentation",
    "[class]": "classes()",
  },
  template: `
    <span aria-hidden="true" [innerHTML]="icon"></span>
    <span class="sr-only">More pages</span>
  `,
})
export class PaginationEllipsisComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // [FORCE-UI] aria-hidden scoped to the icon only — hiding it on the host span
  // would also hide the sr-only label below (WCAG 4.1.2), same fix as React.
  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_ELLIPSIS_SVG,
  )

  protected readonly classes = computed(() =>
    cn("cn-pagination-ellipsis flex items-center justify-center", this.className()),
  )
}

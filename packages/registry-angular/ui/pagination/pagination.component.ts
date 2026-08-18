import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonSize } from "../button/button.variants"
import {
  CHEVRON_LEFT_SVG,
  CHEVRON_RIGHT_SVG,
  MORE_HORIZ_SVG,
} from "./pagination.icons"

/**
 * Angular port of @force-ui/pagination (radix-force-ui style).
 *
 * Purely presentational — no page state is owned here; the host application
 * decides which link is active and what each href points at.
 *
 * Usage:
 *   <nav uiPagination>
 *     <ul uiPaginationContent>
 *       <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
 *       <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
 *       <li uiPaginationItem><a uiPaginationLink href="#" isActive>2</a></li>
 *       <li uiPaginationItem><span uiPaginationEllipsis></span></li>
 *       <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
 *     </ul>
 *   </nav>
 *
 * PaginationLink/Previous/Next apply the button CVA classes directly rather
 * than instantiating ButtonComponent — see DIVERGENCES.md § pagination.
 */
@Component({
  selector: "nav[uiPagination]",
  standalone: true,
  templateUrl: "./pagination.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    "[class]": "classes()",
  },
})
export class PaginationComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-pagination mx-auto flex w-full justify-center", this.className())
  )
}

@Component({
  selector: "ul[uiPaginationContent]",
  standalone: true,
  templateUrl: "./pagination.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-content",
    "[class]": "classes()",
  },
})
export class PaginationContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-pagination-content flex items-center", this.className())
  )
}

@Component({
  selector: "li[uiPaginationItem]",
  standalone: true,
  templateUrl: "./pagination.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-item",
    "[class]": "classes()",
  },
})
export class PaginationItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn(this.className()))
}

@Component({
  selector: "a[uiPaginationLink]",
  standalone: true,
  templateUrl: "./pagination.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-link",
    "[attr.aria-current]": "isActive() ? 'page' : null",
    "[attr.data-active]": "isActive()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class PaginationLinkComponent {
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly size = input<ButtonSize>("icon")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({
        variant: this.isActive() ? "outline" : "ghost",
        size: this.size(),
      }),
      "cn-pagination-link",
      this.className()
    )
  )
}

@Component({
  selector: "a[uiPaginationPrevious]",
  standalone: true,
  templateUrl: "./pagination-previous.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-link",
    "aria-label": "Go to previous page",
    "data-size": "default",
    "[class]": "classes()",
  },
})
export class PaginationPreviousComponent {
  readonly text = input("Previous")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly previousIcon: SafeHtml = inject(
    DomSanitizer
  ).bypassSecurityTrustHtml(CHEVRON_LEFT_SVG)

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: "ghost", size: "default" }),
      "cn-pagination-previous",
      this.className()
    )
  )
}

@Component({
  selector: "a[uiPaginationNext]",
  standalone: true,
  templateUrl: "./pagination-next.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "pagination-link",
    "aria-label": "Go to next page",
    "data-size": "default",
    "[class]": "classes()",
  },
})
export class PaginationNextComponent {
  readonly text = input("Next")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly nextIcon: SafeHtml = inject(
    DomSanitizer
  ).bypassSecurityTrustHtml(CHEVRON_RIGHT_SVG)

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: "ghost", size: "default" }),
      "cn-pagination-next",
      this.className()
    )
  )
}

@Component({
  selector: "span[uiPaginationEllipsis]",
  standalone: true,
  templateUrl: "./pagination-ellipsis.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "presentation",
    "data-slot": "pagination-ellipsis",
    "[class]": "classes()",
  },
})
export class PaginationEllipsisComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly moreIcon: SafeHtml = inject(
    DomSanitizer
  ).bypassSecurityTrustHtml(MORE_HORIZ_SVG)

  protected readonly classes = computed(() =>
    cn(
      "cn-pagination-ellipsis flex items-center justify-center",
      this.className()
    )
  )
}

import { Component } from "@angular/core"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/angular-ui/pagination"

// apps/v4/examples/base/pagination-rtl.tsx
//
// Angular port convention: static Arabic labels + `dir="rtl"` on the root
// (the React example switches ar/he/en via useTranslation; the preview app has
// no runtime i18n). Digits stay Latin — React only renders Arabic-Indic
// numerals for the "ar" locale, and `dir` flips layout order either way.
@Component({
  selector: "preview-pagination-rtl",
  standalone: true,
  imports: [
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
  ],
  template: `
    <nav uiPagination dir="rtl">
      <ul uiPaginationContent>
        <li uiPaginationItem>
          <a uiPaginationPrevious href="#" text="السابق"></a>
        </li>
        <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
        <li uiPaginationItem><a uiPaginationLink href="#" isActive>2</a></li>
        <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
        <li uiPaginationItem><span uiPaginationEllipsis></span></li>
        <li uiPaginationItem>
          <a uiPaginationNext href="#" text="التالي"></a>
        </li>
      </ul>
    </nav>
  `,
})
export class PaginationRtlComponent {}

export default PaginationRtlComponent

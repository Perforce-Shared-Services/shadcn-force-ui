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

// apps/v4/examples/base/pagination-demo.tsx
@Component({
  selector: "preview-pagination-demo",
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
    <nav uiPagination>
      <ul uiPaginationContent>
        <li uiPaginationItem>
          <a uiPaginationPrevious href="#"></a>
        </li>
        <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
        <li uiPaginationItem><a uiPaginationLink href="#" isActive>2</a></li>
        <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
        <li uiPaginationItem><span uiPaginationEllipsis></span></li>
        <li uiPaginationItem>
          <a uiPaginationNext href="#"></a>
        </li>
      </ul>
    </nav>
  `,
})
export class PaginationDemoComponent {}

export default PaginationDemoComponent

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/angular-ui/pagination"
import { Component } from "@angular/core"

@Component({
  selector: "preview-pagination-demo",
  standalone: true,
  imports: [
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  ],
  template: `<nav uiPagination>
    <ul uiPaginationContent>
      <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
      <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
      <li uiPaginationItem>
        <a uiPaginationLink href="#" isActive>2</a>
      </li>
      <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
      <li uiPaginationItem><span uiPaginationEllipsis></span></li>
      <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
    </ul>
  </nav>`,
})
export class PaginationDemoComponent {}

export default PaginationDemoComponent

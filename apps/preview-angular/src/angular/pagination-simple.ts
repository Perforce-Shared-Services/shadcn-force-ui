import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/angular-ui/pagination"
import { Component } from "@angular/core"

@Component({
  selector: "preview-pagination-simple",
  standalone: true,
  imports: [Pagination, PaginationContent, PaginationItem, PaginationLink],
  template: `<nav uiPagination>
    <ul uiPaginationContent>
      <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
      <li uiPaginationItem>
        <a uiPaginationLink href="#" isActive>2</a>
      </li>
      <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
      <li uiPaginationItem><a uiPaginationLink href="#">4</a></li>
      <li uiPaginationItem><a uiPaginationLink href="#">5</a></li>
    </ul>
  </nav>`,
})
export class PaginationSimpleComponent {}

export default PaginationSimpleComponent

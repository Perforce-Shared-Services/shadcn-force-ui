import { Component } from "@angular/core"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/angular-ui/pagination"

// apps/v4/examples/base/pagination-simple.tsx
@Component({
  selector: "preview-pagination-simple",
  standalone: true,
  imports: [Pagination, PaginationContent, PaginationItem, PaginationLink],
  template: `
    <nav uiPagination>
      <ul uiPaginationContent>
        @for (page of pages; track page) {
          <li uiPaginationItem>
            <a uiPaginationLink href="#" [isActive]="page === 2">{{ page }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class PaginationSimpleComponent {
  readonly pages = [1, 2, 3, 4, 5]
}

export default PaginationSimpleComponent

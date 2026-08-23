import { Component } from "@angular/core"

import { Field, FieldLabel } from "@/angular-ui/field"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/angular-ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

// apps/v4/examples/base/pagination-icons-only.tsx
@Component({
  selector: "preview-pagination-icons-only",
  standalone: true,
  imports: [
    Field,
    FieldLabel,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectPortal,
    SelectPositioner,
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
  ],
  template: `
    <div class="flex items-center justify-between gap-4">
      <div uiField orientation="horizontal" class="w-fit">
        <label uiFieldLabel for="select-rows-per-page">Rows per page</label>
        <div uiSelect defaultValue="25">
          <button uiSelectTrigger class="w-20" id="select-rows-per-page">
            <span uiSelectValue placeholder=""></span>
          </button>
          <ng-template uiSelectPortal>
            <div uiSelectPositioner>
              <div uiSelectContent align="start">
                <div uiSelectGroup>
                  <div uiSelectItem value="10">10</div>
                  <div uiSelectItem value="25">25</div>
                  <div uiSelectItem value="50">50</div>
                  <div uiSelectItem value="100">100</div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <nav uiPagination class="mx-0 w-auto">
        <ul uiPaginationContent>
          <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
          <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
        </ul>
      </nav>
    </div>
  `,
})
export class PaginationIconsOnlyComponent {}

export default PaginationIconsOnlyComponent

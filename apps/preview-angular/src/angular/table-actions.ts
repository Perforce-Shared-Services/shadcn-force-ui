import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/angular-ui/table"

// React example composes a DropdownMenu per row. The Angular dropdown-menu
// port is pending, so the preview renders the ghost icon trigger only — the
// menu composition lands with that port (same documented deviation as
// breadcrumb-dropdown).
@Component({
  selector: "preview-table-actions",
  standalone: true,
  imports: [Button, TableBody, TableCell, Table, TableHead, TableHeader, TableRow],
  template: `
    <div uiTableContainer>
      <table uiTable>
        <thead uiTableHeader>
          <tr uiTableRow>
            <th uiTableHead>Product</th>
            <th uiTableHead>Price</th>
            <th uiTableHead class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody uiTableBody>
          @for (product of products; track product.name) {
            <tr uiTableRow>
              <td uiTableCell class="font-medium">{{ product.name }}</td>
              <td uiTableCell>{{ product.price }}</td>
              <td uiTableCell class="text-right">
                <button uiButton variant="ghost" size="icon" class="size-8">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path
                      d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"
                    />
                  </svg>
                  <span class="sr-only">Open menu</span>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TableActionsComponent {
  readonly products = [
    { name: "Wireless Mouse", price: "$29.99" },
    { name: "Mechanical Keyboard", price: "$129.99" },
    { name: "USB-C Hub", price: "$49.99" },
  ]
}

export default TableActionsComponent

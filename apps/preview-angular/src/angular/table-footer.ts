import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/angular-ui/table"
import { Component } from "@angular/core"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
]

@Component({
  selector: "preview-table-footer",
  standalone: true,
  imports: [
    TableContainer,
    Table,
    TableCaption,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
  ],
  template: ` <div uiTableContainer>
    <table uiTable>
      <caption uiTableCaption>
        A list of your recent invoices.
      </caption>
      <thead uiTableHeader>
        <tr uiTableRow>
          <th uiTableHead class="w-[100px]">Invoice</th>
          <th uiTableHead>Status</th>
          <th uiTableHead>Method</th>
          <th uiTableHead class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody uiTableBody>
        @for (invoice of invoices; track invoice.invoice) {
          <tr uiTableRow>
            <td uiTableCell class="font-medium">{{ invoice.invoice }}</td>
            <td uiTableCell>{{ invoice.paymentStatus }}</td>
            <td uiTableCell>{{ invoice.paymentMethod }}</td>
            <td uiTableCell class="text-right">{{ invoice.totalAmount }}</td>
          </tr>
        }
      </tbody>
      <tfoot uiTableFooter>
        <tr uiTableRow>
          <td uiTableCell colspan="3">Total</td>
          <td uiTableCell class="text-right">$2,500.00</td>
        </tr>
      </tfoot>
    </table>
  </div>`,
})
export class TableFooterPreviewComponent {
  protected readonly invoices = invoices
}

export default TableFooterPreviewComponent

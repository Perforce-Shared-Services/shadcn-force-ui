import { Component } from "@angular/core"

import {
  TableContainer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/angular-ui/table"

// React example drives dir/labels from the language selector (ar). Static
// Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-table-rtl",
  standalone: true,
  imports: [TableBody, TableCaption, TableCell, Table, TableFooter, TableHead, TableHeader, TableRow],
  template: `
    <div uiTableContainer>
      <table uiTable dir="rtl">
        <caption uiTableCaption>قائمة بفواتيرك الأخيرة.</caption>
        <thead uiTableHeader>
          <tr uiTableRow>
            <th uiTableHead class="w-[100px]">الفاتورة</th>
            <th uiTableHead>الحالة</th>
            <th uiTableHead>الطريقة</th>
            <th uiTableHead class="text-right">المبلغ</th>
          </tr>
        </thead>
        <tbody uiTableBody>
          @for (invoice of invoices; track invoice.invoice) {
            <tr uiTableRow>
              <td uiTableCell class="font-medium">{{ invoice.invoice }}</td>
              <td uiTableCell>{{ statusLabels[invoice.paymentStatus] }}</td>
              <td uiTableCell>{{ methodLabels[invoice.paymentMethod] }}</td>
              <td uiTableCell class="text-right">{{ invoice.totalAmount }}</td>
            </tr>
          }
        </tbody>
        <tfoot uiTableFooter>
          <tr uiTableRow>
            <td uiTableCell [attr.colspan]="3">المجموع</td>
            <td uiTableCell class="text-right">$2,500.00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
})
export class TableRtlComponent {
  readonly statusLabels: Record<string, string> = {
    paid: "مدفوع",
    pending: "قيد الانتظار",
    unpaid: "غير مدفوع",
  }
  readonly methodLabels: Record<string, string> = {
    creditCard: "بطاقة ائتمانية",
    paypal: "PayPal",
    bankTransfer: "تحويل بنكي",
  }
  readonly invoices = [
    { invoice: "INV001", paymentStatus: "paid", totalAmount: "$250.00", paymentMethod: "creditCard" },
    { invoice: "INV002", paymentStatus: "pending", totalAmount: "$150.00", paymentMethod: "paypal" },
    { invoice: "INV003", paymentStatus: "unpaid", totalAmount: "$350.00", paymentMethod: "bankTransfer" },
    { invoice: "INV004", paymentStatus: "paid", totalAmount: "$450.00", paymentMethod: "creditCard" },
    { invoice: "INV005", paymentStatus: "paid", totalAmount: "$550.00", paymentMethod: "paypal" },
    { invoice: "INV006", paymentStatus: "pending", totalAmount: "$200.00", paymentMethod: "bankTransfer" },
    { invoice: "INV007", paymentStatus: "unpaid", totalAmount: "$300.00", paymentMethod: "creditCard" },
  ]
}

export default TableRtlComponent

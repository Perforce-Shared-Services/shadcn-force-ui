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
    paymentStatus: "مدفوع",
    totalAmount: "$250.00",
    paymentMethod: "بطاقة ائتمانية",
  },
  {
    invoice: "INV002",
    paymentStatus: "قيد الانتظار",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "غير مدفوع",
    totalAmount: "$350.00",
    paymentMethod: "تحويل بنكي",
  },
  {
    invoice: "INV004",
    paymentStatus: "مدفوع",
    totalAmount: "$450.00",
    paymentMethod: "بطاقة ائتمانية",
  },
  {
    invoice: "INV005",
    paymentStatus: "مدفوع",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "قيد الانتظار",
    totalAmount: "$200.00",
    paymentMethod: "تحويل بنكي",
  },
  {
    invoice: "INV007",
    paymentStatus: "غير مدفوع",
    totalAmount: "$300.00",
    paymentMethod: "بطاقة ائتمانية",
  },
]

@Component({
  selector: "preview-table-rtl",
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
    <table uiTable dir="rtl">
      <caption uiTableCaption>
        قائمة بفواتيرك الأخيرة.
      </caption>
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
            <td uiTableCell>{{ invoice.paymentStatus }}</td>
            <td uiTableCell>{{ invoice.paymentMethod }}</td>
            <td uiTableCell class="text-right">{{ invoice.totalAmount }}</td>
          </tr>
        }
      </tbody>
      <tfoot uiTableFooter>
        <tr uiTableRow>
          <td uiTableCell colspan="3">المجموع</td>
          <td uiTableCell class="text-right">$2,500.00</td>
        </tr>
      </tfoot>
    </table>
  </div>`,
})
export class TableRtlComponent {
  protected readonly invoices = invoices
}

export default TableRtlComponent

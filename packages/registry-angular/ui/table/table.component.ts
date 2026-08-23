import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"
import {
  tableBodyVariants,
  tableCaptionVariants,
  tableCellVariants,
  tableContainerVariants,
  tableFooterVariants,
  tableHeadVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableVariants,
} from "./table.variants"

/**
 * Angular port of @force-ui/table (radix-force-ui style).
 *
 * Attribute selectors — each part decorates the real HTML table element the
 * caller writes (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, …) with the
 * cn-table* token classes plus the `data-slot` attribute, preserving native
 * table semantics for assistive tech.
 *
 * Usage:
 *   <div uiTableContainer>
 *     <table uiTable>
 *       <caption uiTableCaption>A list of your recent invoices.</caption>
 *       <thead uiTableHeader>
 *         <tr uiTableRow>
 *           <th uiTableHead>Invoice</th>
 *           <th uiTableHead class="text-right">Amount</th>
 *         </tr>
 *       </thead>
 *       <tbody uiTableBody>
 *         <tr uiTableRow>
 *           <td uiTableCell class="font-medium">INV001</td>
 *           <td uiTableCell class="text-right">$250.00</td>
 *         </tr>
 *       </tbody>
 *       <tfoot uiTableFooter>
 *         <tr uiTableRow>…</tr>
 *       </tfoot>
 *     </table>
 *   </div>
 *
 * `[uiTableContainer]` is the Angular split of the registry's internal wrapper
 * `<div data-slot="table-container">` — an attribute selector can't wrap its
 * own host, so the overflow-x scroller frame is exposed as an opt-in directive.
 * Wrap with it whenever a table can be wider than its columns.
 *
 * Row selection: set `data-state="selected"` (and `aria-selected="true"`) on a
 * `<tr uiTableRow>` from the caller's selection model; the row tints via
 * `cn-table-row`. A row that expands a nested detail region gets the muted
 * tint automatically through `has-aria-expanded:bg-muted/50`.
 */
const HOST = {
  template: "table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
} as const

@Component({
  selector: "[uiTableContainer]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-container", "[class]": "classes()" },
})
export class TableContainerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableContainerVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTable]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table", "[class]": "classes()" },
})
export class TableComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableHeader]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-header", "[class]": "classes()" },
})
export class TableHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableHeaderVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableBody]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-body", "[class]": "classes()" },
})
export class TableBodyComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableBodyVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableFooter]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-footer", "[class]": "classes()" },
})
export class TableFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableFooterVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableRow]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-row", "[class]": "classes()" },
})
export class TableRowComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableRowVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableHead]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-head", "[class]": "classes()" },
})
export class TableHeadComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableHeadVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableCell]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-cell", "[class]": "classes()" },
})
export class TableCellComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableCellVariants({ class: this.className() })
  )
}

@Component({
  selector: "[uiTableCaption]",
  standalone: true,
  templateUrl: HOST.template,
  changeDetection: HOST.changeDetection,
  host: { "data-slot": "table-caption", "[class]": "classes()" },
})
export class TableCaptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    tableCaptionVariants({ class: this.className() })
  )
}

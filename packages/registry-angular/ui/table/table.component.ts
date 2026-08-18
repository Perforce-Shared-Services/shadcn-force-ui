import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/table (radix-force-ui style).
 *
 * All parts use attribute selectors so the host element keeps its native table
 * semantics (WCAG 4.1.2). React's `Table` renders the scroll container `<div>`
 * around the `<table>` itself; an Angular attribute-selector component cannot
 * wrap its own host, so the container is a separate part the caller nests
 * explicitly — see DIVERGENCES.md §table-1.
 *
 * Usage:
 *   <div uiTableContainer>
 *     <table uiTable>
 *       <caption uiTableCaption>A list of your recent invoices.</caption>
 *       <thead uiTableHeader>
 *         <tr uiTableRow><th uiTableHead>Invoice</th></tr>
 *       </thead>
 *       <tbody uiTableBody>
 *         <tr uiTableRow><td uiTableCell>INV001</td></tr>
 *       </tbody>
 *       <tfoot uiTableFooter>
 *         <tr uiTableRow><td uiTableCell>Total</td></tr>
 *       </tfoot>
 *     </table>
 *   </div>
 */
@Component({
  selector: "div[uiTableContainer]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-container",
    "[class]": "classes()",
  },
})
export class TableContainerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-container", this.className())
  )
}

@Component({
  selector: "table[uiTable]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table",
    "[class]": "classes()",
  },
})
export class TableComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-table", this.className()))
}

@Component({
  selector: "thead[uiTableHeader]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-header",
    "[class]": "classes()",
  },
})
export class TableHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-header", this.className())
  )
}

@Component({
  selector: "tbody[uiTableBody]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-body",
    "[class]": "classes()",
  },
})
export class TableBodyComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-body", this.className())
  )
}

@Component({
  selector: "tfoot[uiTableFooter]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-footer",
    "[class]": "classes()",
  },
})
export class TableFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-footer", this.className())
  )
}

@Component({
  selector: "tr[uiTableRow]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-row",
    "[class]": "classes()",
  },
})
export class TableRowComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-row has-aria-expanded:bg-muted/50", this.className())
  )
}

@Component({
  selector: "th[uiTableHead]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-head",
    "[class]": "classes()",
  },
})
export class TableHeadComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-head", this.className())
  )
}

@Component({
  selector: "td[uiTableCell]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-cell",
    "[class]": "classes()",
  },
})
export class TableCellComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-cell", this.className())
  )
}

@Component({
  selector: "caption[uiTableCaption]",
  standalone: true,
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "table-caption",
    "[class]": "classes()",
  },
})
export class TableCaptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-table-caption", this.className())
  )
}

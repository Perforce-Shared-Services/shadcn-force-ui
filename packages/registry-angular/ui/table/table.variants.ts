import { cva } from "class-variance-authority"

// Table is purely presentational — no variant props exist in the React source
// or the pd-p4one reference. Each part is a single-base CVA over the cn-table*
// token classes from style-force-ui.css; the build pipeline expands the tokens.
export const tableContainerVariants = cva("cn-table-container")

export const tableVariants = cva("cn-table")

export const tableHeaderVariants = cva("cn-table-header")

export const tableBodyVariants = cva("cn-table-body")

export const tableFooterVariants = cva("cn-table-footer")

export const tableRowVariants = cva(
  // `has-aria-expanded:bg-muted/50` mirrors the React CVA base — rows that
  // expand a nested detail region tint like hovered rows. Not in cn-table-row.
  "cn-table-row has-aria-expanded:bg-muted/50",
)

export const tableHeadVariants = cva("cn-table-head")

export const tableCellVariants = cva("cn-table-cell")

export const tableCaptionVariants = cva("cn-table-caption")

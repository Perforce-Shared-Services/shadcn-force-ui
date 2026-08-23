import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-field tokens from style-force-ui.css.
// Only the Field wrapper carries a cva; every other sub-component is a single
// fixed base-class string.
//
// orientation:
// - vertical (default) — label stacked above the control.
// - horizontal — label and control on one row (e.g. a checkbox/switch row).
// - responsive — vertical until the @md/field-group container query, then
//   horizontal. Requires an ancestor FieldGroup (it owns the @container).
export const fieldVariants = cva("cn-field group/field flex w-full", {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

export type FieldVariants = VariantProps<typeof fieldVariants>
export type FieldOrientation = NonNullable<FieldVariants["orientation"]>

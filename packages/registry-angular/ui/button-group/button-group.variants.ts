import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-button-group* tokens from style-force-ui.css.
// The rounding / border-removal / focus z-index / flex-col rules are NOT covered
// by any cn-button-group-* token (see DIVERGENCES.md §button-group-4) — they are
// inlined verbatim from the registry source (bases/radix/ui/button-group.tsx).
export const buttonGroupVariants = cva(
  "cn-button-group group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "cn-button-group-orientation-vertical flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants["orientation"]>

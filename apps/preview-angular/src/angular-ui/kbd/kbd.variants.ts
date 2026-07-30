import { cva, type VariantProps } from "class-variance-authority"

// [&_svg]:fill-current added — Material Symbols SVGs are fill-based.
// See DIVERGENCES.md §kbd-1.
export const kbdVariants = cva(
  "cn-kbd pointer-events-none inline-flex items-center justify-center select-none [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default: "cn-kbd-variant-default",
        primary: "cn-kbd-variant-primary",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type KbdVariants = VariantProps<typeof kbdVariants>
export type KbdVariant = NonNullable<KbdVariants["variant"]>

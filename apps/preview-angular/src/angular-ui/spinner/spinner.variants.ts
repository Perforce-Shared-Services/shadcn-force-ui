import { cva, type VariantProps } from "class-variance-authority"

// cn-spinner base CSS class does not exist in style-force-ui.css — structural
// classes are inlined here. See DIVERGENCES.md §spinner-1.
//
// animate-spinner (500ms linear) is the Force spec value. The consuming app's
// tailwind.css must define: --animate-spinner: spin 500ms linear infinite
// See DIVERGENCES.md §spinner-2.
//
// [&_svg]:fill-current added — Material Symbols SVGs are fill-based.
// See DIVERGENCES.md §spinner-4.
export const spinnerVariants = cva(
  "inline-flex shrink-0 items-center justify-center animate-spinner motion-reduce:animate-none [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:fill-current",
  {
    variants: {
      color: {
        default: "cn-spinner-color-default",
        primary: "cn-spinner-color-primary",
        onPrimary: "cn-spinner-color-onPrimary",
        inherit: "cn-spinner-color-inherit",
      },
      size: {
        xs: "cn-spinner-size-xs",
        sm: "cn-spinner-size-sm",
        md: "cn-spinner-size-md",
        lg: "cn-spinner-size-lg",
      },
    },
    defaultVariants: { color: "default", size: "sm" },
  }
)

export type SpinnerVariants = VariantProps<typeof spinnerVariants>
export type SpinnerColor = NonNullable<SpinnerVariants["color"]>
export type SpinnerSize = NonNullable<SpinnerVariants["size"]>

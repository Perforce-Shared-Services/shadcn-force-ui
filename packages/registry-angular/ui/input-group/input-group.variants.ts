import { cva, type VariantProps } from "class-variance-authority"

/**
 * Fill-variant axis for the input-group wrapper — mirrors `input`'s axis:
 * outline (default) / filled / underline / ghost. Token-only via
 * cn-input-group / cn-input-group-variant-* in style-force-ui.css. The base
 * carries the shared group chrome (focus-within ring, aria-invalid rebind,
 * addon layout has-[] selectors); each variant only swaps border/bg.
 */
export const inputGroupVariants = cva(
  "group/input-group cn-input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto",
  {
    variants: {
      variant: {
        outline: "cn-input-group-variant-outline", // [FORCE-UI]
        filled: "cn-input-group-variant-filled", // [FORCE-UI]
        underline: "cn-input-group-variant-underline", // [FORCE-UI]
        ghost: "cn-input-group-variant-ghost", // [FORCE-UI]
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>
export type InputGroupVariant = NonNullable<InputGroupVariants["variant"]>

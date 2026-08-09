import { cva, type VariantProps } from "class-variance-authority"

export const inputVariants = cva(
  "cn-input w-full min-w-0 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: "cn-input-variant-outline",
        filled: "cn-input-variant-filled",
        underline: "cn-input-variant-underline",
        ghost: "cn-input-variant-ghost",
      },
    },
    defaultVariants: { variant: "outline" },
  }
)

export type InputVariants = VariantProps<typeof inputVariants>
export type InputVariant = NonNullable<InputVariants["variant"]>

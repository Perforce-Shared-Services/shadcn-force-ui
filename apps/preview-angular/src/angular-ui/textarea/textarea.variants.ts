import { cva, type VariantProps } from "class-variance-authority"

export const textareaVariants = cva(
  "cn-textarea flex field-sizing-content min-h-16 w-full transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: "cn-textarea-variant-outline",
        filled: "cn-textarea-variant-filled",
        underline: "cn-textarea-variant-underline",
        ghost: "cn-textarea-variant-ghost",
      },
    },
    defaultVariants: { variant: "outline" },
  }
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
export type TextareaVariant = NonNullable<TextareaVariants["variant"]>

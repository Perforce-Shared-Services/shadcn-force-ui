import { cva, type VariantProps } from "class-variance-authority"

export const alertVariants = cva(
  "cn-alert group/alert relative grid w-full gap-0.5",
  {
    variants: {
      variant: {
        default: "cn-alert-variant-default",
        destructive: "cn-alert-variant-destructive",
        warning: "cn-alert-variant-warning",
        success: "cn-alert-variant-success",
        info: "cn-alert-variant-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>
export type AlertVariant = NonNullable<AlertVariants["variant"]>

import { cva, type VariantProps } from "class-variance-authority"

export const tabsListVariants = cva(
  "cn-tabs-list group/tabs-list inline-flex items-center justify-center text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type TabsListVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>

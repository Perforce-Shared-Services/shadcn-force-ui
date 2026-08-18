import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/tabs.json
 * The upstream `.tsx` authoring source uses placeholder names; the registry
 * build step replaces them with the expanded Tailwind class strings reproduced
 * here verbatim. Do not edit values without updating both sides — parity with
 * the registry is the contract.
 */
export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type TabsListVariant = NonNullable<VariantProps<typeof tabsListVariants>['variant']>;

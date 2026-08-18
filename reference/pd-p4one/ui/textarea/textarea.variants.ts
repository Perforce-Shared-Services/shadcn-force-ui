import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Fill-variant axis for textarea — mirrors input/input-group so a multi-line
 * field can be outline / filled / underline / ghost too (P4 One extension; the
 * registry ships one style). Token-only, identical treatment to input.variants.ts:
 * - outline (default): light resting border-border -> hover border-input
 * - filled: same border tier + bg-muted
 * - underline: bottom rule only (keeps border-input; the line is the affordance)
 * - ghost: borderless until hover/focus
 *
 * The base carries sizing/auto-grow/text/focus-ring/read-only; each variant
 * swaps only border/radius/bg.
 */
export const textareaVariants = cva(
  'flex field-sizing-content min-h-16 w-full px-2.5 py-2 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&[readonly]]:bg-muted [&[readonly]]:border-border md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      variant: {
        outline:
          'rounded-lg border border-border hover:border-input bg-transparent disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80',
        filled: 'rounded-lg border border-border hover:border-input bg-muted',
        underline: 'rounded-none border-0 border-b border-input bg-transparent px-0',
        ghost: 'rounded-lg border border-transparent bg-transparent hover:bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
export type TextareaVariant = NonNullable<TextareaVariants['variant']>;

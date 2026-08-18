import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the class string published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/native-select.json
 * The registry keys its compact size off a `data-[size=sm]` selector; ported
 * as a plain cva `size` variant instead (matches the button/input-group
 * convention in this app) while the `data-size` attribute is still emitted on
 * the host for parity with the React/Vue/Svelte siblings.
 *
 * BORDER TIER: diverges from the registry's flat resting `border-input` to
 * match the tiered border already shipped on `input` and `select-trigger`
 * (light `border-border` at rest -> `border-input` on hover -> `border-ring`
 * on focus) — audit-flagged inconsistency between the DS's three field-shaped
 * components; two had already adopted the tier, this one hadn't.
 */
export const nativeSelectVariants = cva(
  'h-8 w-full min-w-0 appearance-none rounded-lg border border-border hover:border-input bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        default: '',
        sm: "h-7 rounded-[min(var(--radius-md),10px)] py-0.5",
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type NativeSelectVariants = VariantProps<typeof nativeSelectVariants>;
export type NativeSelectSize = NonNullable<NativeSelectVariants['size']>;

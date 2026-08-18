import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Force UI input — variant axis (P4 One extension).
 *
 * The upstream Force UI / shadcn registry input ships a SINGLE style (our
 * `outline` default) with no variant axis. These extra presets are a
 * deliberate, token-only P4 One addition so artists get the right field
 * treatment per surface — they introduce NO new tokens and NO hardcoded
 * values; every variant is expressed in existing Force UI utilities.
 *
 * BORDER TIER (maintainer-approved 2026-06-08): the bordered box variants
 * (outline, filled) use a LIGHT resting border (`border-border` = neutral-200,
 * ~1.2:1) that reinforces to `border-input` (neutral-500) on hover and to the
 * indigo `border-ring` on focus. The full-strength neutral-500 resting border
 * (4.8:1) read as too heavy; the Material/Primer-style tiered border is the
 * design call. This RELAXES WCAG 1.4.11 at rest (the resting border alone is
 * <3:1) — accepted because the input is identified by context + the hover/focus
 * tiers carry the strong boundary. `underline` keeps `border-input` (its line
 * is the entire affordance and must stay visible); `ghost` stays borderless.
 *
 * READ-ONLY (NN/g-reviewed): `[&[readonly]]:bg-muted [&[readonly]]:border-border`
 * gives a read-only field a muted, non-editable-looking surface WHILE the value
 * stays full-contrast (text-foreground) and the field stays focusable +
 * selectable + copyable + announced. It is deliberately NOT treated like
 * `disabled` (dimmed + out of tab order) — a read-only value is a real value the
 * user must be able to read and copy (generated id, workspace path). Scoped to
 * the `readonly` attribute (not the `:read-only` pseudo, which also matches
 * disabled).
 *
 * NOTE: this diverges from BOTH the upstream Force UI registry (which uses
 * border-input at rest) AND the Figma input (node 65:533) — recorded in
 * figma-component-map.json; the Figma resting border is being rebound to
 * base/border to match. The variant axis is also a code-ahead extension
 * (the registry/Figma ship one style).
 */
export const inputVariants = cva(
  'h-8 w-full min-w-0 px-2.5 py-1 text-base text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&[readonly]]:bg-muted [&[readonly]]:border-border md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      variant: {
        // Default — bordered, transparent fill. Light resting border that
        // reinforces on hover; focus -> border-ring (base). Diverges from the
        // registry's resting border-input (see the BORDER TIER note above).
        outline:
          'rounded-lg border border-border hover:border-input bg-transparent disabled:bg-muted dark:bg-input/30 dark:disabled:bg-muted',
        // Solid muted fill. The fill carries identification, so the resting
        // border can stay light (border-border) and reinforce on hover.
        // bg-muted is theme-aware (light + dark).
        filled: 'rounded-lg border border-border hover:border-input bg-muted',
        // Bottom rule only (Material-style). px-0 aligns text to the line.
        // The focus ring (from base) still provides the ≥3:1 focus signal.
        underline:
          'rounded-none border-0 border-b border-input bg-transparent px-0',
        // Borderless until hover/focus. NO resting boundary by design — only
        // use where the surrounding context already signals "editable" (a
        // hovered/selected table row, an inline-rename target). NOT a
        // standalone form field (WCAG 1.4.11 needs a perceivable boundary, and
        // a lone ghost input has none at rest). Hover tints to muted; focus
        // lights the indigo border + ring. See the GhostInContext story.
        ghost: 'rounded-lg border border-transparent bg-transparent hover:bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
export type InputVariant = NonNullable<InputVariants['variant']>;

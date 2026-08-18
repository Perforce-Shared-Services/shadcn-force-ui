import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/marker.json
 * Reproduced verbatim — every class already resolves to a real Force UI
 * token (`text-muted-foreground`, `bg-border`, `border-border`).
 *
 * Two app-compat additions over the registry string, both audit-driven
 * (2026-08-18):
 * - `[a]:transition-colors [a]:motion-reduce:transition-none` (WCAG 2.3.3) on
 *   the nested `<a>` clause itself — `transition-property` isn't inherited,
 *   so the guard has to sit on the same `[a]` selector as the hover clause it
 *   covers, not on the host. A marker hosted as a link
 *   (`[a]:hover:text-foreground`) would otherwise animate a color change on
 *   hover regardless of the user's prefers-reduced-motion setting.
 * - `[a]:outline-none [a]:focus-visible:ring-3 [a]:focus-visible:ring-ring/50`
 *   (WCAG 2.4.7) — this app resets `*:focus{outline:none}` globally
 *   (`styles.scss`), so a `uiMarker` hosted on `<a>` had NO visible focus
 *   indicator at all before this fix. Matches `item`/`bubble`'s
 *   `focus-visible:ring-*` convention for anchor/button hosts (registry has
 *   no border on Marker to color, so `focus-visible:border-ring` is skipped
 *   — the ring alone carries the indicator).
 */
export const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:transition-colors [a]:motion-reduce:transition-none [a]:hover:text-foreground [a]:outline-none [a]:focus-visible:ring-3 [a]:focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: '',
        separator:
          'before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border',
        border: 'border-b border-border pb-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type MarkerVariants = VariantProps<typeof markerVariants>;
export type MarkerVariant = NonNullable<MarkerVariants['variant']>;

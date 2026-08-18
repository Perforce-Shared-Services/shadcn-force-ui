import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Spinner variants.
 *
 * The Force UI registry ships spinner as a one-line `<svg className="size-4
 * animate-spin">` with no variant surface. The Force design spec (spinner.md),
 * however, defines two axes — `color` (default / primary / onPrimary / inherit)
 * and `size` (xs 12 / sm 16 / md 24 / lg 40) — so the port follows the spec,
 * which is the canon for component anatomy. There are no shadcn variant NAMES
 * to preserve here (the registry source has none).
 *
 * Token mapping (spec role → app token utility, all from `tailwind.css`):
 * - color.default   → `text-muted-foreground`  (spec `--force-color-text-tertiary`,
 *   de-emphasized neutral — inline validation, secondary affordances)
 * - color.primary   → `text-primary`            (spec `text-primary-brand`, indigo —
 *   the sole progress affordance, e.g. a page-level overlay)
 * - color.onPrimary → `text-primary-foreground` (spec `text-on-primary` — flips
 *   white↔black with the theme so it stays legible on a solid primary surface)
 * - color.inherit   → `text-current`            (spec `currentColor` — picks up the
 *   container's text color, e.g. inside a ghost button)
 *
 * Colour reaches the glyph via `[&_svg]:fill-current`: the Material Symbols
 * `progress_activity` glyph is fill-based and carries no `fill` attribute, so
 * without this it paints black instead of inheriting `currentColor` (same
 * reason as the button spinner).
 *
 * Sizes set the host box (`size-3/4/6/10` = 12/16/24/40px per spec); the glyph
 * fills it via `[&_svg]:size-full`. Stroke width is intrinsic to the glyph and
 * scales proportionally — a deliberate, documented divergence from the spec's
 * discrete 1.5/2/3px stroke table (one filled glyph cannot vary stroke).
 *
 * Motion: `animate-spinner` is one 360° rotation per 500ms, linear (the spec
 * value `--force-duration-entrance`; token defined in `tailwind.css`). Under
 * `prefers-reduced-motion` the rotation is stopped entirely (`animate-none`):
 * the arc holds static at full opacity and the container's `aria-live` status
 * text carries the "in progress" meaning (the spec's static-text-label
 * fallback). We do NOT use an opacity pulse here: Tailwind's `animate-pulse`
 * dips to 50% opacity, where the arc drops below the WCAG 1.4.11 non-text 3:1
 * threshold against its surface in several color/theme combinations. A static
 * full-opacity arc is both reduced-motion-safe (2.3.3) and contrast-safe.
 */
export const spinnerVariants = cva(
  'inline-flex shrink-0 items-center justify-center animate-spinner motion-reduce:animate-none [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:fill-current',
  {
    variants: {
      color: {
        default: 'text-muted-foreground',
        primary: 'text-primary',
        onPrimary: 'text-primary-foreground',
        inherit: 'text-current',
      },
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-10',
      },
    },
    defaultVariants: { color: 'default', size: 'sm' },
  },
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
export type SpinnerColor = NonNullable<SpinnerVariants['color']>;
export type SpinnerSize = NonNullable<SpinnerVariants['size']>;

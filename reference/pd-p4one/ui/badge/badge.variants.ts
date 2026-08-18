import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/badge.json
 * The upstream `.vue`/`.tsx` authoring source uses `cn-badge-*` placeholders;
 * the registry build step replaces them with the expanded Tailwind class
 * strings reproduced here verbatim. Do not edit values without updating both
 * sides — parity with the registry is the contract.
 *
 * Exception: `warning`, `success`, `info` are Perforce status extensions, not
 * in the upstream registry. Their colors are canonical in Figma "6. FUI
 * Semantic" and mirrored into tailwind.css. Keep them in sync with Figma, not
 * the registry.
 *
 * Tinted status variants (destructive/warning/success/info) use the EXPLICIT
 * `bg-{status}-subtle` + `text-{status}` tokens (the spec's subtle level, value
 * from 6. FUI Semantic) — NOT a computed `bg-{status}/10` opacity tint. This
 * follows Force spec P1 (explicit over computed) + P7 (token-only), matches the
 * alert pattern, and means Figma binds `base/{status}-subtle` directly (no
 * `custom/{status}\10` baked-alpha workaround var). `-subtle` is theme-aware, so
 * no `dark:` override is needed. See the feedback_spec_is_canon memory.
 *
 * Text is `uppercase` + `tracking-wide` (0.025em), applied by the component per
 * the Force spec badge pattern (the badge text treatment is component-owned and
 * must not be overridden per-instance). Write source labels human-readable
 * (`label="active"`, not `"ACTIVE"`) — the transform is applied here.
 *
 * Solid (strong) status variants — `success-solid` / `warning-solid` /
 * `info-solid` / `error-solid` — implement the spec's `strong` style. They use
 * the solid `bg-{status}-solid` fills (`--*-solid`, synced from 6. FUI Semantic
 * bg/{status} = the {hue}.500 primitive, .300 in dark) + the matching
 * `text-on-{status}` foreground. `on-warning` is BLACK (orange-500 fails AA with
 * white). The solid brand badge already exists as `default` (indigo).
 *
 * Out of scope (deferred, see project_spec_alignment_backlog memory): a `size`
 * axis (spec: xs/sm/md/lg) — this badge ships one size.
 *
 * Icons are caller-projected (no icon input) as an inline Material Symbols
 * `<svg>` child (imported from `@material-symbols/svg-400` via the `?raw`
 * webpack rule), tagged `data-icon="inline-start"` or `"inline-end"` for side
 * padding. The cva sizes the svg to 14px (`[&>svg]:size-3.5!`), keeps it
 * non-interactive (`pointer-events-none`), and applies `fill-current` so the
 * glyph inherits the variant's text colour — the Material Symbols SVGs carry no
 * `fill` attribute (fill-based, unlike Lucide's stroke set) and would otherwise
 * paint black.
 */
export const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium uppercase tracking-wide whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:fill-current [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary-hover',
        secondary:
          'bg-secondary text-secondary-foreground [a]:hover:bg-primary-subtle',
        // Audit (2026-06-07, /audit-component): dropped the per-variant
        // focus-visible:ring-{status}/20 overrides — at /20 over white they
        // render ~1.3:1 (fail WCAG 1.4.11) and diverge from the Figma decision
        // that the focus ring is a uniform base/ring. With them gone these fall
        // back to the base `focus-visible:ring-ring/50` (Force UI indigo) + the
        // solid `focus-visible:border-ring`. Intentional divergence from
        // registry verbatim for accessibility + Figma parity.
        destructive: 'bg-error-subtle text-error',
        warning: 'bg-warning-subtle text-warning',
        success: 'bg-success-subtle text-success',
        info: 'bg-info-subtle text-info',
        // Solid (strong) status fills — spec "strong" variant. bg-{status}-solid
        // = the {hue}.500 primitive (.300 in dark) + the matching on-{status}
        // foreground (white, except on-warning = black: orange-500 fails AA with
        // white). error-solid reuses --destructive (cranberry-500). Use sparingly
        // for max-attention statuses (critical/overdue counts, "action required").
        'success-solid': 'bg-success-solid text-on-success',
        'warning-solid': 'bg-warning-solid text-on-warning',
        'info-solid': 'bg-info-solid text-on-info',
        'error-solid': 'bg-destructive text-on-error',
        outline:
          'border-border text-foreground [a]:hover:bg-primary-subtle',
        ghost:
          'hover:bg-primary-subtle hover:text-foreground',
        link: 'text-link underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type BadgeVariant = NonNullable<BadgeVariants['variant']>;

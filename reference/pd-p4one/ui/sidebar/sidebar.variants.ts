import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant + size class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/sidebar.json
 * Registry-verbatim (modulo the `data-open`/`data-active` custom variants
 * already wired in tailwind.css). No DS deviations — unlike `ui/button`,
 * sidebar's default state has a transparent background, so the registry's
 * `disabled:opacity-50` on a text-only row is the same pattern already kept
 * verbatim by `ui/dropdown-menu`'s `data-disabled:opacity-50` and
 * `ui/command`'s `data-[disabled=true]:opacity-50` (only solid-fill controls
 * like the button needed the muted-token substitute).
 *
 * One real addition: `motion-reduce:transition-none` on the base string's
 * `transition-[width,height,padding]` — the registry ships none, but WCAG
 * 2.3.3 requires it (a11y, not polish, per the port skill's own mandatory
 * rule — missed during the initial port, added on audit).
 *
 * Second addition (maintainer-directed, 2026-07-02): an active-state accent
 * indicator, ported from an older internal design system's nav-item
 * component (not in the current Force UI registry or Figma component) — a
 * 4px rounded-pill bar in the gutter to the left of the active row. It does
 * NOT live in this class string: a `::before` pseudo-element on the button
 * was the first attempt and it silently clipped, because this base string
 * carries `overflow-hidden` (registry-verbatim, needed for `[&>span:last-
 * child]:truncate` label truncation) — a pseudo-element is part of its
 * originating element's render box for overflow purposes no matter which
 * positioned ancestor it resolves `left`/`top` against, so the indicator was
 * correctly positioned and still invisible. The fix moved it to a real
 * sibling `<span>` on `SidebarMenuItemComponent` (which has `overflow:
 * visible`), reacting to this button's `data-active` via `peer-data-active/
 * menu-button:` — see that component's doc comment for the full story.
 */
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] motion-reduce:transition-none group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        // DEVIATION FROM REGISTRY-VERBATIM: the upstream string wraps the
        // shadow color in `hsl(var(--sidebar-border))` — shadcn's original
        // theme stores CSS vars as bare HSL triplets (`220 13% 91%`), but
        // this app's tokens are full `rgb(r g b)` functions (Tailwind v4
        // convention used everywhere else in tailwind.css), so `hsl(rgb(...))`
        // would render garbage. Reference the var directly instead.
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
export type SidebarMenuButtonVariant = NonNullable<SidebarMenuButtonVariants['variant']>;
export type SidebarMenuButtonSize = NonNullable<SidebarMenuButtonVariants['size']>;

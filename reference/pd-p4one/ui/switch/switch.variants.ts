/**
 * Class strings for the Angular port of @force-ui/switch (radix-force-ui style),
 * published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/switch.json
 * Parity with the registry is the contract — don't edit values without
 * updating both sides.
 *
 * The registry has NO `cva` (no visual variants): geometry is driven by
 * `data-[size=...]:` utilities on the root so the separate thumb element can
 * read the size via `group-data-[size=...]/switch`. We keep that — `size` is an
 * `@Input()` bound to `data-size`, and both size's dimension classes live in
 * the single base string below. There is intentionally no `color` axis: the
 * Force spec's `danger` colour (a red filled track) is NOT how this design
 * system expresses a destructive switch — the Figma component (verified at sync
 * time) and the registry both express the destructive/error affordance as a
 * `aria-invalid` destructive BORDER, not a red fill. So the switch is
 * single-colour; "danger" == the invalid state below.
 *
 * Deliberate, documented deviations from the registry source:
 *
 * 1. `transition-all` → `transition-colors` (+ `motion-reduce:transition-none`).
 *    The registry root uses `transition-all`, which animates the focus ring
 *    (box-shadow) and border on keyboard focus — keyboard focus MUST be instant
 *    (port skill §2 / WCAG). `transition-colors` keeps the spec's track colour
 *    crossfade (bg over `--force-duration-fast` = Tailwind's default 150ms)
 *    without animating the ring; the thumb's slide is driven by its own
 *    `transition-transform` (see SWITCH_THUMB_CLASS). The `motion-reduce:` guard
 *    snaps the colour swap for reduced-motion users (WCAG 2.3.3 + spec).
 *
 * 2. `aria-invalid` — destructive border + destructive ring, with the dark
 *    border kept at FULL opacity. The registry ships
 *    `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20
 *    dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`.
 *    Verified against the Figma component (sync 2026-06-10): Figma's
 *    `State=Invalid` track is a 1px `base/destructive` border PLUS a 3px
 *    drop-shadow ring bound to `custom/destructive\20 dark:destructive\40` — i.e.
 *    exactly the registry's `ring-3 ring-destructive/20 dark:ring-destructive/40`.
 *    So the ring is KEPT (it's the destructive focus/error halo, same as the
 *    input/textarea/checkbox siblings). The ONLY change from the registry is
 *    dropping `dark:aria-invalid:border-destructive/50` so the dark border stays
 *    full-opacity `base/destructive` — this matches Figma's `base/destructive`
 *    (op 1) border AND lifts the dark border out of the systemic `border/50`
 *    1.4.11 contrast failure (see the dark-destructive-contrast memory). The
 *    ring layers on top of `focus-visible:ring-ring/50`; when a switch is both
 *    invalid and focused, source-order gives the destructive ring (error context
 *    wins), matching the registry behavior.
 *
 * 3. Hover states (spec-mandated, not in the registry — same approach as the
 *    sibling checkbox). On the resting ON track the colour transitions one step
 *    (`bg-primary-hover`); on the resting OFF track the transparent border
 *    becomes visible (`border-input`) — the closest token-only stand-in for the
 *    spec's "border → border-strong" (no `border-strong` token exists; adding
 *    one is a DS-wide decision). Gated on `enabled:` so a disabled switch
 *    doesn't react — radix-ng sets the native `disabled` attribute on the root
 *    `<button>`, so `enabled:` works. `enabled:cursor-pointer` marks the track
 *    interactive.
 *
 * The off-state fill (`data-unchecked:bg-input dark:data-unchecked:bg-input/80`)
 * is the registry's, kept verbatim. It maps to Figma's `custom/input dark:input\80`
 * track fill. On-state fill `data-checked:bg-primary` maps to Figma `base/primary`.
 * Focus is kept as the registry's `focus-visible:border-ring + ring-3 ring-ring/50`:
 * the border maps to Figma's `base/ring` stroke and the ring maps to Figma's
 * `State=Focus` 3px drop-shadow bound to `custom/outline` (indigo @ 50%) — both
 * present in the Figma component, verified at sync.
 *
 * Colour tokens (`--primary`, `--primary-hover`, `--input`, `--destructive`, the
 * focus ring) are already present in tailwind.css from the Force UI theme — no
 * new tokens added.
 */
export const SWITCH_BASE_CLASS =
  'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors motion-reduce:transition-none outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 enabled:cursor-pointer enabled:data-unchecked:hover:border-input enabled:data-checked:hover:bg-primary-hover';

/**
 * Thumb class string — taken verbatim from the registry `switch-thumb` slot,
 * with `motion-reduce:transition-none` added so the slide snaps for
 * reduced-motion users (WCAG 2.3.3 / spec "Reduced motion: snap, no slide").
 * The thumb reads its own `data-state` (set by radix-ng `RdxSwitchThumb`) and
 * the root's `data-size` via `group-data-[size=...]/switch` to pick its diameter
 * and translate distance. Maps to Figma's inner `Switch` frame (`base/background`
 * fill). The registry's `dark:data-checked:bg-primary-foreground` /
 * `dark:data-unchecked:bg-foreground` dark-thumb recolour is kept verbatim; the
 * Figma thumb is a single `base/background` fill — a known, accepted divergence.
 */
export const SWITCH_THUMB_CLASS =
  'pointer-events-none block rounded-full bg-background ring-0 transition-transform motion-reduce:transition-none group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground';

/** Size is data-attribute-driven (not a cva variant); see SWITCH_BASE_CLASS. */
export type SwitchSize = 'sm' | 'default';

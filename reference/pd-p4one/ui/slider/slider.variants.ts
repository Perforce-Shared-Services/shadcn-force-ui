/**
 * Class strings for the Angular port of @force-ui/slider (radix-force-ui style),
 * published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/slider.json
 * Parity with the registry is the contract — don't edit values without
 * updating both sides.
 *
 * The registry has NO `cva` (no visual variants) — geometry/orientation is
 * driven entirely by `data-horizontal:` / `data-vertical:` utilities (bound to
 * radix-ng's `data-orientation` attribute) and `data-disabled:`. Four class
 * strings, one per slot: wrapper (radix-ng forwards this onto its internal
 * `rdx-slider-horizontal` / `rdx-slider-vertical` span, the functional
 * equivalent of the registry's `SliderPrimitive.Root`), track, range, thumb.
 *
 * Deliberate, documented deviations from the registry source:
 * - Thumb: `transition-[color,box-shadow]` gets a `motion-reduce:transition-none`
 *   guard (WCAG 2.3.3) — the registry source has none. Keyboard focus itself is
 *   still instant (the ring is `focus-visible:ring-3`, not transitioned by this
 *   property list); this only snaps the colour/shadow crossfade for
 *   reduced-motion users.
 * - Wrapper: registry uses `data-disabled:opacity-50`, but radix-ng splits the
 *   root's DOM across two elements — `disabled`/`aria-disabled`/`data-disabled`
 *   land on the `<rdx-slider-horizontal>`/`<rdx-slider-vertical>` HOST tag,
 *   while the classes passed via `styleClass` render on that component's OWN
 *   template root (an inner `<span>`), one level down. The `data-disabled:`
 *   variant (self-referencing, `&:where(...)`) can never match at that
 *   position, so this port computes the dimming in TS instead — see
 *   `SliderComponent.disabled`'s `class.opacity-50` / `class.pointer-events-none`
 *   host binding. `pointer-events-none` is also a REAL fix, not cosmetic:
 *   radix-ng 0.50 doesn't gate its slide handlers on `disabled()` at all (an
 *   upstream gap — the thumb only loses its `tabindex`), so without it a
 *   "disabled" slider stays pointer-draggable.
 */
export const SLIDER_WRAPPER_CLASS =
  'relative flex w-full touch-none items-center select-none data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col';

export const SLIDER_TRACK_CLASS =
  'relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1';

export const SLIDER_RANGE_CLASS =
  'absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full';

export const SLIDER_THUMB_CLASS =
  'relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] motion-reduce:transition-none select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50';

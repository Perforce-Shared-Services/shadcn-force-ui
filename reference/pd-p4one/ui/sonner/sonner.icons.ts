/**
 * Sonner (toast) icon set — SINGLE SWAP POINT for the icon system.
 *
 * Icons are raw inline SVG, imported from `@material-symbols/svg-400` (Material
 * Symbols, Rounded style) via the webpack `?raw` rule, matching the registry's
 * per-type `IconPlaceholder` set (`materialSymbols` prop):
 *   success -> check_circle, info -> info, warning -> warning,
 *   error -> dangerous, loading -> progress_activity (spun via CSS).
 *
 * FILL axis: `-fill` (FILL 1) per the Figma "Sonner / Icon" component, not the
 * unsuffixed outline (FILL 0) other components default to — Figma's toast
 * icons render solid/filled. Matches the icon-swap-strategy convention (fill
 * = filename suffix, not a folder).
 *
 * ngx-sonner projects these as content matching `[success-icon]` /
 * `[info-icon]` / `[warning-icon]` / `[error-icon]` / `[loading-icon]` — each
 * is wrapped in a `<span [innerHTML]>` (same pattern as `alert.icons.ts` /
 * `button.icons.ts`). Parity gap: ngx-sonner's internal `[data-icon]>svg`
 * fade-in entrance animation targets a *direct-child* `<svg>`; our span
 * wrapper makes the svg a grandchild, so the icon appears without that 300ms
 * fade. Cosmetic only — sizing/colour (`[data-icon] svg`, descendant) still
 * applies. Map to Figma by MEANING, not glyph name.
 */
import checkCircleSvg from '@material-symbols/svg-400/rounded/check_circle-fill.svg?raw';
import infoSvg from '@material-symbols/svg-400/rounded/info-fill.svg?raw';
import warningSvg from '@material-symbols/svg-400/rounded/warning-fill.svg?raw';
import dangerousSvg from '@material-symbols/svg-400/rounded/dangerous-fill.svg?raw';
import progressActivitySvg from '@material-symbols/svg-400/rounded/progress_activity-fill.svg?raw';

export const SONNER_ICON_SVG = {
  success: checkCircleSvg,
  info: infoSvg,
  warning: warningSvg,
  error: dangerousSvg,
  loading: progressActivitySvg,
} as const;

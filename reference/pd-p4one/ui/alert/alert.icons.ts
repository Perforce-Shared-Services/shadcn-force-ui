import type { AlertVariant } from './alert.variants';

/**
 * Alert icon set — SINGLE SWAP POINT for the icon system.
 *
 * Icons are raw inline SVG, imported from `@material-symbols/svg-400` (Material
 * Symbols, weight 300, Rounded style) via the webpack `?raw` rule. Each
 * `AlertIcon` maps to one glyph's markup; the component injects it as a real
 * `<svg>` via `[innerHTML]` (sanitizer-trusted) inside a
 * `<span data-slot="alert-icon">`. Alerts are non-interactive, so every icon
 * stays outline (FILL 0 — the unsuffixed file). To swap an icon, change the
 * import in `ALERT_ICON_SVG` only.
 *
 * Map to Figma by MEANING, not by glyph name — the Figma alert keeps its own
 * icon set.
 */
import infoSvg from '@material-symbols/svg-400/rounded/info.svg?raw';
import warningSvg from '@material-symbols/svg-400/rounded/warning.svg?raw';
import checkCircleSvg from '@material-symbols/svg-400/rounded/check_circle.svg?raw';
import errorSvg from '@material-symbols/svg-400/rounded/error.svg?raw';
import notificationsSvg from '@material-symbols/svg-400/rounded/notifications.svg?raw';

export type AlertIcon = 'info' | 'warning' | 'success' | 'error' | 'bell';

/** Raw inline SVG markup for each semantic icon. */
export const ALERT_ICON_SVG: Record<AlertIcon, string> = {
  info: infoSvg,
  warning: warningSvg,
  success: checkCircleSvg,
  error: errorSvg,
  bell: notificationsSvg,
};

/** The default icon shown for each variant when `icon` is left as `'auto'`. */
export const DEFAULT_VARIANT_ICON: Record<AlertVariant, AlertIcon> = {
  default: 'info',
  destructive: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

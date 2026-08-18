import downloadRaw from '@material-symbols/svg-400/rounded/download.svg?raw';
import errorRaw from '@material-symbols/svg-400/rounded/error.svg?raw';
import lockRaw from '@material-symbols/svg-400/rounded/lock.svg?raw';
import moreVertRaw from '@material-symbols/svg-400/rounded/more_vert.svg?raw';
import refreshRaw from '@material-symbols/svg-400/rounded/refresh.svg?raw';

/**
 * Single swap point for `ChartWidgetComponent`'s icons — same convention as
 * `alert.icons.ts` / `dropdown-menu`'s trigger icon (`@material-symbols/svg-400`,
 * Rounded, outline/FILL 0). `error` and `more_vert` reuse the exact names
 * already used by `ui/alert` and `ui/dropdown-menu`; `lock` has no prior
 * usage in this codebase but follows the same weight/style.
 */
export const CHART_WIDGET_ICONS = {
  error: errorRaw,
  lock: lockRaw,
  moreVert: moreVertRaw,
  refresh: refreshRaw,
  download: downloadRaw,
} as const;

import corporateFareIcon from '@material-symbols/svg-400/rounded/corporate_fare.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import mailIcon from '@material-symbols/svg-400/rounded/mail.svg?raw';
import dashboardIcon from '@material-symbols/svg-400/rounded/dashboard.svg?raw';
import monitoringIcon from '@material-symbols/svg-400/rounded/monitoring.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder.svg?raw';
import groupIcon from '@material-symbols/svg-400/rounded/group.svg?raw';
import databaseIcon from '@material-symbols/svg-400/rounded/database.svg?raw';
import receiptLongIcon from '@material-symbols/svg-400/rounded/receipt_long.svg?raw';
import descriptionIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import moreVertIcon from '@material-symbols/svg-400/rounded/more_vert.svg?raw';
import darkModeIcon from '@material-symbols/svg-400/rounded/dark_mode.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import helpIcon from '@material-symbols/svg-400/rounded/help.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';
import checkCircleIcon from '@material-symbols/svg-400/rounded/check_circle.svg?raw';
import progressActivityIcon from '@material-symbols/svg-400/rounded/progress_activity.svg?raw';
import dragIndicatorIcon from '@material-symbols/svg-400/rounded/drag_indicator.svg?raw';
import trendingUpIcon from '@material-symbols/svg-400/rounded/trending_up.svg?raw';
import trendingDownIcon from '@material-symbols/svg-400/rounded/trending_down.svg?raw';
import firstPageIcon from '@material-symbols/svg-400/rounded/first_page.svg?raw';
import lastPageIcon from '@material-symbols/svg-400/rounded/last_page.svg?raw';
import chevronLeftIcon from '@material-symbols/svg-400/rounded/chevron_left.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import editIcon from '@material-symbols/svg-400/rounded/edit.svg?raw';
import contentCopyIcon from '@material-symbols/svg-400/rounded/content_copy.svg?raw';
import starIcon from '@material-symbols/svg-400/rounded/star.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import keyboardArrowDownIcon from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/**
 * Single swap-point for every icon used across the `dashboard-01` block's
 * sub-components (sidebar nav, site header, data-table row actions/status).
 * Shared across sibling files because this is one cohesive Block composition
 * (not a `ui/*` primitive) — same raw-SVG-string + `DomSanitizer` +
 * `[innerHTML]` convention used throughout `ui/*` (e.g. `chart-widget.icons.ts`,
 * `sidebar-08`'s inline `deco()`).
 *
 * Two names have no Material Symbols equivalent:
 * - `github` — GitHub has no Material Symbols glyph; the standard octicon
 *   "mark-github" path is inlined directly (not an npm dependency, just
 *   literal SVG markup, same as every other icon here).
 */
export const DASHBOARD01_ICONS = {
  corporateFare: corporateFareIcon,
  unfoldMore: unfoldMoreIcon,
  add: addIcon,
  mail: mailIcon,
  dashboard: dashboardIcon,
  monitoring: monitoringIcon,
  folder: folderIcon,
  group: groupIcon,
  database: databaseIcon,
  receiptLong: receiptLongIcon,
  description: descriptionIcon,
  moreHoriz: moreHorizIcon,
  moreVert: moreVertIcon,
  darkMode: darkModeIcon,
  settings: settingsIcon,
  help: helpIcon,
  search: searchIcon,
  logout: logoutIcon,
  checkCircle: checkCircleIcon,
  progressActivity: progressActivityIcon,
  dragIndicator: dragIndicatorIcon,
  trendingUp: trendingUpIcon,
  trendingDown: trendingDownIcon,
  firstPage: firstPageIcon,
  lastPage: lastPageIcon,
  chevronLeft: chevronLeftIcon,
  chevronRight: chevronRightIcon,
  edit: editIcon,
  contentCopy: contentCopyIcon,
  star: starIcon,
  delete: deleteIcon,
  keyboardArrowDown: keyboardArrowDownIcon,
  github:
    '<svg viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
} as const;

/** Marks a raw icon SVG string decorative (`aria-hidden` + `focusable="false"`) for a label/text-adjacent leading/trailing icon. */
export function decorativeIcon(svg: string): string {
  return svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
}

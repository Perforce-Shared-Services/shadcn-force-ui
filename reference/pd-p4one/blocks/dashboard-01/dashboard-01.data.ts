import type { ChartSeriesDatum } from '@/app/ui/chart';

/**
 * Static demo data for the `dashboard-01` block, split out from the
 * components for readability (per this block's file layout). Two datasets:
 * the Outline table's rows, and the Total Visitors chart's synthetic daily
 * time series.
 */

export type SectionStatus = 'Done' | 'In Process';

export interface DashboardSectionRow {
  id: number;
  header: string;
  sectionType: string;
  status: SectionStatus;
  target: number;
  limit: number;
  /** `null` renders the "Assign reviewer" select placeholder instead of a name. */
  reviewer: string | null;
}

/**
 * The Outline table's rows. The first 10 are verified verbatim against the
 * real Figma frame (node 17455:139010, file jr1JErMIXt6T2BakbG2iBI); rows
 * 11-24 are synthetic filler in the same shape.
 *
 * DELIBERATE REDUCTION vs upstream: the real shadcn `dashboard-01` ships 68
 * rows. That count is itself placeholder demo data with no functional
 * meaning (it exists to make the table's pagination non-trivial) — 24 rows
 * across 3 pages at 10/page already exercises sort/paginate/select/reorder
 * without bloating this file for a Block whose point is the composition,
 * not the row count.
 */
export const DASHBOARD_SECTION_ROWS: DashboardSectionRow[] = [
  { id: 1, header: 'Cover Page', sectionType: 'Cover Page', status: 'In Process', target: 23, limit: 32, reviewer: 'Jamik Tashpulatov' },
  { id: 2, header: 'Table of contents', sectionType: 'Table of Contents', status: 'Done', target: 45, limit: 8, reviewer: 'Jamik Tashpulatov' },
  { id: 3, header: 'Executive summary', sectionType: 'Technical Content', status: 'Done', target: 45, limit: 45, reviewer: 'Jamik Tashpulatov' },
  { id: 4, header: 'Technical approach', sectionType: 'Cover Page', status: 'In Process', target: 45, limit: 45, reviewer: 'Eddie Lake' },
  { id: 5, header: 'Design', sectionType: 'Cover Page', status: 'In Process', target: 23, limit: 23, reviewer: 'Eddie Lake' },
  { id: 6, header: 'Capabilities', sectionType: 'Narrative', status: 'Done', target: 23, limit: 23, reviewer: 'Eddie Lake' },
  { id: 7, header: 'Integration with existing systems', sectionType: 'Technical Content', status: 'In Process', target: 23, limit: 23, reviewer: 'Eddie Lake' },
  { id: 8, header: 'Innovation and advantages', sectionType: 'Table of Contents', status: 'Done', target: 8, limit: 45, reviewer: null },
  { id: 9, header: "Overview of EMR's systems and vendors", sectionType: 'Narrative', status: 'Done', target: 23, limit: 23, reviewer: null },
  { id: 10, header: 'Advanced Algorithms', sectionType: 'Table of Contents', status: 'In Process', target: 89, limit: 23, reviewer: null },
  // Synthetic rows 11-24 (reduced count vs upstream's 68 placeholder rows — see doc comment above).
  { id: 11, header: 'Risk assessment', sectionType: 'Narrative', status: 'Done', target: 34, limit: 34, reviewer: 'Jamik Tashpulatov' },
  { id: 12, header: 'Cost breakdown', sectionType: 'Technical Content', status: 'In Process', target: 56, limit: 60, reviewer: 'Eddie Lake' },
  { id: 13, header: 'Staffing plan', sectionType: 'Narrative', status: 'Done', target: 12, limit: 12, reviewer: 'Jamik Tashpulatov' },
  { id: 14, header: 'Quality assurance', sectionType: 'Technical Content', status: 'In Process', target: 30, limit: 40, reviewer: null },
  { id: 15, header: 'Timeline and milestones', sectionType: 'Table of Contents', status: 'Done', target: 18, limit: 18, reviewer: 'Eddie Lake' },
  { id: 16, header: 'Data security overview', sectionType: 'Technical Content', status: 'In Process', target: 41, limit: 50, reviewer: null },
  { id: 17, header: 'Vendor qualifications', sectionType: 'Narrative', status: 'Done', target: 27, limit: 27, reviewer: 'Jamik Tashpulatov' },
  { id: 18, header: 'Past performance summary', sectionType: 'Cover Page', status: 'Done', target: 15, limit: 15, reviewer: 'Eddie Lake' },
  { id: 19, header: 'Transition plan', sectionType: 'Narrative', status: 'In Process', target: 22, limit: 28, reviewer: null },
  { id: 20, header: 'Appendix A: glossary', sectionType: 'Table of Contents', status: 'Done', target: 9, limit: 9, reviewer: 'Jamik Tashpulatov' },
  { id: 21, header: 'Appendix B: references', sectionType: 'Table of Contents', status: 'Done', target: 11, limit: 11, reviewer: 'Eddie Lake' },
  { id: 22, header: 'Compliance matrix', sectionType: 'Technical Content', status: 'In Process', target: 33, limit: 38, reviewer: null },
  { id: 23, header: 'Sustainability approach', sectionType: 'Narrative', status: 'Done', target: 19, limit: 19, reviewer: 'Jamik Tashpulatov' },
  { id: 24, header: 'Closing statement', sectionType: 'Cover Page', status: 'Done', target: 6, limit: 6, reviewer: 'Eddie Lake' },
];

const CHART_START_DATE = Date.UTC(2026, 3, 1); // Apr 1 — synthetic anchor, not a real telemetry date.
const CHART_TOTAL_DAYS = 90;

function formatChartDay(dayIndex: number): string {
  const date = new Date(CHART_START_DATE);
  date.setUTCDate(date.getUTCDate() + dayIndex);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Synthetic ~90-day two-series (desktop/mobile) visitor dataset for the
 * Total Visitors chart, generated deterministically (no `Math.random`, so
 * Storybook renders are stable) — a slow upward trend plus a single gentle
 * weekly wave, matching the general shape of upstream's
 * `chart-area-interactive` demo (and the real Figma frame's smooth,
 * broad-humped curve) without reproducing upstream's literal values
 * (upstream's own numbers are themselves synthetic placeholder data). An
 * earlier pass also added a 3-day "micro" ripple on top of the weekly one —
 * removed: two overlapping wave periods on daily granularity produced a
 * dense zigzag/sawtooth look that didn't match Figma's smooth wave, even
 * with `ui-chart-area`'s monotone curve interpolation (smoothing a curve
 * through genuinely oscillating data doesn't undo the oscillation).
 *
 * Flattened directly into `ui-chart-area`'s `ChartSeriesDatum[]` shape,
 * grouped by day (desktop then mobile) so category order tracks day order —
 * `sliceLastDays` relies on this to keep whole days intact when trimming to
 * the toggle group's selected range.
 */
export const DASHBOARD_VISITORS_SERIES: ChartSeriesDatum[] = Array.from({ length: CHART_TOTAL_DAYS }, (_, i) => {
  const trend = i * 2.4;
  // A sine wave has one full peak AND one full trough per period, so a
  // 7-day period (a literal calendar week) actually produces a visible
  // up/down "wiggle" roughly every 3.5 days, not every 7 — a wider ~16-day
  // period reads as the broad, gentle undulation the real Figma frame shows.
  const weeklyWave = Math.sin((i / 16) * Math.PI * 2) * 45;
  const desktop = Math.max(Math.round(220 + trend + weeklyWave), 20);
  const mobile = Math.max(Math.round(140 + trend * 0.6 + weeklyWave * 0.5), 15);
  const category = formatChartDay(i);
  return [
    { category, series: 'desktop', value: desktop },
    { category, series: 'mobile', value: mobile },
  ];
}).flat();

/**
 * Keep only the last `days` days of the full series (90/30/7, driven by the
 * chart card's toggle group). Both series entries for a day sit adjacent in
 * `DASHBOARD_VISITORS_SERIES`, so slicing the tail `days * 2` items keeps
 * whole days intact rather than splitting a day's pair.
 */
export function sliceLastDays(data: ChartSeriesDatum[], days: number): ChartSeriesDatum[] {
  const count = days * 2;
  return data.slice(Math.max(0, data.length - count));
}

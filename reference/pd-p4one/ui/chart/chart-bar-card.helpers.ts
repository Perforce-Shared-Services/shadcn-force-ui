/**
 * `ui-chart-bar` (card)-specific CSS override: highlights one bar as "active"
 * per Figma's `Chart / Bar Chart` "Active" variant (dashed border in the
 * active category's chart color + the fill dropped to 80% opacity — read
 * directly off that variant's `get_design_context` output, not guessed).
 *
 * Bars can't be targeted with Angular class bindings (ngx-charts renders them
 * internally, outside our template), so this is a structural CSS selector:
 * `SeriesVerticalComponent` renders one `<g ngx-charts-bar>` sibling per
 * category, in `categoryOrder` order (verified against the installed
 * ngx-charts source), so `:nth-child` on those siblings reliably maps to the
 * active category's index — no per-bar data attributes needed. Only used for
 * the single-series path (Figma's Active example is single-series); no
 * grouped/stacked "active" variant exists to verify a multi-series version
 * against.
 */
export function buildActiveBarStyleText(id: string, activeIndex: number | null, activeColor: string): string {
  if (activeIndex === null || activeIndex < 0) {
    return '';
  }
  return `
[data-chart="${id}"] g[ngx-charts-bar]:nth-child(${activeIndex + 1}) .bar {
  fill-opacity: 0.8;
  stroke-dasharray: 3 3;
  stroke-width: 1px;
  stroke: ${activeColor};
}`;
}

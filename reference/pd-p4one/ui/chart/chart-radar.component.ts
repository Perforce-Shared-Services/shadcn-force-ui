import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';

import { buildCustomColors, collectSeriesOrder, toNgxSeriesMajorResults, toNgxSingleResults } from './chart.helpers';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartSeriesDatum, ChartTooltipPayloadItem } from './chart.types';

let chartRadarIdSeq = 0;

interface NgxRadarModel {
  name: string;
  value: number;
  series?: string;
}

/**
 * Angular port of Figma's `Chart / Radar Chart` component (docs linked to
 * `ui.shadcn.com/charts#radar-chart`) — the cross-framework "chart type"
 * building block, matching the actual shadcn/recharts radar chart examples
 * rather than an abstract dashboard-widget spec. Built on
 * `@swimlane/ngx-charts`'s `PolarChartComponent` (`ngx-charts-polar-chart`)
 * and this app's `ui/chart` wrapper, same architecture as
 * `ui-chart-bar`/`ui-chart-line`/`ui-chart-donut`.
 *
 * `filled` covers Figma's Basic (filled polygon) vs Dots/Lines Only (outline
 * only — `rangeFillOpacity` dropped to 0) — one flag rather than three
 * near-identical variant components, matching every other chart type in this
 * set. Multi-series `data` covers Multiple/Lines Only-with-2-series.
 *
 * **Known deviations from Figma** (both structural ngx-charts limits, not
 * oversights):
 * - **Grid shape is always concentric circles.** `PolarChartComponent`
 *   hardcodes a circular grid (`<circle class="gridline-path
 *   radial-gridline-path">` per radius tick) — there is no polygon/hexagon
 *   grid mode. This matches Figma's "Grid Circle"/"Grid Circle Filled"
 *   variants but NOT "Basic"/"Grid Custom" (hexagon grid). Reproducing the
 *   hexagon grid would need a hand-computed SVG `<polygon>` overlay (no
 *   `xScale`/`yScale`-equivalent exposed for polar charts) — deferred, same
 *   tier as `ui-chart-line`'s deferred Dots/Label variants.
 * - **Per-point dots are always rendered, never toggleable.**
 *   `PolarSeriesComponent` draws a circle per data point unconditionally —
 *   there's no input to hide them, so "Basic" and "Dots" render identically
 *   here (both with dots visible).
 * - **"Grid Filled" (graduated ring background) and "No lines" (spokes
 *   hidden independent of grid) have no dedicated ngx-charts input** —
 *   deferred, not implemented.
 */
@Component({
  selector: 'ui-chart-radar',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-radar',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      <ngx-charts-polar-chart
        [results]="ngxResults()"
        [rangeFillOpacity]="filled() ? 0.6 : 0"
        [xAxis]="showAxis()"
        [showGridLines]="showGrid()"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="customColorsFn()"
      >
        <ng-template #tooltipTemplate let-model="model">
          <ui-chart-tooltip-content
            [config]="effectiveConfig()"
            [active]="true"
            [item]="toTooltipItem(model)"
            [label]="model.name"
            [hideName]="!isMultiSeries()"
            indicator="dot"
          />
        </ng-template>
      </ngx-charts-polar-chart>
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="legendKeys()" />
    }
  `,
})
export class ChartRadarComponent {
  readonly data = input.required<ChartSeriesDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  /** `false` renders an outline-only polygon ("Dots"/"Lines Only") instead of a filled one ("Basic"/"Multiple"). */
  readonly filled = input(true, { transform: booleanAttribute });
  readonly showAxis = input(true, { transform: booleanAttribute });
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly chartId = `chart-radar-${++chartRadarIdSeq}`;

  protected readonly isMultiSeries = computed(() => this.data().some((d) => d.series != null));
  protected readonly categoryOrder = computed(() => {
    const order: string[] = [];
    for (const d of this.data()) {
      if (!order.includes(d.category)) order.push(d.category);
    }
    return order;
  });
  protected readonly seriesOrder = computed(() => collectSeriesOrder(this.data()));

  protected readonly ngxResults = computed(() =>
    this.isMultiSeries()
      ? toNgxSeriesMajorResults(this.data(), this.seriesOrder(), this.categoryOrder())
      : [{ name: this.legendKeys()[0] ?? 'Value', series: toNgxSingleResults(this.data(), this.categoryOrder()) }],
  );

  protected readonly legendKeys = computed(() => (this.isMultiSeries() ? this.seriesOrder() : ['Value']));

  /** Single source of truth for color + label, shared by `ChartContainer`, the legend, and tooltip resolution. */
  protected readonly effectiveConfig = computed<ChartConfig>(() => {
    const keys = this.legendKeys();
    const provided = this.colorMapping() ?? {};
    const colorsFn = buildCustomColors(provided, keys);
    const merged: ChartConfig = {};
    for (const key of keys) {
      merged[key] = { label: provided[key]?.label ?? key, color: provided[key]?.color ?? colorsFn(key) };
    }
    return merged;
  });

  protected readonly customColorsFn = computed(() => {
    const config = this.effectiveConfig();
    return (name: string) => config[name]?.color ?? 'var(--chart-1)';
  });

  protected readonly hostClasses = computed(() => cn('block', this.className()));
  protected readonly plotClasses = computed(() => cn('mx-auto aspect-square w-full max-w-80'));

  protected toTooltipItem(model: NgxRadarModel): ChartTooltipPayloadItem {
    const key = this.isMultiSeries() ? (model.series ?? model.name) : (this.legendKeys()[0] ?? 'Value');
    const entry = this.effectiveConfig()[key];
    return { name: entry?.label ?? key, dataKey: key, value: model.value, color: entry?.color };
  }
}

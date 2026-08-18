import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear, curveMonotoneX, curveStep } from 'd3-shape';

import { cn } from '@/app/lib/utils';

import { buildCustomColors, collectSeriesOrder, toNgxSeriesMajorResults, toNgxSingleResults } from './chart.helpers';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartSeriesDatum, ChartTooltipPayloadItem } from './chart.types';
import type { ChartLineCurve } from './chart-line.component';

let chartAreaIdSeq = 0;

interface NgxAreaModel {
  name: string;
  value: number;
  series?: string;
}

const CURVE_FACTORIES: Record<ChartLineCurve, typeof curveLinear> = {
  smooth: curveMonotoneX,
  linear: curveLinear,
  step: curveStep,
};

/**
 * Angular port of Figma's `Chart / Area Chart` component (docs linked to
 * `ui.shadcn.com/charts#area-chart`) — the cross-framework "chart type"
 * building block, matching the actual shadcn/recharts area chart examples
 * rather than an abstract dashboard-widget spec. Built on
 * `@swimlane/ngx-charts` and this app's `ui/chart` wrapper, same architecture
 * as `ui-chart-bar`/`ui-chart-line`/`ui-chart-donut`.
 *
 * Figma's `Type` variant (Basic/Linear/Step/Stacked/Stacked Expanded) maps to
 * two orthogonal flags rather than a 5-way enum — `curve` (reusing
 * `ChartLineCurve`, same three factories as `ui-chart-line`) for
 * Basic/Linear/Step, and `stacked`/`normalized` for Stacked/Stacked Expanded
 * — plus an independent `gradient` flag (Figma's `Gradient=Yes/No` axis,
 * every `Type` has both). Unlike `ui-chart-line`, ngx-charts genuinely wires
 * `AreaChartComponent`'s `gradient` input into a real `<linearGradient>` fill
 * (confirmed by reading `AreaSeriesComponent`'s source — `LineSeriesComponent`
 * declares the same input but never binds it, so line's is dead code and
 * area's is not).
 *
 * Stacked and Stacked Expanded are genuinely separate ngx-charts component
 * classes (`AreaChartStackedComponent`/`AreaChartNormalizedComponent`), not a
 * flag on the base one — selected structurally below, same pattern as
 * `ui-chart-bar`'s stacked-vs-grouped branch.
 *
 * **`roundDomains` must stay unset (default `false`) on the base (non-stacked)
 * branch** — a genuine ngx-charts bug, not a choice: `AreaChartComponent`'s
 * own `getXScale()` calls `scale.nice()` unconditionally whenever
 * `roundDomains` is true, but `scalePoint()` (the d3 scale used for ordinal
 * categories, i.e. every category axis in this chart set) has no `.nice()`
 * method — it throws `scale.nice is not a function` and aborts `update()`
 * before `setColors()` runs, which then breaks the series' color lookup too.
 * `LineChartComponent`'s own `getXScale()` guards the same call to only the
 * Linear branch (confirmed by reading both side by side) — Area's is the
 * one with the bug. Found by hitting exactly this crash in Storybook, not by
 * reading source first.
 *
 * Figma's gradient stop-opacity values could not be read from the API
 * (flattened to raster PNGs in the response) — using the well-known
 * shadcn/recharts convention instead (`stopOpacity` 0.8 near the top fading
 * to 0.1 at the baseline), which is exactly what ngx-charts'
 * `SvgLinearGradientComponent` already produces by default for a chart color.
 */
@Component({
  selector: 'ui-chart-area',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-area',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      @if (stacked() && normalized()) {
        <ngx-charts-area-chart-normalized
          [results]="ngxResults()"
          [xAxis]="showXAxis()"
          [yAxis]="showYAxis()"
          [showGridLines]="showGrid()"
          [gradient]="gradient()"
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
              indicator="line"
            />
          </ng-template>
        </ngx-charts-area-chart-normalized>
      } @else if (stacked()) {
        <ngx-charts-area-chart-stacked
          [results]="ngxResults()"
          [xAxis]="showXAxis()"
          [yAxis]="showYAxis()"
          [showGridLines]="showGrid()"
          [gradient]="gradient()"
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
              indicator="line"
            />
          </ng-template>
        </ngx-charts-area-chart-stacked>
      } @else {
        <ngx-charts-area-chart
          [results]="ngxResults()"
          [curve]="curveFactory()"
          [xAxis]="showXAxis()"
          [yAxis]="showYAxis()"
          [showGridLines]="showGrid()"
          [gradient]="gradient()"
          [legend]="false"
          [tooltipDisabled]="!tooltip()"
          [customColors]="customColorsFn()"
          [autoScale]="true"
        >
          <ng-template #tooltipTemplate let-model="model">
            <ui-chart-tooltip-content
              [config]="effectiveConfig()"
              [active]="true"
              [item]="toTooltipItem(model)"
              [label]="model.name"
              [hideName]="!isMultiSeries()"
              indicator="line"
            />
          </ng-template>
        </ngx-charts-area-chart>
      }
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="legendKeys()" />
    }
  `,
})
export class ChartAreaComponent {
  readonly data = input.required<ChartSeriesDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly curve = input<ChartLineCurve>('smooth');
  readonly stacked = input(false, { transform: booleanAttribute });
  /** 100%-stacked ("Stacked Expanded") — only meaningful when `stacked` is also true. */
  readonly normalized = input(false, { transform: booleanAttribute });
  readonly gradient = input(false, { transform: booleanAttribute });
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(false, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly chartId = `chart-area-${++chartAreaIdSeq}`;

  protected readonly isMultiSeries = computed(() => this.data().some((d) => d.series != null));
  protected readonly categoryOrder = computed(() => {
    const order: string[] = [];
    for (const d of this.data()) {
      if (!order.includes(d.category)) order.push(d.category);
    }
    return order;
  });
  protected readonly seriesOrder = computed(() => collectSeriesOrder(this.data()));
  protected readonly curveFactory = computed(() => CURVE_FACTORIES[this.curve()]);

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
  protected readonly plotClasses = computed(() => cn('w-full aspect-video'));

  protected toTooltipItem(model: NgxAreaModel): ChartTooltipPayloadItem {
    const key = this.isMultiSeries() ? (model.series ?? model.name) : (this.legendKeys()[0] ?? 'Value');
    const entry = this.effectiveConfig()[key];
    return { name: entry?.label ?? key, dataKey: key, value: model.value, color: entry?.color };
  }
}

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear, curveMonotoneX, curveStep } from 'd3-shape';

import { cn } from '@/app/lib/utils';

import { buildCustomColors, collectSeriesOrder, toNgxSeriesMajorResults, toNgxSingleResults } from './chart.helpers';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartSeriesDatum, ChartTooltipPayloadItem } from './chart.types';

let chartLineIdSeq = 0;

interface NgxLineModel {
  name: string;
  value: number;
  series?: string;
}

/** Curve shape — maps 1:1 to Figma's `Chart / Line Chart` "Basic"/"Linear"/"Step" variants. */
export type ChartLineCurve = 'smooth' | 'linear' | 'step';

const CURVE_FACTORIES: Record<ChartLineCurve, typeof curveLinear> = {
  smooth: curveMonotoneX,
  linear: curveLinear,
  step: curveStep,
};

/**
 * Angular port of Figma's `Chart / Line Chart` component (docs linked to
 * `ui.shadcn.com/charts#line-chart`) — the cross-framework "chart type"
 * building block, matching the actual shadcn/recharts line chart examples
 * rather than an abstract dashboard-widget spec. Built on
 * `@swimlane/ngx-charts` (recharts has no Angular escape hatch — see
 * `.claude/branch-context.md`) and this app's `ui/chart` wrapper
 * (`ChartContainer`/`ChartTooltipContent`/`ChartLegendContent`), same
 * architecture as `ui-chart-bar`/`ui-chart-donut`.
 *
 * One flexible component + flags, not N hardcoded variants: `curve` covers
 * Figma's Basic ("smooth", `curveMonotoneX`)/Linear (`curveLinear`)/Step
 * (`curveStep`), and multi-series data (`series` present on `data`) covers
 * "Multiple" — same "flags over variant enum" call as bar and area.
 *
 * **Deliberately NOT implemented**: Figma's Dots/Dots Colors/Label variants
 * (persistent, always-visible per-point markers, some individually colored,
 * some carrying a floating value label). `LineSeriesComponent`'s dot
 * rendering (`CircleSeriesComponent`) only ever shows a SINGLE circle across
 * the whole series, and only on hover (`*ngIf="circle"` gated on the
 * currently-hovered value) — there is no public input to force every point's
 * dot to render permanently. Reproducing it would need a hand-computed SVG
 * overlay against the chart's internal (unexposed) `xScale`/`yScale`, a
 * materially riskier hack than the CSS-only tricks used elsewhere in this
 * chart set. Flagged here the same way bar deferred `referenceLines`/`mini`
 * and donut deferred Active/Stacked — pull real Figma coordinates and revisit
 * if a consumer needs it.
 */
@Component({
  selector: 'ui-chart-line',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-line',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      <ngx-charts-line-chart
        [results]="isMultiSeries() ? ngxGroupedResults() : ngxSingleResultsAsSeries()"
        [curve]="curveFactory()"
        [xAxis]="showXAxis()"
        [yAxis]="showYAxis()"
        [showGridLines]="showGrid()"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="customColorsFn()"
        [autoScale]="true"
        [roundDomains]="true"
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
      </ngx-charts-line-chart>
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="legendKeys()" />
    }
  `,
})
export class ChartLineComponent {
  readonly data = input.required<ChartSeriesDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly curve = input<ChartLineCurve>('smooth');
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(false, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly chartId = `chart-line-${++chartLineIdSeq}`;

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

  protected readonly ngxGroupedResults = computed(() =>
    toNgxSeriesMajorResults(this.data(), this.seriesOrder(), this.categoryOrder()),
  );

  /** Single-series data still needs to be wrapped in one named series for `ngx-charts-line-chart`'s `MultiSeries` shape. */
  protected readonly ngxSingleResultsAsSeries = computed(() => [
    { name: this.legendKeys()[0] ?? 'Value', series: toNgxSingleResults(this.data(), this.categoryOrder()) },
  ]);

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

  protected toTooltipItem(model: NgxLineModel): ChartTooltipPayloadItem {
    const key = this.isMultiSeries() ? (model.series ?? model.name) : (this.legendKeys()[0] ?? 'Value');
    const entry = this.effectiveConfig()[key];
    return { name: entry?.label ?? key, dataKey: key, value: model.value, color: entry?.color };
  }
}

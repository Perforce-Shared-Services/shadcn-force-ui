import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { curveMonotoneX } from 'd3-shape';

import { cn } from '@/app/lib/utils';

import { toNgxSingleResults } from './chart.helpers';
import { ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartTooltipPayloadItem, ChartValueDatum } from './chart.types';

interface NgxSparklineModel {
  name: string;
  value: number;
}

/**
 * Angular port of `the-force-design-spec` MCP's `sparkline.md` pattern —
 * not a distinct Figma/shadcn chart type (no `Chart / Sparkline` component
 * set exists, and shadcn's own public docs don't have one either — a
 * sparkline is, by that spec's own definition, "chrome-stripped Line/Area/
 * Bar: no axes, no gridlines, no legend"). Built as a thin composition over
 * the raw `ngx-charts-line-chart`/`-area-chart`/`-bar-vertical` primitives
 * with every chrome element suppressed, rather than a peer "chart type" card
 * next to `ui-chart-line`/`ui-chart-area`/`ui-chart-bar` — there is no
 * independent visual identity to port, only a stripped-down composition of
 * ones that already exist. Single-series only, per the spec.
 */
@Component({
  selector: 'ui-chart-sparkline',
  standalone: true,
  imports: [NgxChartsModule, ChartTooltipContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-sparkline',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (variant() === 'bar') {
      <ngx-charts-bar-vertical
        [results]="ngxSingleResults()"
        [xAxis]="false"
        [yAxis]="false"
        [showGridLines]="false"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="colorFn()"
        [barPadding]="1"
      >
        <ng-template #tooltipTemplate let-model="model">
          <ui-chart-tooltip-content [config]="config()" [active]="true" [item]="toTooltipItem(model)" [hideName]="true" indicator="dot" />
        </ng-template>
      </ngx-charts-bar-vertical>
    } @else if (variant() === 'area') {
      <ngx-charts-area-chart
        [results]="ngxSeriesResults()"
        [curve]="curve"
        [xAxis]="false"
        [yAxis]="false"
        [showGridLines]="false"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="colorFn()"
        [autoScale]="true"
      >
        <ng-template #tooltipTemplate let-model="model">
          <ui-chart-tooltip-content [config]="config()" [active]="true" [item]="toTooltipItem(model)" [hideName]="true" indicator="line" />
        </ng-template>
      </ngx-charts-area-chart>
    } @else {
      <ngx-charts-line-chart
        [results]="ngxSeriesResults()"
        [curve]="curve"
        [xAxis]="false"
        [yAxis]="false"
        [showGridLines]="false"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="colorFn()"
        [autoScale]="true"
      >
        <ng-template #tooltipTemplate let-model="model">
          <ui-chart-tooltip-content [config]="config()" [active]="true" [item]="toTooltipItem(model)" [hideName]="true" indicator="line" />
        </ng-template>
      </ngx-charts-line-chart>
    }
  `,
})
export class ChartSparklineComponent {
  readonly data = input.required<ChartValueDatum[]>();
  readonly variant = input<'line' | 'area' | 'bar'>('line');
  readonly color = input('var(--chart-1)');
  readonly label = input('Value');
  readonly tooltip = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly curve = curveMonotoneX;

  protected readonly categoryOrder = computed(() => this.data().map((d) => d.category));
  protected readonly ngxSingleResults = computed(() => toNgxSingleResults(this.data(), this.categoryOrder()));
  protected readonly ngxSeriesResults = computed(() => [{ name: this.label(), series: this.ngxSingleResults() }]);

  protected readonly config = computed<ChartConfig>(() => ({ [this.label()]: { label: this.label(), color: this.color() } }));
  protected readonly colorFn = computed(() => () => this.color());

  /**
   * `h-12` (48px), not the spec's literal `sm` density (32px) — every
   * ngx-charts line/area/bar component hardcodes `margin = [10, 20, 10, 20]`
   * with no public override (the same gotcha documented on
   * `ui-chart-widget`'s `mini` variant), so a literal 32px-tall chart
   * would leave only ~12px of real plot height. 48px keeps the "chrome
   * stripped" spirit while staying legible.
   */
  protected readonly hostClasses = computed(() => cn('block h-12 w-32', this.className()));

  protected toTooltipItem(model: NgxSparklineModel): ChartTooltipPayloadItem {
    return { name: this.label(), dataKey: this.label(), value: model.value, color: this.color() };
  }
}

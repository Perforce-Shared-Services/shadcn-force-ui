import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';

import { buildActiveBarStyleText } from './chart-bar-card.helpers';
import type { ChartBarOrientation } from './chart-bar-card.types';
import { buildCustomColors, collectSeriesOrder, toNgxGroupedResults, toNgxSingleResults } from './chart-bar.helpers';
import type { ChartBarDatum } from './chart-bar.types';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartTooltipPayloadItem } from './chart.types';

let chartBarCardIdSeq = 0;

const SINGLE_SERIES_KEY = '__single__';

interface NgxBarModel {
  name: string;
  value: number;
  series?: string;
}

/**
 * Angular port of Figma's `Chart / Bar Chart` component
 * (https://ui.shadcn.com/charts#bar-chart, linked directly from that Figma
 * node's documentation) — the cross-framework "chart type" building block,
 * matching the actual shadcn/recharts bar chart examples 1:1 rather than an
 * abstract dashboard-widget spec. Built on `@swimlane/ngx-charts` (recharts
 * has no Angular escape hatch — see `.claude/branch-context.md`) and this
 * app's `ui/chart` wrapper (`ChartContainer`/`ChartTooltipContent`/
 * `ChartLegendContent`).
 *
 * One flexible component + flags, not nine hardcoded variants — the real
 * shadcn examples (Basic/Horizontal/Mixed/Custom Label/Active/Stacked/Label/
 * Negative/Multiple) are nine demo files composing the same `<BarChart>`/
 * `<Bar>` primitives with different prop combinations, not nine components.
 * See `chart-bar.stories.ts` for all nine as stories against this one
 * component. `ui-chart-widget` (the P4 One dashboard-widget layer:
 * title/subtitle/headline-metric/action-menu/states/keyboard-nav) composes
 * this component for its plot area instead of calling ngx-charts directly.
 *
 * Chrome defaults intentionally differ from `ui-chart-widget`'s heavier
 * dashboard look — matching the actual registry `chart-example.tsx` source
 * (`<CartesianGrid vertical={false} />`, no `<YAxis>` at all,
 * `tickLine={false} axisLine={false}` on the X axis) and Figma's rendered
 * variants (no Y-axis numbers shown anywhere): `showYAxis` defaults `false`,
 * `showGrid` (horizontal lines only, matching ngx-charts' own default)
 * defaults `true`. The widget overrides these back on for its fuller
 * dashboard chrome.
 */
@Component({
  selector: 'ui-chart-bar',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-bar',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      @if (isMultiSeries()) {
        @if (stacked()) {
          @if (orientation() === 'horizontal') {
            <ngx-charts-bar-horizontal-stacked
              [results]="ngxGroupedResults()"
              [xAxis]="showYAxis()"
              [yAxis]="showXAxis()"
              [showGridLines]="showGrid()"
              [legend]="false"
              [tooltipDisabled]="!tooltip()"
              [customColors]="customColorsFn()"
              [roundEdges]="true"
              [trimYAxisTicks]="true"
              (select)="markClick.emit(toMarkClickDatum($event))"
            >
              <ng-template #tooltipTemplate let-model="model">
                <ui-chart-tooltip-content
                  [config]="effectiveConfig()"
                  [active]="true"
                  [item]="toTooltipItem(model)"
                  [label]="tooltipCategoryLabel(model)"
                  indicator="dashed"
                />
              </ng-template>
            </ngx-charts-bar-horizontal-stacked>
          } @else {
            <ngx-charts-bar-vertical-stacked
              [results]="ngxGroupedResults()"
              [xAxis]="showXAxis()"
              [yAxis]="showYAxis()"
              [showGridLines]="showGrid()"
              [legend]="false"
              [tooltipDisabled]="!tooltip()"
              [customColors]="customColorsFn()"
              [roundEdges]="true"
              [trimXAxisTicks]="true"
              [showDataLabel]="showDataLabel()"
              [dataLabelFormatting]="dataLabelFormatting()"
              (select)="markClick.emit(toMarkClickDatum($event))"
            >
              <ng-template #tooltipTemplate let-model="model">
                <ui-chart-tooltip-content
                  [config]="effectiveConfig()"
                  [active]="true"
                  [item]="toTooltipItem(model)"
                  [label]="tooltipCategoryLabel(model)"
                  indicator="dashed"
                />
              </ng-template>
            </ngx-charts-bar-vertical-stacked>
          }
        } @else {
          @if (orientation() === 'horizontal') {
            <ngx-charts-bar-horizontal-2d
              [results]="ngxGroupedResults()"
              [xAxis]="showYAxis()"
              [yAxis]="showXAxis()"
              [showGridLines]="showGrid()"
              [legend]="false"
              [tooltipDisabled]="!tooltip()"
              [customColors]="customColorsFn()"
              [roundEdges]="true"
              [trimYAxisTicks]="true"
              (select)="markClick.emit(toMarkClickDatum($event))"
            >
              <ng-template #tooltipTemplate let-model="model">
                <ui-chart-tooltip-content
                  [config]="effectiveConfig()"
                  [active]="true"
                  [item]="toTooltipItem(model)"
                  [label]="tooltipCategoryLabel(model)"
                  indicator="dashed"
                />
              </ng-template>
            </ngx-charts-bar-horizontal-2d>
          } @else {
            <ngx-charts-bar-vertical-2d
              [results]="ngxGroupedResults()"
              [xAxis]="showXAxis()"
              [yAxis]="showYAxis()"
              [showGridLines]="showGrid()"
              [legend]="false"
              [tooltipDisabled]="!tooltip()"
              [customColors]="customColorsFn()"
              [roundEdges]="true"
              [trimXAxisTicks]="true"
              [showDataLabel]="showDataLabel()"
              [dataLabelFormatting]="dataLabelFormatting()"
              (select)="markClick.emit(toMarkClickDatum($event))"
            >
              <ng-template #tooltipTemplate let-model="model">
                <ui-chart-tooltip-content
                  [config]="effectiveConfig()"
                  [active]="true"
                  [item]="toTooltipItem(model)"
                  [label]="tooltipCategoryLabel(model)"
                  indicator="dashed"
                />
              </ng-template>
            </ngx-charts-bar-vertical-2d>
          }
        }
      } @else {
        @if (orientation() === 'horizontal') {
          <ngx-charts-bar-horizontal
            [results]="ngxSingleResults()"
            [xAxis]="showYAxis()"
            [yAxis]="showXAxis()"
            [showGridLines]="showGrid()"
            [legend]="false"
            [tooltipDisabled]="!tooltip()"
            [customColors]="customColorsFn()"
            [roundEdges]="true"
            [trimYAxisTicks]="true"
            [showDataLabel]="showDataLabel()"
            [dataLabelFormatting]="dataLabelFormatting()"
            (select)="markClick.emit(toMarkClickDatum($event))"
          >
            <ng-template #tooltipTemplate let-model="model">
              <ui-chart-tooltip-content
                [config]="effectiveConfig()"
                [active]="true"
                [item]="toTooltipItem(model)"
                [label]="tooltipCategoryLabel(model)"
                [hideName]="true"
                indicator="dashed"
              />
            </ng-template>
          </ngx-charts-bar-horizontal>
        } @else {
          <ngx-charts-bar-vertical
            [results]="ngxSingleResults()"
            [xAxis]="showXAxis()"
            [yAxis]="showYAxis()"
            [showGridLines]="showGrid()"
            [legend]="false"
            [tooltipDisabled]="!tooltip()"
            [customColors]="customColorsFn()"
            [roundEdges]="true"
            [trimXAxisTicks]="true"
            [showDataLabel]="showDataLabel()"
            [dataLabelFormatting]="dataLabelFormatting()"
            (select)="markClick.emit(toMarkClickDatum($event))"
          >
            <ng-template #tooltipTemplate let-model="model">
              <ui-chart-tooltip-content
                [config]="effectiveConfig()"
                [active]="true"
                [item]="toTooltipItem(model)"
                [label]="tooltipCategoryLabel(model)"
                [hideName]="true"
                indicator="dashed"
              />
            </ng-template>
          </ngx-charts-bar-vertical>
        }
      }
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="legendKeys()" />
    }
  `,
})
export class ChartBarComponent {
  readonly data = input.required<ChartBarDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly orientation = input<ChartBarOrientation>('vertical');
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Forces every bar to this one color ("Basic"). Omit for the default per-category/per-series color cycling ("Mixed"). */
  readonly color = input<string | undefined>(undefined);
  /** Legend/tooltip label for the single series when `color` forces a uniform fill. */
  readonly seriesLabel = input('Value');
  /** Highlights one category with a dashed border + 80% opacity ("Active") — single-series only, matching Figma's Active example. */
  readonly activeCategory = input<string | undefined>(undefined);
  readonly showDataLabel = input(false, { transform: booleanAttribute });
  readonly dataLabelFormatting = input<((value: number) => string) | undefined>(undefined);
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(false, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly markClick = output<ChartBarDatum>();

  protected readonly chartId = `chart-bar-card-${++chartBarCardIdSeq}`;

  private readonly renderer = inject(Renderer2);
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  private activeBarStyleEl: HTMLStyleElement | null = null;

  protected readonly isMultiSeries = computed(() => this.data().some((d) => d.series != null));
  protected readonly categoryOrder = computed(() => {
    const order: string[] = [];
    for (const d of this.data()) {
      if (!order.includes(d.category)) order.push(d.category);
    }
    return order;
  });
  protected readonly seriesOrder = computed(() => collectSeriesOrder(this.data()));

  protected readonly ngxSingleResults = computed(() => toNgxSingleResults(this.data(), this.categoryOrder()));
  protected readonly ngxGroupedResults = computed(() =>
    toNgxGroupedResults(this.data(), this.categoryOrder(), this.seriesOrder()),
  );

  protected readonly legendKeys = computed(() =>
    this.color() ? [SINGLE_SERIES_KEY] : this.isMultiSeries() ? this.seriesOrder() : this.categoryOrder(),
  );

  /** Single source of truth for color + label, shared by `ChartContainer`, the legend, and tooltip resolution. */
  protected readonly effectiveConfig = computed<ChartConfig>(() => {
    const forcedColor = this.color();
    if (forcedColor) {
      return { [SINGLE_SERIES_KEY]: { label: this.seriesLabel(), color: forcedColor } };
    }
    const keys = this.isMultiSeries() ? this.seriesOrder() : this.categoryOrder();
    const provided = this.colorMapping() ?? {};
    const colorsFn = buildCustomColors(provided, keys);
    const merged: ChartConfig = {};
    for (const key of keys) {
      merged[key] = { label: provided[key]?.label ?? key, color: provided[key]?.color ?? colorsFn(key) };
    }
    return merged;
  });

  protected readonly customColorsFn = computed(() => {
    const forcedColor = this.color();
    if (forcedColor) {
      return () => forcedColor;
    }
    const config = this.effectiveConfig();
    return (name: string) => config[name]?.color ?? 'var(--chart-1)';
  });

  protected readonly hostClasses = computed(() => cn('block', this.className()));
  protected readonly plotClasses = computed(() =>
    cn('w-full', this.orientation() === 'horizontal' ? 'aspect-square' : 'aspect-video'),
  );

  constructor() {
    this.activeBarStyleEl = this.renderer.createElement('style');
    this.renderer.appendChild(this.hostEl.nativeElement, this.activeBarStyleEl);
    effect(() => {
      const active = this.activeCategory();
      const index = active ? this.categoryOrder().indexOf(active) : -1;
      const color = index >= 0 ? this.customColorsFn()(this.categoryOrder()[index]) : '';
      this.renderer.setProperty(
        this.activeBarStyleEl,
        'textContent',
        buildActiveBarStyleText(this.chartId, index, color),
      );
    });
  }

  protected toTooltipItem(model: NgxBarModel): ChartTooltipPayloadItem {
    const key = this.color() ? SINGLE_SERIES_KEY : model.name;
    const entry = this.effectiveConfig()[key];
    return { name: entry?.label ?? key, dataKey: key, value: model.value, color: entry?.color };
  }

  protected tooltipCategoryLabel(model: NgxBarModel): string {
    return model.series ?? model.name;
  }

  /** ngx-charts' `(select)` payload is `bar.data` (`{name, value, series?}`) — remap to the public `ChartBarDatum` shape. */
  protected toMarkClickDatum(model: NgxBarModel): ChartBarDatum {
    if (model.series) {
      return { category: model.series, series: model.name, value: model.value };
    }
    return { category: model.name, value: model.value };
  }
}

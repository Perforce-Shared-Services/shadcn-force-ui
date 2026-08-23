import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/lib/utils';

import {
  ChartContainerComponent,
  ChartLegendContentComponent,
  ChartTooltipContentComponent,
} from './chart.component';
import {
  buildCustomColors,
  collectCategoryOrder,
  collectSeriesOrder,
  toNgxGroupedResults,
  toNgxSingleResults,
} from './chart.helpers';
import type { ChartBarDatum, ChartConfig, ChartConfigEntry, ChartTooltipPayloadItem } from './chart.types';

interface NgxBarModel {
  name: string;
  value: number;
  series?: string;
}

/** Key used when `color` forces every bar to one uniform fill ("Basic" example). */
const SINGLE_SERIES_KEY = '__single__';

/**
 * Angular port of the registry's recharts `<BarChart>` composition — the
 * cross-framework "chart type" building block matching the shadcn bar chart
 * examples. Built on `@swimlane/ngx-charts` (recharts is a React renderer
 * with no Angular escape hatch) over this package's `ChartContainer` /
 * `ChartTooltipContent` / `ChartLegendContent`.
 *
 * Chrome defaults match the registry `chart-example.tsx` source
 * (`<CartesianGrid vertical={false} />`, no Y axis): `showYAxis` defaults
 * false, `showGrid` (horizontal lines only) defaults true.
 */
@Component({
  selector: 'div[uiChartBar]',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  templateUrl: './chart-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-bar',
    '[class]': 'hostClasses()',
  },
})
export class ChartBarComponent {
  readonly data = input.required<ChartBarDatum[]>();
  /** Per-series/category color + label overrides; falls back to the token color cycle. */
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Forces every bar to this one color; omit for per-category/series colors. */
  readonly color = input<string | undefined>(undefined);
  /** Legend/tooltip label for the single series when `color` forces a uniform fill. */
  readonly seriesLabel = input('Value');
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(false, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly isMultiSeries = computed(() => this.data().some((d) => d.series != null));
  protected readonly categoryOrder = computed(() => collectCategoryOrder(this.data()));
  protected readonly seriesOrder = computed(() => collectSeriesOrder(this.data()));

  protected readonly ngxSingleResults = computed(() =>
    toNgxSingleResults(this.data(), this.categoryOrder()),
  );
  protected readonly ngxGroupedResults = computed(() =>
    toNgxGroupedResults(this.data(), this.categoryOrder(), this.seriesOrder()),
  );

  protected readonly legendKeys = computed(() =>
    this.color() ? [SINGLE_SERIES_KEY] : this.isMultiSeries() ? this.seriesOrder() : this.categoryOrder(),
  );

  /** Single source of truth for color + label, shared by container, legend and tooltip resolution. */
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

  protected toTooltipItem(model: NgxBarModel): ChartTooltipPayloadItem {
    const key = this.color() ? SINGLE_SERIES_KEY : model.name;
    const entry: ChartConfigEntry | undefined = this.effectiveConfig()[key];
    return { name: entry?.label ?? key, dataKey: key, value: model.value, color: entry?.color };
  }

  protected tooltipCategoryLabel(model: NgxBarModel): string {
    return model.series ?? model.name;
  }
}

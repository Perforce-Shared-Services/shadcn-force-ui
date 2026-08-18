import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';

import { percentageOf } from './chart-donut.helpers';
import { buildCustomColors, sortCategories, toNgxSingleResults } from './chart.helpers';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import type { ChartConfig, ChartSortBy, ChartTooltipPayloadItem, ChartValueDatum } from './chart.types';

let chartDonutIdSeq = 0;

interface NgxPieModel {
  name: string;
  value: number;
}

/**
 * Angular port of Figma's `Chart / Pie Chart / Donut` (and `/ Full`)
 * components (docs linked to `ui.shadcn.com/charts#pie-chart`) — the
 * cross-framework "chart type" building block, matching the actual
 * shadcn/recharts pie/donut examples rather than an abstract dashboard-widget
 * spec. Built on `@swimlane/ngx-charts` (recharts has no Angular escape
 * hatch — see `.claude/branch-context.md`) and this app's `ui/chart` wrapper
 * (`ChartContainer`/`ChartTooltipContent`/`ChartLegendContent`).
 *
 * One flexible component + flags (`donut`, `centerValue`/`centerLabel`,
 * `showPercentage`), not a fixed set of hardcoded variants — same approach as
 * `ui-chart-bar`. A `ui-chart-donut-widget` dashboard layer (title/subtitle/
 * headline-metric/action-menu/states, per `the-force-design-spec` MCP's
 * `patterns/components/donut-chart.md`) can compose this component later,
 * exactly like `ui-chart-widget` composes `ui-chart-bar` — not built yet,
 * no confirmed consumer needs it.
 *
 * Scope intentionally mirrors `ui-chart-bar`'s: no data validation or
 * segment-count capping lives here (see `chart-donut.helpers.ts`'s
 * `findChartDonutDataError`/`capSegmentCount`, ready for that future widget
 * layer to call) — the card assumes valid data, same as `ui-chart-bar`
 * assumes valid data and leaves state handling to `ui-chart-widget`.
 * The donut-chart.md spec's "Active"/"Stacked" (concentric ring) variants
 * aren't implemented — no Figma `get_design_context` was pulled for them
 * this round, and guessing their exact geometry isn't worth it without that.
 */
@Component({
  selector: 'ui-chart-donut',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartTooltipContentComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-donut',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      <div class="relative size-full">
        <ngx-charts-pie-chart
          [results]="ngxResults()"
          [doughnut]="donut()"
          [arcWidth]="arcWidth()"
          [legend]="false"
          [labels]="false"
          [tooltipDisabled]="!tooltip()"
          [customColors]="customColorsFn()"
          (select)="markClick.emit(toMarkClickDatum($event))"
        >
          <ng-template #tooltipTemplate let-model="model">
            <ui-chart-tooltip-content
              [config]="effectiveConfig()"
              [active]="true"
              [item]="toTooltipItem(model)"
              [hideName]="true"
              indicator="dot"
            />
          </ng-template>
        </ngx-charts-pie-chart>
        @if (donut() && (centerValue() || centerLabel())) {
          <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            @if (centerValue()) {
              <span class="text-3xl font-bold text-foreground">{{ centerValue() }}</span>
            }
            @if (centerLabel()) {
              <span class="text-xs text-muted-foreground">{{ centerLabel() }}</span>
            }
          </div>
        }
      </div>
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="categoryOrder()" />
    }
  `,
})
export class ChartDonutComponent {
  readonly data = input.required<ChartValueDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  /** `false` renders a solid pie instead of a ring — Figma has both `Chart / Pie Chart / Full` and `/ Donut` component sets. */
  readonly donut = input(true, { transform: booleanAttribute });
  /** Ring thickness as a fraction of the outer radius (0–1). 0.4 matches donut-chart.md's "inner radius is 60% of the outer" (1 − 0.6). */
  readonly arcWidth = input(0.4);
  /** Value shown in the ring's centre hole (donut-chart.md's `centre-kpi` pattern) — only rendered when `donut` is true. */
  readonly centerValue = input<string | number | undefined>(undefined);
  readonly centerLabel = input<string | undefined>(undefined);
  readonly showPercentage = input(true, { transform: booleanAttribute });
  readonly sortBy = input<ChartSortBy>('value-desc');
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly markClick = output<ChartValueDatum>();

  protected readonly chartId = `chart-donut-${++chartDonutIdSeq}`;

  protected readonly categoryOrder = computed(() => sortCategories(this.data(), this.sortBy()));
  protected readonly total = computed(() => this.data().reduce((sum, d) => sum + d.value, 0));
  protected readonly ngxResults = computed(() => toNgxSingleResults(this.data(), this.categoryOrder()));

  /** Single source of truth for color + label (label optionally suffixed with "(NN%)"), shared by `ChartContainer`, the legend, and tooltip resolution. */
  protected readonly effectiveConfig = computed<ChartConfig>(() => {
    const keys = this.categoryOrder();
    const provided = this.colorMapping() ?? {};
    const colorsFn = buildCustomColors(provided, keys);
    const byCategory = new Map(this.data().map((d) => [d.category, d.value]));
    const totalValue = this.total();
    const showPct = this.showPercentage();
    const merged: ChartConfig = {};
    for (const key of keys) {
      const baseLabel = provided[key]?.label ?? key;
      const pct = percentageOf(byCategory.get(key) ?? 0, totalValue);
      merged[key] = {
        label: showPct ? `${baseLabel} (${pct}%)` : baseLabel,
        color: provided[key]?.color ?? colorsFn(key),
      };
    }
    return merged;
  });

  protected readonly customColorsFn = computed(() => {
    const config = this.effectiveConfig();
    return (name: string) => config[name]?.color ?? 'var(--chart-1)';
  });

  protected readonly hostClasses = computed(() => cn('block', this.className()));
  protected readonly plotClasses = computed(() => cn('mx-auto aspect-square w-full max-w-64'));

  protected toTooltipItem(model: NgxPieModel): ChartTooltipPayloadItem {
    const entry = this.effectiveConfig()[model.name];
    return { name: entry?.label ?? model.name, dataKey: model.name, value: model.value, color: entry?.color };
  }

  /** ngx-charts' `(select)` payload is the raw datum (`{name, value}`) — remap to the public `ChartValueDatum` shape. */
  protected toMarkClickDatum(model: NgxPieModel): ChartValueDatum {
    return { category: model.name, value: model.value };
  }
}

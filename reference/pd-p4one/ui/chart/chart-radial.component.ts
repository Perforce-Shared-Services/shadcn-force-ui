import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';

import { buildCustomColors, sortCategories, toNgxSingleResults } from './chart.helpers';
import { ChartContainerComponent, ChartLegendContentComponent } from './chart.component';
import type { ChartConfig, ChartSortBy, ChartValueDatum } from './chart.types';

let chartRadialIdSeq = 0;

/**
 * Angular port of Figma's `Chart / Radial Chart` component (docs linked to
 * `ui.shadcn.com/charts#radial-chart`) — the cross-framework "chart type"
 * building block, matching the actual shadcn/recharts `RadialBarChart`
 * examples rather than an abstract dashboard-widget spec. Built on
 * `@swimlane/ngx-charts`'s `GaugeComponent` (`ngx-charts-gauge`) — no
 * dedicated radial-bar-chart primitive exists in ngx-charts, but `Gauge`
 * genuinely reproduces the same anatomy: it already renders one concentric
 * ring per `results` entry (`getArcs()` divides the radius across
 * `results.length`), and each ring is a track (full circle) + a proportional
 * value arc with shared corner rounding — exactly Figma's Basic/Text/Shape
 * variants, not an approximation.
 *
 * One data entry → Figma's "Text"/"Shape" (single ring, centered value +
 * label via `GaugeComponent`'s built-in two-line text, `angleSpan=360`).
 * Multiple entries → Figma's "Basic" (concentric multi-ring, no center text
 * since there's no single number to show).
 *
 * **Deliberately NOT implemented**: Figma's "Label" (curved text-on-path per
 * ring) and "Grid" (dashed polar backdrop) variants — no text-path or
 * polar-grid-for-gauge primitive exists in ngx-charts, would need hand-rolled
 * SVG. "Stacked" (two series concatenated end-to-end within ONE ring's
 * angular span, not concentric) is also out of scope — `GaugeComponent` only
 * stacks results as separate concentric rings, never as sequential segments
 * sharing one ring; that would need dropping to raw `GaugeArcComponent`/
 * `PieArcComponent` primitives with hand-computed angles, a materially
 * bigger build than a flag on this component. All three flagged the same way
 * as bar's `referenceLines`/`mini` and radar's grid-shape deferrals.
 */
@Component({
  selector: 'ui-chart-radial',
  standalone: true,
  imports: [NgxChartsModule, ChartContainerComponent, ChartLegendContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-radial',
    '[class]': 'hostClasses()',
  },
  template: `
    <ui-chart-container [id]="chartId" [config]="effectiveConfig()" [class]="plotClasses()">
      <ngx-charts-gauge
        [results]="ngxResults()"
        [min]="min()"
        [max]="effectiveMax()"
        [angleSpan]="360"
        [startAngle]="0"
        [showAxis]="showAxis()"
        [bigSegments]="1"
        [smallSegments]="1"
        [showText]="showCenter()"
        [units]="centerLabel() ?? ''"
        [legend]="false"
        [tooltipDisabled]="!tooltip()"
        [customColors]="customColorsFn()"
      />
    </ui-chart-container>
    @if (legend()) {
      <ui-chart-legend-content [config]="effectiveConfig()" [keys]="categoryOrder()" />
    }
  `,
})
export class ChartRadialComponent {
  readonly data = input.required<ChartValueDatum[]>();
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly min = input(0);
  /** Shared domain ceiling for every ring. Defaults to the largest value so at least one ring reaches full. */
  readonly max = input<number | undefined>(undefined);
  readonly sortBy = input<ChartSortBy>('value-desc');
  readonly showAxis = input(false, { transform: booleanAttribute });
  readonly legend = input(true, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly chartId = `chart-radial-${++chartRadialIdSeq}`;

  protected readonly categoryOrder = computed(() => sortCategories(this.data(), this.sortBy()));
  protected readonly ngxResults = computed(() => toNgxSingleResults(this.data(), this.categoryOrder()));

  /** Single ring → Figma "Text"/"Shape" (centered value+label). Multiple rings → "Basic" (no center text). */
  protected readonly showCenter = computed(() => this.data().length === 1);
  protected readonly centerLabel = computed(() => (this.showCenter() ? this.effectiveConfig()[this.categoryOrder()[0]]?.label : undefined));

  protected readonly effectiveMax = computed(() => this.max() ?? Math.max(...this.data().map((d) => d.value), 1));

  protected readonly effectiveConfig = computed<ChartConfig>(() => {
    const keys = this.categoryOrder();
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
  protected readonly plotClasses = computed(() => cn('mx-auto aspect-square w-full max-w-64'));
}

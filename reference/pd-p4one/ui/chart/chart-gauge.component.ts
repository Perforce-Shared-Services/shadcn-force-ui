import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';

let chartGaugeIdSeq = 0;

/** Safe/warning/critical zone boundaries, per gauge-chart.md's threshold-zones variant. Colored `--chart-3` (safe/green) → `--chart-4` (warning/orange) → `--chart-5` (critical/red). */
export interface ChartGaugeThresholds {
  warning: number;
  critical: number;
}

/**
 * Angular port of `the-force-design-spec` MCP's `gauge-chart.md` pattern —
 * the ONE chart type in this set built primarily from the spec rather than a
 * Figma `Chart / <Type>` component, because none exists: `get_metadata` on
 * Figma's "Components" section (`587:27136`) confirms exactly 7 `Chart /
 * <Type>` sets (Bar/Area/Line/Pie-Full/Pie-Donut/Radar/Radial) and gauge
 * isn't one of them, and this fork's shadcn registry has no gauge demo
 * either (matching upstream shadcn, which never shipped a standalone gauge
 * chart type). Per this project's own rule ("Figma/shadcn is architecture
 * authority, spec is tokens/rules only"), that rule has no source to defer
 * to here — `gauge-chart.md` is the only anatomy definition that exists at
 * all, so it's used directly, same way `ui-chart-widget` used
 * `bar-chart.md` for its dashboard chrome when no Figma widget existed.
 *
 * Built on `@swimlane/ngx-charts`'s `GaugeComponent` (`ngx-charts-gauge`),
 * overridden to the spec's required 180° semicircle (`startAngle=-90,
 * angleSpan=180`; ngx-charts' own default is a 240° speedometer arc).
 *
 * First pass covers the spec's `standard` (single color) and
 * `threshold-zones` (color depends on which zone `value` falls in — safe/
 * warning/critical) variants. **Deferred**: `with-target` (a target tick
 * mark at a specific angle — needs a hand-computed SVG overlay using real
 * trigonometry against the semicircle, no Figma reference to verify
 * placement against), `mini`, `kpi-with-delta`, `target-zone` — flagged the
 * same way this chart set defers every variant needing custom SVG geometry
 * beyond ngx-charts' public inputs.
 */
@Component({
  selector: 'ui-chart-gauge',
  standalone: true,
  imports: [NgxChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-gauge',
    '[class]': 'hostClasses()',
  },
  template: `
    <ngx-charts-gauge
      [results]="ngxResults()"
      [min]="min()"
      [max]="max()"
      [startAngle]="-90"
      [angleSpan]="180"
      [showAxis]="showAxis()"
      [bigSegments]="bigSegments()"
      [smallSegments]="1"
      [showText]="true"
      [units]="unitLabel()"
      [legend]="false"
      [tooltipDisabled]="true"
      [customColors]="customColorsFn()"
    />
  `,
})
export class ChartGaugeComponent {
  readonly value = input.required<number>();
  readonly min = input(0);
  readonly max = input(100);
  readonly unitLabel = input('');
  /** Colors the value arc by zone (`--chart-3` safe / `--chart-4` warning / `--chart-5` critical) instead of a flat color. */
  readonly thresholds = input<ChartGaugeThresholds | undefined>(undefined);
  /** Flat color for the `standard` variant (ignored when `thresholds` is set). */
  readonly color = input('var(--chart-1)');
  readonly showAxis = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly chartId = `chart-gauge-${++chartGaugeIdSeq}`;

  protected readonly ngxResults = computed(() => [{ name: 'value', value: this.value() }]);

  protected readonly zoneColor = computed(() => {
    const zones = this.thresholds();
    if (!zones) {
      return this.color();
    }
    const v = this.value();
    if (v >= zones.critical) return 'var(--chart-5)';
    if (v >= zones.warning) return 'var(--chart-4)';
    return 'var(--chart-3)';
  });

  protected readonly customColorsFn = computed(() => {
    const color = this.zoneColor();
    return () => color;
  });

  /** One big segment per whole-number decile of the min/max span, min 2 so the track never renders as a single unbroken arc. */
  protected readonly bigSegments = computed(() => Math.max(2, Math.round((this.max() - this.min()) / 10)));

  protected readonly hostClasses = computed(() => cn('block', this.className()));
}

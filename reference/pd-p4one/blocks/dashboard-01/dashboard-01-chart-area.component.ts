import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { ChartArea, type ChartConfig } from '@/app/ui/chart';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/app/ui/toggle-group';

import { DASHBOARD_VISITORS_SERIES, sliceLastDays } from './dashboard-01.data';

/**
 * The toggle group's three named alternatives — a TS enum per this app's
 * "3+ named alternatives" rule (not bare string literals at the template
 * call sites). Values are the day-count each range slices from
 * `DASHBOARD_VISITORS_SERIES`.
 */
export enum VisitorsRange {
  Last3Months = '90',
  Last30Days = '30',
  Last7Days = '7',
}

const RANGE_LABEL: Record<VisitorsRange, string> = {
  [VisitorsRange.Last3Months]: 'the last 3 months',
  [VisitorsRange.Last30Days]: 'the last 30 days',
  [VisitorsRange.Last7Days]: 'the last 7 days',
};

/**
 * The "Total Visitors" chart card. Composed from `ui/card` + `ui/toggle-group`
 * (a 3-way single-select segmented control — checked first against `ui/tabs`,
 * but `ui/toggle-group`'s `type="single"` + `[(value)]` is the closer match
 * for "pick one of three ranges" than a tabs' content-panel model, and it's
 * what the real shadcn dashboard-01 demo itself uses) + the already-ported
 * `ui-chart-area` card for the plot.
 *
 * Two-series (desktop/mobile) stacked area with a gradient fill, no legend
 * (per the Figma frame) — colors come from the chart's own `--chart-1`/
 * `--chart-2` tokens (purple/cyan in this app's palette), not an invented
 * hex value.
 */
@Component({
  selector: 'app-block-dashboard-01-chart-area',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, ChartArea, ToggleGroup, ToggleGroupItem],
  template: `
    <div uiCard>
      <div uiCardHeader>
        <div uiCardTitle>Total Visitors</div>
        <div uiCardDescription>Total for {{ rangeLabel() }}</div>
        <div uiCardAction>
          <div
            uiToggleGroup
            type="single"
            variant="outline"
            [spacing]="0"
            [value]="range()"
            (valueChange)="onRangeChange($event)"
            aria-label="Select date range"
          >
            <button uiToggleGroupItem [value]="ranges.Last3Months">Last 3 months</button>
            <button uiToggleGroupItem [value]="ranges.Last30Days">Last 30 days</button>
            <button uiToggleGroupItem [value]="ranges.Last7Days">Last 7 days</button>
          </div>
        </div>
      </div>
      <div uiCardContent>
        <div [class]="plotWrapperClasses()">
          <ui-chart-area
            [data]="filteredData()"
            [colorMapping]="colorMapping"
            [stacked]="true"
            [gradient]="true"
            [legend]="false"
            class="block h-full"
          />
        </div>
      </div>
    </div>
  `,
})
export class Dashboard01ChartAreaComponent {
  protected readonly ranges = VisitorsRange;
  protected readonly range = signal<VisitorsRange>(VisitorsRange.Last3Months);
  protected readonly rangeLabel = computed(() => RANGE_LABEL[this.range()]);

  protected readonly filteredData = computed(() =>
    sliceLastDays(DASHBOARD_VISITORS_SERIES, Number(this.range())),
  );

  /**
   * `ui-chart-area` hardcodes its plot to `aspect-video` with no
   * height/aspect-ratio override input — appropriate for its own small-card
   * default use, but wrong for this wide, full-card-width analytics chart
   * (matches the real upstream `chart-area-interactive`, which overrides its
   * own chart's default sizing with a fixed `h-[250px]` for the same reason).
   * `[data-slot=chart]` is `ui/chart`'s own stable data-slot (see
   * `chart.component.ts`) — targeting it via a Tailwind arbitrary
   * descendant-variant on this wrapper is a non-invasive per-instance
   * override; it doesn't touch the shared primitive.
   *
   * A daily category axis genuinely needs one point per day for the 7-day
   * and 30-day ranges to read correctly, but at 90 points (the 3-month
   * range) ngx-charts renders every category as its own axis tick with no
   * built-in label-skipping — visibly denser than the real Figma frame.
   * `ui-chart-area` has no tick-interval input either, so the fix is the
   * same non-invasive technique this codebase already uses elsewhere
   * (`chart-bar-card.helpers.ts` targets ngx-charts' generated `.tick`
   * groups the same way): hide all but every 8th tick group via `:nth-of-
   * type`, ~8x fewer labels, only when the category count is actually dense
   * enough to need it (30/7-day ranges are already sparse and stay
   * untouched).
   */
  protected readonly hasDenseTicks = computed(() => this.range() === VisitorsRange.Last3Months);
  protected readonly plotWrapperClasses = computed(() =>
    cn(
      'h-[368px] w-full [&_[data-slot=chart]]:aspect-auto [&_[data-slot=chart]]:h-full',
      this.hasDenseTicks() && '[&_.tick:not(:nth-of-type(8n+1))]:hidden',
    ),
  );

  protected readonly colorMapping: ChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };

  /** `ui/toggle-group`'s `valueChange` emits radix-ng's generic `AcceptableValue | AcceptableValue[] | undefined` (the directive's shared shape for single/multiple, any value type) — narrow to the single selected `VisitorsRange`. */
  protected onRangeChange(value: unknown): void {
    const next = Array.isArray(value) ? value[0] : value;
    if (next === VisitorsRange.Last3Months || next === VisitorsRange.Last30Days || next === VisitorsRange.Last7Days) {
      this.range.set(next);
    }
  }
}

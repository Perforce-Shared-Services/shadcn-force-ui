import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { Badge } from '@/app/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/ui/card';

import { DASHBOARD01_ICONS, decorativeIcon } from './dashboard-01.icons';

type TrendDirection = 'up' | 'down';

interface MetricCard {
  label: string;
  value: string;
  trendDirection: TrendDirection;
  trendValue: string;
  description: string;
  caption: string;
}

/**
 * The 4-card KPI row at the top of the `dashboard-01` block. Each card is
 * `ui/card` + `ui/badge` (outline variant) + a trend arrow icon — the same
 * up/down token convention `ui-chart-widget` establishes for its delta pill
 * (`deltaClasses()`: `text-success` for up, `text-destructive` for down), not
 * a computed opacity tint or an invented color.
 *
 * A plain composition, not `ui-chart-widget` — these are static KPI tiles
 * with no plot area, so the chart chrome (title/legend/table-fallback) would
 * be pure overhead here.
 */
@Component({
  selector: 'app-block-dashboard-01-section-cards',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, Badge, Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle],
  template: `
    <div class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
      <div uiCard *ngFor="let metric of metrics">
        <div uiCardHeader>
          <div uiCardDescription>{{ metric.label }}</div>
          <div uiCardTitle class="text-2xl font-semibold tabular-nums">{{ metric.value }}</div>
          <div uiCardAction>
            <span uiBadge variant="outline" [class]="trendClasses(metric.trendDirection)">
              <span
                data-icon="inline-start"
                aria-hidden="true"
                class="[&_svg]:size-3.5 [&_svg]:fill-current"
                [innerHTML]="metric.trendDirection === 'up' ? trendUpIcon : trendDownIcon"
              ></span>
              {{ metric.trendValue }}
            </span>
          </div>
        </div>
        <div uiCardFooter class="flex-col items-start gap-1.5 text-sm">
          <div class="line-clamp-1 flex items-center gap-2 font-medium" [class]="trendClasses(metric.trendDirection)">
            {{ metric.description }}
            <span
              aria-hidden="true"
              class="[&_svg]:size-4 [&_svg]:fill-current"
              [innerHTML]="metric.trendDirection === 'up' ? trendUpIcon : trendDownIcon"
            ></span>
          </div>
          <div class="text-muted-foreground">{{ metric.caption }}</div>
        </div>
      </div>
    </div>
  `,
})
export class Dashboard01SectionCardsComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly trendUpIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    decorativeIcon(DASHBOARD01_ICONS.trendingUp),
  );
  protected readonly trendDownIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    decorativeIcon(DASHBOARD01_ICONS.trendingDown),
  );

  protected readonly metrics: MetricCard[] = [
    {
      label: 'Total Revenue',
      value: '$15,231.89',
      trendDirection: 'up',
      trendValue: '+12.5%',
      description: 'Trending up this month',
      caption: 'Visitors for the last 6 months',
    },
    {
      label: 'New Customers',
      value: '1,234',
      trendDirection: 'down',
      trendValue: '-20%',
      description: 'Down 20% this period',
      caption: 'Acquisition needs attention',
    },
    {
      label: 'Active Accounts',
      value: '45,678',
      trendDirection: 'up',
      trendValue: '+12.5%',
      description: 'Strong user retention',
      caption: 'Engagement exceed targets',
    },
    {
      label: 'Growth Rate',
      value: '4.5%',
      trendDirection: 'up',
      trendValue: '+4.5%',
      description: 'Steady performance increase',
      caption: 'Meets growth projections',
    },
  ];

  /** Same up=success / down=destructive token convention as `ui-chart-widget`'s `deltaClasses()`. */
  protected trendClasses(direction: TrendDirection): string {
    return cn(direction === 'up' ? 'text-success' : 'text-destructive');
  }
}

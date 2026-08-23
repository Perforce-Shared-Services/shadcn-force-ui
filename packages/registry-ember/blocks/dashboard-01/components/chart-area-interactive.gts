// [FORCE-UI] Ember port of registry:block dashboard-01 chart-area-interactive
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/components/chart-area-interactive.tsx)
// ponytail: static inline-SVG area chart standing in for the recharts interactive
// version — no chart library exists in the ember stack. Upgrade path: port the
// ChartContainer primitives or add an ember chart dep, then swap this out.
import { cn } from '@/lib/utils';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import type { TOC } from '@ember/component/template-only';

const chartData = [
  { month: 'January', revenue: 186 },
  { month: 'February', revenue: 305 },
  { month: 'March', revenue: 237 },
  { month: 'April', revenue: 273 },
  { month: 'May', revenue: 209 },
  { month: 'June', revenue: 214 },
];

function toPoints(data: { revenue: number }[], width: number, height: number) {
  const max = Math.max(...data.map((d) => d.revenue)) * 1.15;
  return data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.revenue / max) * height;
      return `${x},${y}`;
    })
    .join(' ');
}

interface ChartAreaInteractiveSignature {
  Element: HTMLDivElement;
  Args: { class?: string };
  Blocks: { default: [] };
}

const ChartAreaInteractive: TOC<ChartAreaInteractiveSignature> = <template>
  <div class={{cn "@container/chart px-4 lg:px-6" @class}} ...attributes>
    <Card @class="@container/card">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>
          <span class="hidden @[540px]/card:block">
            Total for the last 6 months
          </span>
          <span class="@[540px]/card:hidden">Last 6 months</span>
        </CardDescription>
        <CardAction>
          <label class="flex items-center gap-2 text-sm font-medium">
            <Checkbox />
            Linear
          </label>
        </CardAction>
      </CardHeader>
      <CardContent @class="pt-2">
        <svg
          viewBox="0 0 600 220"
          preserveAspectRatio="none"
          class="h-56 w-full text-primary"
          role="img"
          aria-label="Area chart of total revenue for the last 6 months"
        >
          <defs>
            <linearGradient id="chart-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="currentColor" stop-opacity="0.4" />
              <stop offset="100%" stop-color="currentColor" stop-opacity="0.02" />
            </linearGradient>
          </defs>
          {{! grid lines }}
          <line x1="0" y1="55" x2="600" y2="55" class="stroke-border" stroke-width="1" />
          <line x1="0" y1="110" x2="600" y2="110" class="stroke-border" stroke-width="1" />
          <line x1="0" y1="165" x2="600" y2="165" class="stroke-border" stroke-width="1" />
          <polygon
            points="0,220 {{toPoints chartData 600 200}} 600,220"
            fill="url(#chart-area-gradient)"
          />
          <polyline
            points={{toPoints chartData 600 200}}
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </svg>
        <div class="text-muted-foreground mt-2 flex justify-between text-xs">
          {{#each chartData as |point|}}
            <span>{{point.month}}</span>
          {{/each}}
        </div>
      </CardContent>
    </Card>
  </div>
</template>;

export { ChartAreaInteractive };

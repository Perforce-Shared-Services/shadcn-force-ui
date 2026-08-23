// [FORCE-UI] Ember port of registry:block dashboard-01 section-cards
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/components/section-cards.tsx)
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import TrendingDown from '~icons/ms/trending_down';
import TrendingUp from '~icons/ms/trending_up';

import type { TOC } from '@ember/component/template-only';

interface SectionCardsSignature {
  Element: HTMLDivElement;
  Blocks: { default: [] };
}

const SectionCards: TOC<SectionCardsSignature> = <template>
  <div
    class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card"
    ...attributes
  >
    <Card @class="@container/card">
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle
          @class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >$1,250.00</CardTitle>
        <CardAction>
          <Badge @variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter @class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          Trending up this month
          <TrendingUp class="size-4" />
        </div>
        <div class="text-muted-foreground">Visitors for the last 6 months</div>
      </CardFooter>
    </Card>
    <Card @class="@container/card">
      <CardHeader>
        <CardDescription>New Customers</CardDescription>
        <CardTitle
          @class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >1,234</CardTitle>
        <CardAction>
          <Badge @variant="outline">
            <TrendingDown />
            -20%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter @class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          Down 20% this period
          <TrendingDown class="size-4" />
        </div>
        <div class="text-muted-foreground">Acquisition needs attention</div>
      </CardFooter>
    </Card>
    <Card @class="@container/card">
      <CardHeader>
        <CardDescription>Active Accounts</CardDescription>
        <CardTitle
          @class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >45,678</CardTitle>
        <CardAction>
          <Badge @variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter @class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          Strong user retention
          <TrendingUp class="size-4" />
        </div>
        <div class="text-muted-foreground">Engagement exceed targets</div>
      </CardFooter>
    </Card>
    <Card @class="@container/card">
      <CardHeader>
        <CardDescription>Growth Rate</CardDescription>
        <CardTitle
          @class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >4.5%</CardTitle>
        <CardAction>
          <Badge @variant="outline">
            <TrendingUp />
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter @class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          Steady performance increase
          <TrendingUp class="size-4" />
        </div>
        <div class="text-muted-foreground">Meets growth projections</div>
      </CardFooter>
    </Card>
  </div>
</template>;

export { SectionCards };

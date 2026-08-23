<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<script lang="ts">
  import TrendingDown from "~icons/ms/trending_down"
  import TrendingUp from "~icons/ms/trending_up"
  import { Badge } from "$lib/registry/ui/badge/index.js"
  import * as Card from "$lib/registry/ui/card/index.js"

  const cards = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      badge: "+12.5%",
      trend: "up",
      note: "Trending up this month",
      detail: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: "1,234",
      badge: "-20%",
      trend: "down",
      note: "Down 20% this period",
      detail: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      badge: "+12.5%",
      trend: "up",
      note: "Strong user retention",
      detail: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      badge: "+4.5%",
      trend: "up",
      note: "Steady performance increase",
      detail: "Meets growth projections",
    },
  ]
</script>

<div
  class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card"
>
  {#each cards as card (card.title)}
    <Card.Root class="@container/card">
      <Card.Header>
        <Card.Description>{card.title}</Card.Description>
        <Card.Title
          class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >
          {card.value}
        </Card.Title>
        <Card.Action>
          <Badge variant="outline">
            {#if card.trend === "up"}<TrendingUp />{:else}<TrendingDown />{/if}
            {card.badge}
          </Badge>
        </Card.Action>
      </Card.Header>
      <Card.Footer class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          {card.note}
          {#if card.trend === "up"}
            <TrendingUp class="size-4" />
          {:else}
            <TrendingDown class="size-4" />
          {/if}
        </div>
        <div class="text-muted-foreground">{card.detail}</div>
      </Card.Footer>
    </Card.Root>
  {/each}
</div>

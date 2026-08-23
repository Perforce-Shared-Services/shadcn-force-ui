<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/dashboard-01
import TrendingUp from '@material-symbols/svg-400/rounded/trending_up.svg?component'
import TrendingDown from '@material-symbols/svg-400/rounded/trending_down.svg?component'
import { Badge } from '@/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'

const cards = [
  {
    title: '$1,250.00',
    description: 'Total Revenue',
    badge: '+12.5%',
    trend: 'up' as const,
    footer: 'Trending up this month',
    subfooter: 'Visitors for the last 6 months',
  },
  {
    title: '1,234',
    description: 'New Customers',
    badge: '-20%',
    trend: 'down' as const,
    footer: 'Down 20% this period',
    subfooter: 'Acquisition needs attention',
  },
  {
    title: '45,678',
    description: 'Active Accounts',
    badge: '+12.5%',
    trend: 'up' as const,
    footer: 'Strong user retention',
    subfooter: 'Engagement exceed targets',
  },
  {
    title: '4.5%',
    description: 'Growth Rate',
    badge: '+4.5%',
    trend: 'up' as const,
    footer: 'Steady performance increase',
    subfooter: 'Meets growth projections',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
    <Card v-for="card in cards" :key="card.description" class="@container/card">
      <CardHeader>
        <CardDescription>{{ card.description }}</CardDescription>
        <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {{ card.title }}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp v-if="card.trend === 'up'" />
            <TrendingDown v-else />
            {{ card.badge }}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          {{ card.footer }}
          <TrendingUp v-if="card.trend === 'up'" class="size-4" />
          <TrendingDown v-else class="size-4" />
        </div>
        <div class="text-muted-foreground">{{ card.subfooter }}</div>
      </CardFooter>
    </Card>
  </div>
</template>

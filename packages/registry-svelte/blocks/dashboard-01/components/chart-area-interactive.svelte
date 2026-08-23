<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<!-- ponytail: simplified vs React — fixed 30/7-day series from static data, no gradient fill;
     swap in a richer time-series source if interactive ranges matter -->
<script lang="ts">
  import * as Card from "$lib/registry/ui/card/index.js"
  import * as Chart from "$lib/registry/ui/chart/index.js"
  import * as Select from "$lib/registry/ui/select/index.js"
  import { AreaChart } from "layerchart"

  const timeRanges = [
    { value: "90d", label: "Last 3 months" },
    { value: "30d", label: "Last 30 days" },
    { value: "7d", label: "Last 7 days" },
  ]

  let selectedTimeRange = $state("90d")

  const allData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date(2024, 4, i + 1)
    return {
      date,
      desktop: Math.round(400 + 200 * Math.sin(i / 9) + i),
      mobile: Math.round(250 + 150 * Math.cos(i / 11) + i / 2),
    }
  })

  const filteredData = $derived(
    selectedTimeRange === "90d"
      ? allData
      : allData.slice(-(selectedTimeRange === "30d" ? 30 : 7))
  )

  const chartConfig = {
    desktop: { label: "Desktop", color: "#2563eb" },
    mobile: { label: "Mobile", color: "#60a5fa" },
  } satisfies Chart.ChartConfig
</script>

<Card.Root class="@container/card">
  <Card.Header
    class="flex flex-col gap-2 @xl/card:flex-row @xl/card:items-center"
  >
    <div class="block">
      <Card.Title>Total Visitors</Card.Title>
      <Card.Description class="pt-1.5">
        <span class="hidden @[367px]/card:inline">
          Total visitors for the selected time range
        </span>
        <span class="@[367px]/card:hidden">Visitors for the selected range</span
        >
      </Card.Description>
    </div>
    <Select.Root type="single" bind:value={selectedTimeRange}>
      <Select.Trigger class="ml-auto w-[160px]" aria-label="Select a value">
        {timeRanges.find((r) => r.value === selectedTimeRange)?.label}
      </Select.Trigger>
      <Select.Content class="rounded-lg">
        {#each timeRanges as range (range.value)}
          <Select.Item value={range.value} class="rounded-md"
            >{range.label}</Select.Item
          >
        {/each}
      </Select.Content>
    </Select.Root>
  </Card.Header>
  <Card.Content class="px-2 pt-4 sm:px-6 sm:pt-6">
    <Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
      <AreaChart
        data={filteredData}
        x="date"
        series={[
          {
            key: "desktop",
            label: chartConfig.desktop.label,
            color: chartConfig.desktop.color,
          },
          {
            key: "mobile",
            label: chartConfig.mobile.label,
            color: chartConfig.mobile.color,
          },
        ]}
      />
    </Chart.Container>
  </Card.Content>
</Card.Root>

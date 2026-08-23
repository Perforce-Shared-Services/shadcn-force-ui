import { Component } from "@angular/core"

import { ChartBarComponent, type ChartConfig } from "@/angular-ui/chart"

// apps/v4/examples/base/chart-example-legend.tsx — grid + X axis + tooltip +
// legend (all chrome enabled; this is the component default).
const CHART_DATA = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const CHART_CONFIG: ChartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
}

@Component({
  selector: "preview-chart-example-legend",
  standalone: true,
  imports: [ChartBarComponent],
  template: `
    <div uiChartBar class="min-h-[200px] w-full" [data]="chartData()" [colorMapping]="config" />
  `,
})
export class ChartExampleLegendComponent {
  readonly config = CHART_CONFIG
  readonly chartData = [
    ...CHART_DATA.map((d) => ({
      category: d.month.slice(0, 3),
      value: d.desktop,
      series: "desktop",
    })),
    ...CHART_DATA.map((d) => ({
      category: d.month.slice(0, 3),
      value: d.mobile,
      series: "mobile",
    })),
  ]
}

export default ChartExampleLegendComponent

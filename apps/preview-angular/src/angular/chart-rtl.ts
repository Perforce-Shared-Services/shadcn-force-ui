import { Component } from "@angular/core"

import { ChartBarComponent, type ChartConfig } from "@/angular-ui/chart"

// apps/v4/examples/base/chart-rtl.tsx — the legend example under RTL
// direction with Arabic labels (static Arabic strings per the established
// port convention instead of React's language switcher).
const CHART_DATA = [
  { month: "يناير", desktop: 186, mobile: 80 },
  { month: "فبراير", desktop: 305, mobile: 200 },
  { month: "مارس", desktop: 237, mobile: 120 },
  { month: "أبريل", desktop: 73, mobile: 190 },
  { month: "مايو", desktop: 209, mobile: 130 },
  { month: "يونيو", desktop: 214, mobile: 140 },
]

const CHART_CONFIG: ChartConfig = {
  desktop: { label: "سطح المكتب", color: "#2563eb" },
  mobile: { label: "الجوال", color: "#60a5fa" },
}

@Component({
  selector: "preview-chart-rtl",
  standalone: true,
  imports: [ChartBarComponent],
  template: `
    <div dir="rtl">
      <div uiChartBar class="min-h-[200px] w-full" [data]="chartData()" [colorMapping]="config" />
    </div>
  `,
})
export class ChartRtlComponent {
  readonly config = CHART_CONFIG
  readonly chartData = [
    ...CHART_DATA.map((d) => ({
      category: d.month,
      value: d.desktop,
      series: "desktop",
    })),
    ...CHART_DATA.map((d) => ({
      category: d.month,
      value: d.mobile,
      series: "mobile",
    })),
  ]
}

export default ChartRtlComponent

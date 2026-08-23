import { Component } from "@angular/core"

import {
  ChartTooltipContentComponent,
  type ChartConfig,
  type ChartTooltipPayloadItem,
} from "@/angular-ui/chart"

// apps/v4/examples/base/chart-tooltip.tsx — a static showcase of
// ChartTooltipContent variants (label vs name placement, dot/line/dashed
// indicators). Deviation: the React example draws decorative hand-drawn
// arrows between quadrants; those illustrations are omitted here.
const CONFIG: ChartConfig = {}

interface Quadrant {
  label?: string
  hideLabel: boolean
  indicator: "dot" | "line" | "dashed"
  items: ChartTooltipPayloadItem[]
  annotation?: string
}

@Component({
  selector: "preview-chart-tooltip",
  standalone: true,
  imports: [ChartTooltipContentComponent],
  template: `
    <div class="grid aspect-video w-full max-w-md justify-center text-foreground md:grid-cols-2 [&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center [&>div]:justify-center [&>div]:p-4">
      @for (q of quadrants; track q.annotation) {
        <div [class.items-end]="q.hideLabel">
          @if (q.annotation; as annotation) {
            <div class="absolute top-[10px] left-[5px] z-10 text-sm font-medium">
              {{ annotation }}
            </div>
          }
          <div
            uiChartTooltipContent
            [config]="config"
            [active]="true"
            [item]="q.items[0]"
            [label]="q.label"
            [indicator]="q.indicator"
            [hideLabel]="q.hideLabel"
            [hideName]="q.hideLabel"
            class="w-[8rem]"
          ></div>
        </div>
      }
    </div>
  `,
})
export class ChartTooltipComponent {
  readonly config = CONFIG

  // ngx-charts surfaces one payload item at a time, so each quadrant renders
  // its first item — matching the single-item tooltip content component.
  readonly quadrants: Quadrant[] = [
    {
      label: "Page Views",
      hideLabel: false,
      indicator: "dot",
      items: [{ name: "Desktop", value: 186, color: "var(--chart-1)" }],
      annotation: undefined,
    },
    {
      label: "Browser",
      hideLabel: true,
      indicator: "dashed",
      items: [{ name: "Chrome", value: 1286, color: "var(--chart-3)" }],
      annotation: "Name",
    },
    {
      label: "Page Views",
      hideLabel: false,
      indicator: "line",
      items: [{ name: "Mobile", value: 80, color: "var(--chart-2)" }],
      annotation: undefined,
    },
    {
      label: "Visitors",
      hideLabel: false,
      indicator: "dot",
      items: [{ name: "Desktop", value: 186, color: "var(--chart-1)" }],
      annotation: undefined,
    },
  ]
}

export default ChartTooltipComponent

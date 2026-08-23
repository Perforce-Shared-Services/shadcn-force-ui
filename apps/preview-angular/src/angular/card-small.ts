import { Button } from "@/angular-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Component } from "@angular/core"

// apps/v4/examples/base/card-small.tsx
@Component({
  selector: "preview-card-small",
  standalone: true,
  imports: [Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle],
  template: `<div uiCard size="sm" class="mx-auto w-full max-w-xs">
    <div uiCardHeader>
      <h3 uiCardTitle>Scheduled reports</h3>
      <p uiCardDescription>Weekly snapshots. No more manual exports.</p>
    </div>
    <div uiCardContent>
      <ul class="grid gap-2 py-2 text-sm">
        <li class="flex gap-2">
          <svg
            class="mt-0.5 size-4 shrink-0 fill-current text-muted-foreground"
            viewBox="0 -960 960 960"
          >
            <path
              d="M504-480 320-664l56-56 184 184-184 184-56-56 184-184Z"
            />
          </svg>
          <span>Choose a schedule (daily, or weekly).</span>
        </li>
        <li class="flex gap-2">
          <svg
            class="mt-0.5 size-4 shrink-0 fill-current text-muted-foreground"
            viewBox="0 -960 960 960"
          >
            <path
              d="M504-480 320-664l56-56 184 184-184 184-56-56 184-184Z"
            />
          </svg>
          <span>Send to channels or specific teammates.</span>
        </li>
        <li class="flex gap-2">
          <svg
            class="mt-0.5 size-4 shrink-0 fill-current text-muted-foreground"
            viewBox="0 -960 960 960"
          >
            <path
              d="M504-480 320-664l56-56 184 184-184 184-56-56 184-184Z"
            />
          </svg>
          <span>Include charts, tables, and key metrics.</span>
        </li>
      </ul>
    </div>
    <div uiCardFooter class="flex-col gap-2">
      <button uiButton size="sm" class="w-full">Set up scheduled reports</button>
      <button uiButton variant="outline" size="sm" class="w-full">
        See what's new
      </button>
    </div>
  </div>`,
})
export class CardSmallComponent {}

export default CardSmallComponent

import { Component } from "@angular/core"
import { BadgeComponent } from "@/angular-ui/badge"

@Component({
  selector: "preview-badge-demo",
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-col items-center gap-2">
      <div class="flex w-full flex-wrap gap-2">
        <span uiBadge>Badge</span>
        <span uiBadge variant="secondary">Secondary</span>
        <span uiBadge variant="destructive">Destructive</span>
        <span uiBadge variant="outline">Outline</span>
      </div>
      <div class="flex w-full flex-wrap gap-2">
        <span uiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</span>
        <span uiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">99</span>
        <span uiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">20+</span>
      </div>
    </div>
  `,
})
export default class BadgeDemoComponent {}

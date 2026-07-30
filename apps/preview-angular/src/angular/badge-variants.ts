import { Component } from "@angular/core"
import { BadgeComponent } from "@/angular-ui/badge"

@Component({
  selector: "preview-badge-variants",
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="default">Default</span>
      <span uiBadge variant="secondary">Secondary</span>
      <span uiBadge variant="destructive">Destructive</span>
      <span uiBadge variant="outline">Outline</span>
      <span uiBadge variant="ghost">Ghost</span>
      <span uiBadge variant="link">Link</span>
    </div>
  `,
})
export default class BadgeVariantsComponent {}

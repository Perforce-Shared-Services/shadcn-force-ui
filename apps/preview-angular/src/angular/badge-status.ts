import { Component } from "@angular/core"
import { BadgeComponent } from "@/angular-ui/badge"

@Component({
  selector: "preview-badge-status",
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="success">Success</span>
      <span uiBadge variant="warning">Warning</span>
      <span uiBadge variant="destructive">Error</span>
      <span uiBadge variant="info">Info</span>
    </div>
  `,
})
export default class BadgeStatusComponent {}

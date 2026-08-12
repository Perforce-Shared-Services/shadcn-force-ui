import { Badge } from "@/ui/badge"
import { Component } from "@angular/core"

@Component({
  selector: "preview-badge-status",
  standalone: true,
  imports: [Badge],
  template: `<div class="flex flex-wrap gap-2">
    <span uiBadge variant="success">Success</span
    ><span uiBadge variant="warning">Warning</span
    ><span uiBadge variant="destructive">Error</span
    ><span uiBadge variant="info">Info</span>
  </div>`,
})
export class BadgeStatusComponent {}

export default BadgeStatusComponent

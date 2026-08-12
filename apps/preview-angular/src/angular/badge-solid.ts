import { Badge } from "@/angular-ui/badge"
import { Component } from "@angular/core"

@Component({
  selector: "preview-badge-solid",
  standalone: true,
  imports: [Badge],
  template: `<div class="flex flex-wrap gap-2">
    <span uiBadge variant="success-solid">Deployed</span
    ><span uiBadge variant="warning-solid">Expiring</span
    ><span uiBadge variant="info-solid">Beta</span
    ><span uiBadge variant="error-solid">Failed</span>
  </div>`,
})
export class BadgeSolidComponent {}

export default BadgeSolidComponent

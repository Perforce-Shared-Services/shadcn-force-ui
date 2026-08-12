import { Badge } from "@/ui/badge"
import { Component } from "@angular/core"

@Component({
  selector: "preview-badge-variants",
  standalone: true,
  imports: [Badge],
  template: `<div class="flex flex-wrap gap-2">
    <span uiBadge>Default</span
    ><span uiBadge variant="secondary">Secondary</span
    ><span uiBadge variant="destructive">Destructive</span
    ><span uiBadge variant="outline">Outline</span
    ><span uiBadge variant="ghost">Ghost</span
    ><span uiBadge variant="link">Link</span>
  </div>`,
})
export class BadgeVariantsComponent {}

export default BadgeVariantsComponent
